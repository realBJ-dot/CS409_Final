import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About"
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar"
import Footer from "../src/components/Footer/Footer"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Contact" element={<Contact />}></Route>
      <Route path="/Login" element={<Login />}></Route>
    </Routes>
    <Footer></Footer>
    </>
  );
}

export default App;
