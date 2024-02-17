import './App.css';
import Formtext from './component/Formtext';
import Navbar from './component/Navbar';
import About from './component/About';
import Alert from './component/Alert';
import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom";
function App() {
  const[alert,setalert]=useState
  (null);
  const showalert=(message,type)=>{
      setalert({
        msg:message,
        type:type//making variable of class alert
      })
      setTimeout(() => {
        setalert(null);
      }, 2000);
  }
  return (
    <>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
      <Route path='/' element={<Formtext showalert={showalert}/>}></Route>
      <Route path='/About'element ={<About/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
