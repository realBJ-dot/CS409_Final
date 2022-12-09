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
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "rent")
    .map((item) => item["amount"])[0];

  const grocery = transactions
    .filter((item) => item["category"] === "groceries")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "groceries")
    .map((item) => item["amount"])[0];

  const saving = transactions
    .filter((item) => item["category"] === "saving")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "saving")
    .map((item) => item["amount"])[0];

  const utility = transactions
    .filter((item) => item["category"] === "utility")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "utility")
    .map((item) => item["amount"])[0];

  const personal = transactions
    .filter((item) => item["category"] === "personal")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "personal")
    .map((item) => item["amount"])[0];

  const travel = transactions
    .filter((item) => item["category"] === "travel")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "travel")
    .map((item) => item["amount"])[0];

    const investment = transactions
    .filter((item) => item["category"] === "investment")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "investment")
    .map((item) => item["amount"])[0];

    const food = transactions
    .filter((item) => item["category"] === "food")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "food")
    .map((item) => item["amount"])[0];

    const cashOut = transactions
    .filter((item) => item["category"] === "cashOut")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "cashOut")
    .map((item) => item["amount"])[0];

    const entertainment = transactions
    .filter((item) => item["category"] === "entertainment")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "entertainment")
    .map((item) => item["amount"])[0];

    const gas = transactions
    .filter((item) => item["category"] === "gas")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "gas")
    .map((item) => item["amount"])[0];

    const shopping = transactions
    .filter((item) => item["category"] === "shopping")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "shopping")
    .map((item) => item["amount"])[0];

    const health = transactions
    .filter((item) => item["category"] === "health")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "health")
    .map((item) => item["amount"])[0];

    const professionalService = transactions
    .filter((item) => item["category"] === "professionalService")
    .map((item) => item["amount"])[0] === undefined ? 0 : transactions
    .filter((item) => item["category"] === "professionalService")
    .map((item) => item["amount"])[0];
  
  const data = [rent, grocery, saving, utility, grocery, investment, shopping, gas,
    health, professionalService, cashOut, travel, food, personal, entertainment]
  const config = {
    data: {
      datasets: [
        {
          data: data,
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
            <span className="amount"> ${data.reduce((partialSum, a) => partialSum + a, 0)}</span>
          </h3>
        </div>
        <Labels/>
      </div>
    </div>
  );
};
export default DoughnutChart;
