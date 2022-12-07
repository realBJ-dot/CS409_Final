import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Transaction.css";
import DoughnutChart from "../components/chart/DoughnutChart";
import Form from "../components/Form/Form"
import Transactionhistory from "../components/Transactionhistory/Transactionhistory"
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
  }, []);

  return (
    <div className="Transction-container">
      <div className="Topbox">
        {usersData.length < 1 ? (
          requestError
        ) : (
          <>
            <h2>
              <span className="userName">Hi! {usersData.userName},</span> your
              monthly spending are as follow:
            </h2>
            {/* <button className="button-17" onClick={handleLogOut}>
              Log Out
            </button> */}
          </>
        )}
      </div>
      <div className="Bottombox">
        <div className="leftPanelBox">
          <DoughnutChart transactions={transactions} />
        </div>
        <div className="rightPanelBox">
          <Form />
          <Transactionhistory />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
