// ./components/PieChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({transactions}) => {
  const categories = transactions.map((item) => (item['category']));
  console.log(transactions);
  const labels = categories;
  const rent = transactions.filter((item) => (item['category'] == 'rent')).map((item) => (item['amount']))[0];
  const grocery = transactions.filter((item) => (item['category'] == 'groceries')).map((item) => (item['amount']))[0];
  const saving = transactions.filter((item) => (item['category'] == 'saving')).map((item) => (item['amount']))[0];
  const utility = transactions.filter((item) => (item['category'] == 'utility')).map((item) => (item['amount']))[0];

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
        ],
        borderColor: "rgb(255,255,255)",
        data: [rent, grocery, saving, utility],
      },
      
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
export default DoughnutChart;