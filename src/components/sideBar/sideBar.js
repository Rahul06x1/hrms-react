
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTimes, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { Nav, Image, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import Brand from '../../assets/img/brand/brand.png'

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);


  const NavItem = (props) => {
    const { title, link, icon } = props;
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} >
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            <span className="sidebar-text">{title}</span>
          </span>
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.Home.path}>
          <Image src={Brand} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
        <div className="sidebar-inner px-4 pt-3">
          <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
            <div className="d-flex align-items-center">
              <div className="d-block">
                <h2>HRMS</h2>
              </div>
            </div>
            <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
              <FontAwesomeIcon icon={faTimes} />
            </Nav.Link>
          </div>
          <Nav className="flex-column pt-3 pt-md-0">
            <NavItem title="HRMS" link={Routes.Home.path} icon={faHome} />
            <NavItem title="Employee" link={Routes.Employee.path} icon={faUser} />
            <NavItem title="About" link={Routes.About.path} icon={faInfo} />
          </Nav>
        </div>
      </SimpleBar>
    </>
  );
};
