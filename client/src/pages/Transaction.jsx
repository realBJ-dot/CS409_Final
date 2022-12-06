import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Transaction.css";

const accessToken = localStorage.getItem("token");
const proxy = "http://localhost:3001/api/";

const authAxios = axios.create({
  baseURL: proxy,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [requestError, setrequestError] = useState();
  const [usersData, setUsersData] = useState([]);

  //console.log(accessToken)
  

  //Log Out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  useEffect(() => {
    const fetchDataTransaction = async () => {
      try {
        const transactions = await authAxios.get(`/transactions_for_user`);
        const getUsersData = await authAxios.get(`/current_user_info`);
        setTransactions(transactions.data.data);
        setUsersData(getUsersData.data.data);
      } catch (err) {
        setrequestError(err.response);
      }
    };
    fetchDataTransaction();
  },[])
  return (
    <div className="Transction-container">
      {usersData.length < 1 ? (
        requestError
      ) : (
        <>
          <h1>Fname: {usersData.firstName} - Lname: {usersData.lastName}</h1>
          <h1>Email: {usersData.email} - Username: {usersData.userName}</h1>
        </>
      )}
      {transactions.map((transaction) => {
        return (
          <div className="transaction">
            <p key={transaction.id}>
              {transaction.description} - {transaction.category} -{" "}
              {transaction.amount}
            </p>
          </div>
        );
      })}
      <button className="button-17" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Transaction;
