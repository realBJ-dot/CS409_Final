import React from "react";
import "./DoughnutChart.css";


//dump data
const items= [
    {
        type: "Saving",
        color: "#B0C24D",
        percent: 45
    },
    {
        type: "Investment",
        color: "#244D70",
        percent: 35
    },
    {
        type: "Expense",
        color: "#FFDE59",
        percent: 75
    }

]



function Labels() {
  return (
  <>
  {items.map((item,i)=> 
    <LabelComponents key={i} data={item}/>
  )}
  </>)
}

function LabelComponents({data}) {
    if(!data) return <></>;
  return (
    <div className="labels">
      <div className="labelTitles">
        <div className="colorItems" style={{ background: data.color ?? '#fff'}}></div>
        <h3>{data.type ?? ''}</h3>
      </div>
      <h3>{data.percent ?? 0}%</h3>
    </div>
  );
}
export default Labels;
