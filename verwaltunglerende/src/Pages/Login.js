import React, { useState } from "react";
import "./Login.css"

const Login = ({handleLogin}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit=(m) => {
        m.preventDefault();
        handleLogin(username, password);
    };
    return (
        <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="" placeholder="Username" value={username} onChange={(m) => setUsername(m.target.value)} />
            <input type="" placeholder="Password" value={password} onChange={(m) => setPassword(m.target.value)} />
            <button type="Submit">Login</button>
        </form>
        </div>
    )
}
export default Login;