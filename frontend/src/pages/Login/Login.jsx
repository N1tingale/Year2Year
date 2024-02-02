import './Login.scss'

export default function Login(){
    return (
        <div className='content-container'>
           <h1 className='header'>Login page</h1>
           <div className='login-container'>
               <input className='input-box' type="email" placeholder='Enter your email'/>
               <input className='input-box' type="password" placeholder='Enter your password'/>
               <button className='login-button'>Log in</button>
           </div>
        </div>
    )
}