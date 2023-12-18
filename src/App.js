import './App.css';
import Header from './components/header/header';
import Home from './components/home/home';
import Employee from './components/employee/Employee';
import About from './components/about/about';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Siderbar/Sidebar';
import "./scss/volt.scss";

function App() {
  return (
    <div className="App">
        <Sidebar />
        <main className="content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;