import React from "react";
import "./Form.css";
const Form = () => {
  return (
    <form className="transactionForm" id="transactionForm">
      <h1 className="Title">Transaction</h1>
      <div className="inputField">
        <h3>Description: </h3>
        <input
          className="Input-text titleName"
          type="text"
          placeholder="House, Rental,..."
        ></input>
        <h3>Type: </h3>
        <select className="dropdown-input">
          <option value="Investment" defaultValue>Investment</option>
          <option value="Saving">Saving</option>
          <option value="Personal">Personal</option>
          <option value="Utility">Utility</option>
          <option value="Grocery">Grocery</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="CashOut">Cash Out</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Gas">Gas</option>
          <option value="Health">Health</option>
          <option value="ProfessionalService">Professional Service</option>
          <option value="Rent">Health</option>
          
        </select>
        <h3>Amount: </h3>
        <input
          className="Input-text"
          type="text"
          placeholder="Amount... $0"
        ></input>
        <button className="button-62">Create transaction</button>
      </div>
    </form>
  );
};

export default Form;
