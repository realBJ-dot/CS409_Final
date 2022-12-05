import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const proxy = "http://localhost:3001/api/";

const Login = () => {
  const [btnState, setBtnState] = useState(false);
  const [btnMobileState, setbtnMobileSate] = useState(false);
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleMobileClick = () => {
    setbtnMobileSate((btnMobileState) => !btnMobileState);
  };
  const handleClick = () => {
    setBtnState((btnState) => !btnState);
  };

  let ToggleClassCheck = btnState ? " sign-up-mode" : "";
  let ToggleMobileClassCheck = btnMobileState ? " sign-up-mobile-mode" : "";

  //sign up constructor
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${proxy}signup`;
      const {data:res} = await axios.post(url, data);
      console.log(res)    
      navigate("/fetchingData");
    } catch (err) {
      //console.log(err.response.data.message)
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        toast.error(error)
        setError(err.response.data.message);
      }
    }
  };
  return (
    <div className="login-container">
      <video src="/videos/background_login.mp4" autoPlay loop muted />
      <div
        className={`box-container${ToggleClassCheck}${ToggleMobileClassCheck}`}
      >
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username"></input>
            </div>
            <div className="input-field">
              <i class="fas fa-lock"></i>
              <input type="Password" placeholder="Password"></input>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn1 btnSolid"
            ></input>
            <p className="check-account">
              Don't have an account?{" "}
              <span onClick={handleMobileClick} className="reg-account">
                Register now
              </span>
            </p>
          </form>
          <form action="" className="sign-up-form" onSubmit={handleSubmit}>
          
            <h2 className="title">Sign up</h2>
            <div className="flName">
              <div className="input-field">
                <i class=""></i>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="input-field">
                <i class=""></i>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="input-field">
              <i class="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-field">
              <i class="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                name="userName"
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="Password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              ></input>
            </div>
            <input
              type="submit"
              value="Sign up"
              className="btn1 btnSolid"
            ></input>
            <p className="check-account">
              Already have an account?{" "}
              <span onClick={handleMobileClick} className="reg-account">
                Sign in now
              </span>
            </p>
          </form>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Already have account?</h3>
              <p>Click Sign In now to explore the feature</p>
              <button className="btn1" onClick={handleClick}>
                Sign in
              </button>
            </div>
            <img src="/pics/signin.svg" alt="" className="image"></img>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Don't have an account yet?</h3>
              <p>Click sign up below to register a new account</p>
              <button className="btn1 " onClick={handleClick}>
                Sign up
              </button>
            </div>
            <img src="/pics/signup.svg" alt="" className="image"></img>
          </div>
        </div>
      </div>
      {error && <ToastContainer />}
    </div>
  );
};

export default Login;
