import './SignUp.scss'
import { Link } from 'react-router-dom'
export default function SignUp() {
    return (
        <div className='content-container'>
           <h1 className='header'>Register page</h1>
           <div className='signup-container'>
            <input className='input-box' type="text" placeholder='First name'/>  
            <input className='input-box' type="text" placeholder='Last name'/>         
            <input className='input-box' type="email" placeholder='Enter your email'/>
            <input className='input-box' type="password" placeholder='Enter your password'/>
            <button className='signup-button'>Register</button>
            <small className='small-text'>Already have an account? <Link to='/login'>Log In</Link></small>
           </div>
        </div>
    )
}