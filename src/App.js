import './App.css';
import Home from './components/home/home';
import Employee from './components/employee/Employee';
import About from './components/about/about';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Siderbar/Sidebar';
import NotFound from './components/notFound/notFound';
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
            <Route path="/404" element={<NotFound />} />
            <Route path='*' element={<Navigate to={'/404'} />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;