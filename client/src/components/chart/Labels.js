import React from "react";
import "./DoughnutChart.css";

function toFixed(num, fixed) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return Math.floor(num * fixed) / fixed;
}

//["#2f4f4f", "#7f0000", "#008000", "#4b0082", "#d2b48c", "#ff8c00"
//, "#ffff00", "#00ff00", "#00bfff", "#0000ff", "#ff00ff", "#dda0dd", "#ff1493", "#7fffd4"]
const Labels = ({data}) => {
  const total = data.reduce((partialSum, a) => partialSum + a, 0)
  const items= [
    {
      type: "Rent",
      color: "#2f4f4f",
      percent: toFixed((data[0] / total) * 100, 2)
    }, 
    {
      type: "Grocery",
      color: "#7f0000",
      percent: toFixed((data[1] / total) * 100, 2)
    },
    {
      type: "Utility",
      color: "#008000",
      percent: toFixed((data[2] / total) * 100, 2)
    },
    {
      type: "Saving",
      color: "#4b0082",
      percent: toFixed((data[3] / total) * 100, 2)
    },
    {
      type: "Investment",
      color: "#d2b48c",
      percent: toFixed((data[4] / total) * 100, 2)
    },
    {
      type: "Shopping",
      color: "#ff8c00",
      percent: toFixed((data[5] / total) * 100, 2)
    },
    {
      type: "Gas",
      color: "#ffff00",
      percent: toFixed((data[6] / total) * 100, 2)
    },
    {
      type: "Health",
      color: "#00ff00",
      percent: toFixed((data[7] / total) * 100, 2)
    },
    {
      type: "Professional Service",
      color: "#00bfff",
      percent: toFixed((data[8] / total) * 100, 2)
    },
    {
      type: "Cash Out",
      color: "#0000ff",
      percent: toFixed((data[9] / total) * 100, 2)
    },
    {
      type: "Travel",
      color: "#ff00ff",
      percent: toFixed((data[10] / total) * 100, 2)
    },
    {
      type: "Food",
      color: "#dda0dd",
      percent: toFixed((data[11] / total) * 100, 2)
    },
    {
      type: "Personal",
      color: "#ff1493",
      percent: toFixed((data[12] / total) * 100, 2)
    },
    {
      type: "Entertainment",
      color: "#7fffd4",
      percent: toFixed((data[13] / total) * 100, 2)
    },
]

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
