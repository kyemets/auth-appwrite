import './App.css'
import { LoginForm } from './login-form/LoginForm'
import { useAuth } from './providers/useAuth'

function App() {
  const { user, logoutUser } = useAuth()

  return (
    <>
      {user ? (
        <div>
          <h1>Success, you're in system!</h1>
          <button onClick={() => logoutUser()}>Logout</button>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  )
}

export default App
