import {  NavLink } from 'react-router-dom';
import './header.css';

export default function Header() {
  return (
    <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <NavLink to={'/'} className="navbar-brand">HRMS</NavLink>
            <NavLink to={'/employee'} className="navbar-brand">Employees</NavLink>
            <NavLink to={'/about'}className="navbar-brand">About</NavLink>
          </ol>
        </nav>
      </div>
    </div>
    </div>
  )
}