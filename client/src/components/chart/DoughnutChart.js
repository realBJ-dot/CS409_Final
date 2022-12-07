// ./components/PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";
import Labels from "./Labels";
Chart.register(ArcElement);

const DoughnutChart = ({ transactions }) => {
  //const categories = transactions.map((item) => item["category"]);
  const rent = transactions
    .filter((item) => item["category"] === "rent")
    .map((item) => item["amount"])[0];
  const grocery = transactions
    .filter((item) => item["category"] === "groceries")
    .map((item) => item["amount"])[0];
  const saving = transactions
    .filter((item) => item["category"] === "saving")
    .map((item) => item["amount"])[0];
  const utility = transactions
    .filter((item) => item["category"] === "utility")
    .map((item) => item["amount"])[0];

  const config = {
    data: {
      datasets: [
        {
          data: [rent, grocery, saving, utility],
          backgroundColor: ["#B0C24D", "#244D70", "#FFDE59", "#F7E018"],
          hoverOffser: 5,
          borderRadius: 10,
          spacing: 5,
        },
      ],hoverOffset: 10
    },
    options: {
      cutout: 125,
    },
  };

  return (
    <div className="chartContainer">
      <div className="item">
        <h1>Expense Analyzing</h1>
        <div className="chart">
          <Doughnut {...config} />
          <h3 className="total">
            Total:
            <span className="amount"> ${0}</span>
          </h3>
        </div>
        <Labels/>
      </div>
    </div>
  );
};
export default DoughnutChart;
