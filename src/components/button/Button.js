import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn-primary0", "btn-outline0"];
const SIZES = ["btn-medium0", "btn-large0"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkBtnSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return(
    <Link to='/Login' className="btn-mobile">
        <button
        className={`btn ${checkBtnStyle} ${checkBtnSize}`}
        onClick= {onClick}
        type={type}
        >
            {children}
        </button>
    </Link>
  );
};

export default Button;
