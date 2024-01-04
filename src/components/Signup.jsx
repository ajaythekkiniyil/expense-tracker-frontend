import axios from "axios"
import { useState } from "react"
import { apiBaseUrl } from '../const'

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrl}/signup`, { email, password })
            .then(resp => {
                window.location.href='/login'
            })
            .catch(err => {
                alert('email is already registered')
            })
    }

    return (
        <div className="signup-form">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <input type="email" name="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign Up</button>
            </form>

            <div className="login-link">
                <a href="/login">I already have an account.</a>
            </div>
        </div>
    )
}
export default Signup