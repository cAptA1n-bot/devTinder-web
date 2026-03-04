import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState("prince@example.com");
    const [password, setPassword] = useState("Prince@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
    try{
        const res = await axios.post(BASE_URL+"/login",{
            email,
            password
        },{withCredentials: true})
        dispatch(addUser(res.data));
        navigate("/")
    }
    catch(err){
        setError(err?.response?.data || "Something went wrong");
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
                <p className='text-red-500 text-center'>{error}</p>
                <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            </fieldset>
            </div>
            
        </div>
    )
}

export default Login
