import {React, useState} from "react";
import axios from 'axios';
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
    dropDown: "investment",
    amount: 0
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    const {transactionDesc, dropDown, amount} = transactionState;
    const tmp = Number(amount);
    //console.log(transactionDesc, dropDown, tmp);
    //console.log(typeof(tmp));
    
    const postDataTransaction = async () => {
      try {
        const postUsersData = await authAxios.post(`/transactions_for_user`, {
          description: transactionDesc,
          category: dropDown,
          dateCreated: Date.now(),
          amount: tmp
        });
        console.log(postUsersData);
      } catch (err) {
        console.log(err.response.data);
        //setrequestError(err.response);
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

    //console.log(usersData._id);
  
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
          <option value="investment" defaultValue>Investment</option>
          <option value="saving">Saving</option>
          <option value="personal">Personal</option>
          <option value="utility">Utility</option>
          <option value="grocery">Grocery</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="cashOut">Cash Out</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="gas">Gas</option>
          <option value="health">Health</option>
          <option value="professionalService">Professional Service</option>
          <option value="rent">Rent</option>
          
        </select>
        <h3>Amount: </h3>
        <input
          className="Input-text"
          type="number"
          placeholder="Amount... $0" onChange={(e) => setTransactionState({...transactionState, amount: e.target.value})}
        ></input>
        <button onClick={() => window.location.reload(false)} className="button-62">Create transaction</button>
      </div>
    </form>
  );
};

export default Form;
