import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About"
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar"
import TestingFetchingData from "./pages/TestingFetchingData";
import Footer from "./components/Footer/Footer"
import Transaction from "./pages/Transaction";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Contact" element={<Contact />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      {user && <Route exact path="/Transaction" element={<Transaction />}></Route>}
      <Route path="/FetchingData" element={<TestingFetchingData />}></Route>
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
    <Footer></Footer>
    </>
  );
}

export default App;
