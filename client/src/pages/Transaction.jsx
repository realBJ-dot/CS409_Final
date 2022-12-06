import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Transaction.css";

const Transaction = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="Transction-container">
      <h1>First Name</h1>
      <h2>Last Name</h2>
      <h3>Email</h3>
      <button className="button-17" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Transaction;
