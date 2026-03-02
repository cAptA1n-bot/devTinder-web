import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
    try{
        const res = await axios.post("http://localhost:3000/login",{
            email,
            password
        },{withCredentials: true})
    }
    catch(err){
        console.error(err);
    }
        
    }
    return (
        <div>
            <div className='h-[80vh] flex items-center justify-center'>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" value={email} className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                <label className="label">Password</label>
                <input type="password" value={password} className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

                <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            </fieldset>
            </div>
            
        </div>
    )
}

export default Login
