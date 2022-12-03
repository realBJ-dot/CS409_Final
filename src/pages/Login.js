import React, {useState} from 'react'
import './css/Login.css'
const Login = () => {
  const [btnState, setBtnState] = useState(false);
  const [btnMobileState, setbtnMobileSate] = useState(false);

  const handleMobileClick = () => {
    setbtnMobileSate(btnMobileState => !btnMobileState)
  }
  const handleClick = () => {
    setBtnState(btnState => !btnState);
  }

  let ToggleClassCheck = btnState ? ' sign-up-mode': "";
  let ToggleMobileClassCheck = btnMobileState ? ' sign-up-mobile-mode' : "";

  return (
    <div className='login-container'>
      <video src='/videos/background_login.mp4' autoPlay loop muted />
      <div className={`box-container${ToggleClassCheck}${ToggleMobileClassCheck}`}>
      
        <div className='signin-signup'>
            <form action="" className='sign-in-form'>
                <h2 className='title'>Sign in</h2>
                <div className='input-field'>
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder='Username'></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-lock"></i>
                  <input type="Password" placeholder='Password'></input>
                </div>
                <input type="submit" value="Login" className='btn1 btnSolid'></input>
                <p className='check-account'>Don't have an account? <span onClick = {handleMobileClick} className="reg-account">Register now</span></p>
            </form>
            <form action="" className='sign-up-form'>
                <h2 className='title'>Sign up</h2>
                <div className='input-field'>
                <i class="fas fa-envelope"></i>
                  <input type="text" placeholder='First name'></input>
                </div>
                <div className='input-field'>
                <i class="fas fa-envelope"></i>
                  <input type="text" placeholder='Last name'></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-envelope"></i>
                  <input type="text" placeholder='Email'></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder='Username'></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-lock"></i>
                  <input type="Password" placeholder="Password"></input>
                </div>
                <input type="submit" value="Sign up" className='btn1 btnSolid'></input>
                <p className='check-account'>Already have an account? <span onClick = {handleMobileClick} className="reg-account">Sign in now</span></p>
            </form>
        </div>
        <div className='panels-container'>
              <div className='panel left-panel'>
                <div className='content'>
                    <h3>Already have account?</h3>
                    <p>Click Sign In now to explore the feature</p>
                    <button className='btn1' onClick={handleClick}>Sign in</button>
                </div>
                <img src="/pics/signin.svg" alt="" className='image'></img>
              </div>
              <div className='panel right-panel'>
                <div className='content'>
                    <h3>Member of Brand?</h3>
                    <p>Nulla elit quis id exercitation ullamco adipisicing ea irure irure deserunt.Proident fugiat dolore mollit laborum quis ad non eiusmod adipisicing et aliqua.</p>
                    <button className='btn1 ' onClick={handleClick}>Sign up</button>
                </div>
                <img src="/pics/signup.svg" alt="" className='image'></img>
              </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login