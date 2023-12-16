import './App.css';
import Header from './components/header/header';
import Home from './components/home/home';
import Employee from './components/employee/employee';
import About from './components/about/about';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;