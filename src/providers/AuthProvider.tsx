import { type FC, type PropsWithChildren, createContext, useEffect, useState } from 'react'
import { account } from '../app-write'
import { ID } from 'appwrite'


interface IUser {
	email: string
	name: string
	$id: string
}

interface IAuthContext {
	user: IUser | null
	authUser: (
		email: string,
		password: string,
		isRegister: boolean,
	) => Promise<void>
	logoutUser: () => Promise<void>
}


export const AuthContext = createContext<IAuthContext>({
	authUser: async () => {},
	logoutUser: async () => {},
	user: null
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		checkUserStatus()
	}, [])

	const authUser = async (
		email: string,
		password: string,
		isRegister = false
	) => {
		try {
			if (isRegister) {
				await account.create(ID.unique(), email, password)
			}
			await account.createEmailPasswordSession(email, password)
			setUser(await account.get())
			//window.history.pushState({}, '', '/')
		} catch (error) {
			console.log(error)
			setUser(null)
		} finally {
			setIsLoading(false)
		}
		setIsLoading(false)
	}

	const checkUserStatus = async () => {
		try {
			setUser(await account.get())
		} catch (error) {
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	const logoutUser = async () => {
		await account.deleteSession('current')
		setUser(null)
		setIsLoading(false)
	}

	const contextData: IAuthContext = {
		user,
		authUser,
		logoutUser,
	}

	return (
		<AuthContext.Provider value={contextData}>
			{isLoading ? <p>Loading...</p> : children}
		</AuthContext.Provider>
	)
}

