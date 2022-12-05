import e from 'cors';
import React, {useState} from 'react'
import './css/Login.css'
const Login = () => {
  const [btnState, setBtnState] = useState(false);
  const [btnMobileState, setbtnMobileSate] = useState(false);
  const [signUpFormState, setSignUpState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: ''
  });
  const [loginFormState, setLoginState] = useState({
    userName:"",
    password:""
  });

  const handleMobileClick = () => {
    setbtnMobileSate(btnMobileState => !btnMobileState)
  }
  const handleClick = () => {
    setBtnState(btnState => !btnState);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const {userName, password} = loginFormState;
    console.log(userName, password);
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, email, userName, password} = signUpFormState;
    console.log(firstName, lastName, email, userName, password);
  }

  let ToggleClassCheck = btnState ? ' sign-up-mode': "";
  let ToggleMobileClassCheck = btnMobileState ? ' sign-up-mobile-mode' : "";

  return (
    <div className='login-container'>
      <video src='/videos/background_login.mp4' autoPlay loop muted />
      <div className={`box-container${ToggleClassCheck}${ToggleMobileClassCheck}`}>
      
        <div className='signin-signup'>
            <form action="" className='sign-in-form' onSubmit={handleLoginSubmit}>
                <h2 className='title'>Sign in</h2>
                <div className='input-field'>
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder='Username' onChange={(e) => setLoginState({...loginFormState, userName: e.target.value})}></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-lock"></i>
                  <input type="Password" placeholder='Password' onChange={(e) => setLoginState({...loginFormState, password: e.target.value})}></input>
                </div>
                <input type="submit" value="Login" className='btn1 btnSolid'></input>
                <p className='check-account'>Don't have an account? <span onClick = {handleMobileClick} className="reg-account">Register now</span></p>
            </form>
            <form action="" className='sign-up-form' onSubmit={handleSignUpSubmit}>
                <h2 className='title'>Sign up</h2>
                <div className='flName'>
                <div className='input-field'>
                <i className=""></i>
                  <input type="text" placeholder='First name' onChange={(e) => setSignUpState({...signUpFormState, firstName: e.target.value})}></input>
                </div>
                <div className='emptybox'></div>
                <div className='input-field'>
                <i className=""></i>
                  <input type="text" placeholder='Last name' onChange={(e) => setSignUpState({...signUpFormState, lastName: e.target.value})}></input>
                </div>
                </div>
                <div className='input-field'>
                  <i class="fas fa-envelope"></i>
                  <input type="text" placeholder='Email' onChange={(e) => setSignUpState({...signUpFormState, email: e.target.value})}></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder='Username' onChange={(e) => setSignUpState({...signUpFormState, userName: e.target.value})}></input>
                </div>
                <div className='input-field'>
                  <i class="fas fa-lock"></i>
                  <input type="Password" placeholder="Password" onChange={(e) => setSignUpState({...signUpFormState, password: e.target.value})}></input>
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
                    <h3>Don't have an account yet?</h3>
                    <p>Click sign up below to register a new account</p>
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