import React from "react";
import "./Transactionhistory.css";

//dump data
const items = [
  {
    name: "Saving $100",
    color: "#B0C24D",
  },
  {
    name: "Stock $100",
    color: "#244D70",
  },
  {
    name: "Iphone 100$",
    color: "#FFDE59",
  },
];

const Transactionhistory = () => {
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
