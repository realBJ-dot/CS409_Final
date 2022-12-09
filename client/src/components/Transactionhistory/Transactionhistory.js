import React from "react";
import "./Transactionhistory.css";


const Transactionhistory = ({transactions}) => {
  const last4Elems = transactions.slice(Math.max(transactions.length - 4, 0));
  console.log(last4Elems);
  const items = [
    {
      name: last4Elems[0]['description'].concat(" $".concat(last4Elems[0]['amount'])),
      color: "#B0C24D",
    },
    {
      name: last4Elems[1]['description'].concat(" $".concat(last4Elems[1]['amount'])),
      color: "#244D70",
    },
    {
      name: last4Elems[2]['description'].concat(" $".concat(last4Elems[2]['amount'])),
      color: "#FFDE59",
    },
    {
      name: last4Elems[3]['description'].concat(" $".concat(last4Elems[3]['amount'])),
      color: "#7f0000",
    },
  ];
  return (
    <div className="transContainer">
      <h1>History</h1>
      {items.map((item, i) => (
        <Transaction key={i} category={item}></Transaction>
      ))}
    </div>
  );
};

function Transaction({ category }) {
  if (!category) return null;
  return (
    <div className="itemList">
      <span className="item1">{category.name ?? ""}</span>
      <span className="itemBox" style={{background: `${category.color ?? "#fff"}`}}></span>
      <span className="trashIcon"><i class="fas fa-trash"></i></span>
    </div>
  );
}

export default Transactionhistory;
