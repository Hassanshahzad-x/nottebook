// import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from "./components/Alert";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Alert message="note down your notes" />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
