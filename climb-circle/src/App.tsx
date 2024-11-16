
import './App.css';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Home/*" element={<Home />} />
            <Route path="/Profile/*" element={<Profile />} />
          </Routes>
        </div>
    </HashRouter>
  );
}

export default App;
