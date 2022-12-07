import React from "react";
import "./Form.css";
const Form = () => {
  return (
    <form className="transactionForm" id="transactionForm">
      <h1 className="Title">Transaction</h1>
      <div className="inputField">
        <input
          className="Input-text titleName"
          type="text"
          placeholder="House, Rental,..."
        ></input>
        <select className="dropdown-input">
          <option value="Investment" defaultValue>
            Investment
          </option>
          <option value="Saving">Saving</option>
          <option value="Expense">Expense</option>
        </select>
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
