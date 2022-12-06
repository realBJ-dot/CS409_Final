import React, { useState, useCallback } from "react";
import axios from "axios";
import "./css/Transaction.css";

const accessToken = localStorage.getItem("token");
const proxy = "http://localhost:3001/api/";

const authAxios = axios.create({
  baseURL: proxy,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [requestError, setrequestError] = useState();
  //console.log(accessToken)
  const fetchDataTransaction = useCallback(async () => {
    try {
      const result = await authAxios.get(`/transactions_for_user`);
      setTransactions(result.data);
      //console.log(transactions)
    } catch (err) {
      setrequestError(err.response);
    }
  });

  //Log Out
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
      <button className="button-17" onClick={() => fetchDataTransaction()}>
        get transaction
      </button>
      {transactions.map((transaction) => {
        return (
          <>
            <p key={transaction.id}>{transaction.description}</p>
            <p key={transaction.id}>{transaction.category}</p>
            <p key={transaction.id}>{transaction.amount}</p>
          </>
        );
      })}
    </div>
  );
};

export default Transaction;
