import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1d')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch (error) {
		console.log('failed to verify session: ', error)
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
	const session = await encrypt({ userId, expiresAt })
	const cookieStore = await cookies()

	cookieStore.set('cake-shop-session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}

export async function checkCurrentSession() {
	const cookieStore = await cookies()
	const currentSession = cookieStore.get('session')

	if (!currentSession) {
		return null
	}
	const payload = await decrypt(currentSession?.value)
	return payload
}
