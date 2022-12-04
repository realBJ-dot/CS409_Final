import React, { useState, useEffect } from "react";
import "./css/main.css";

const TestingFetchingData = () => {
  const [backendData, setbackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setbackendData(data);
      });
  }, []);

  return (
    <div className="fetchdata-container">
      {typeof backendData.users === "undefined" ? (
        <h1>Loading data...</h1>
      ) : (
        backendData.users.map((user, i) => 
        <p>{user}</p>
        )
      )}
    </div>
  );
};

export default TestingFetchingData;
