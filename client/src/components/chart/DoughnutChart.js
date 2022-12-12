// ./components/PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";
import Labels from "./Labels";
Chart.register(ArcElement);

const DoughnutChart = ({ transactions }) => {
  //const categories = transactions.map((item) => item["category"]);
  //[rent, grocery, saving, utility, investment, shopping, gas,
   // health, professionalService, cashOut, travel, food, personal, entertainment];
  const processedData = {'rent': 0,  'grocery': 0, 'saving': 0, 'utility': 0, 'investment':0, 'shopping':0, 'gas':0,
   'health':0, 'professionalService':0, 'cashOut':0, 'travel': 0, 'food': 0, 'personal':0, 'entertainment': 0
      };
  
    for (var i = 0; i < transactions.length; i++) {
      processedData[transactions[i]['category']] += transactions[i]['amount'];
    }
    //console.log(processedData);
  




  const rent = processedData['rent'];

  const grocery = processedData['grocery'];
    

  const saving = processedData['saving'];
   
  const utility = processedData['utility']
    

  const investment = processedData['investment']
    

  const shopping = processedData['shopping']
    

    const gas = processedData['gas']
   

    const health = processedData['health']
    

    const professionalService = processedData['professionalService']
    

    const cashOut = processedData['cashOut']
    

    const travel = processedData['travel']
    

    const food = processedData['food']
   

    const personal = processedData['personal']
    

    const entertainment = processedData['entertainment']
    
  
  const data = [rent, grocery, saving, utility, investment, shopping, gas,
    health, professionalService, cashOut, travel, food, personal, entertainment];
  const config = {
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: ["#2f4f4f", "#7f0000", "#008000", "#4b0082", "#d2b48c", "#ff8c00"
          , "#ffff00", "#00ff00", "#00bfff", "#0000ff", "#ff00ff", "#dda0dd", "#ff1493", "#7fffd4"],
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
            <span className="amount"> ${data.reduce((partialSum, a) => partialSum + a, 0)}</span>
          </h3>
        </div>
        <Labels data={data}/>
      </div>
    </div>
  );
};
export default DoughnutChart;
