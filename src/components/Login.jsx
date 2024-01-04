import { useState } from 'react'
import { apiBaseUrl } from '../const'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrl}/login`, { email, password })
            .then(resp => {
                localStorage.setItem('userId', resp.data.userId)
                window.location.href = '/home'
            })
            .catch(err => {
                alert('incorrect email or password')
            })
    }

    return (
        <div className="signup-form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="email" name="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>

            <div className="login-link">
                <a href="/">Don't have an account.</a>
            </div>
        </div>
    )
}
export default Login