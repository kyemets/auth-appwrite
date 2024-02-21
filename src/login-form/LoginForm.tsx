import { type ChangeEvent, type FormEvent, useState } from 'react'
import styles from './LoginForm.module.scss'
import { useAuth } from '../providers/useAuth'

export function LoginForm() {
	const { authUser } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isRegister, setIsRegister] = useState(false)


	const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		} else if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
	}

	const handleSubmit = async (e:FormEvent<HTMLInputElement>) => {
		e.preventDefault()
		console.log(email, password)
		await authUser(email, password, isRegister)
		setEmail('')
		setPassword('')
	}


	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1>Authorization</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Enter your email address'
							value={email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Enter your password'
							value={password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit' style={{ marginRight: 15 }}>Login</button>
					<button type='submit' onClick={() => setIsRegister(true)}>Registration</button>
				</form>
			</div>
		</div>
	)
}
