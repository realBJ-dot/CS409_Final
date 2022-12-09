import {React, useState, useEffect} from "react";
import axios, { Axios } from 'axios';
import "./Form.css";

const accessToken = localStorage.getItem("token");
const proxy = "http://localhost:3001/api/";

const authAxios = axios.create({
  baseURL: proxy,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});



const Form = () => {
  const [transactionState, setTransactionState] = useState({
    transactionDesc: "",
    dropDown: "Investment",
    amount: 0
  });
  const [usersData, setUsersData] = useState([]);
  const [requestError, setrequestError] = useState();



  useEffect(() => {
    const fetchDataTransaction = async () => {
      try {
        const getUsersData = await authAxios.get(`/current_user_info`);
        setUsersData(getUsersData.data.data);
      } catch (err) {
        setrequestError(err.response);
      }
    };
    fetchDataTransaction();
  }, []);

  const handleFormChange = (e) => {
    e.preventDefault();
    const {transactionDesc, dropDown, amount} = transactionState;
    const tmp = Number(amount);
    console.log(transactionDesc, dropDown, tmp);
    console.log(typeof(tmp));
    
    const postDataTransaction = async () => {
      try {
        const postUsersData = await authAxios.post(`/transactions_for_user`, {
          description: transactionDesc,
          category: dropDown,
          dateCreated: Date.now(),
          amount: tmp
        });
      } catch (err) {
        console.log(err.response.data);
        setrequestError(err.response);
      }
    };

    // axios.post('http://localhost:3001/api/transactions_for_user', {
    //   assignedUser: usersData._id,
    //   description: transactionDesc,
    //   category: dropDown,
    //   dateCreated: Date.now(),
    //   amount: tmp
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    postDataTransaction();

    console.log(usersData._id);
  
  }
  return (
    <form className="transactionForm" id="transactionForm" onSubmit={handleFormChange}>
      <h1 className="Title">Transaction</h1>
      <div className="inputField">
        <h3>Description: </h3>
        <input
          className="Input-text titleName"
          type="text"
          placeholder="House, Rental,..." onChange={(e) => setTransactionState({...transactionState, transactionDesc: e.target.value})}
        ></input>
        <h3>Type: </h3>
        <select className="dropdown-input" onChange={(e) => setTransactionState({...transactionState, dropDown: e.target.value})}>
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
          type="number"
          placeholder="Amount... $0" onChange={(e) => setTransactionState({...transactionState, amount: e.target.value})}
        ></input>
        <button className="button-62">Create transaction</button>
      </div>
    </form>
  );
};

export default Form;
