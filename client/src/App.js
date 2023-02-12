// import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState()

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type })
    setTimeout(() => {
      setAlert(null)
    }, 2500)
  }

  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
