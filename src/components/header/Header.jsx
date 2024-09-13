import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white shadow-md">
      <Navbar expand="sm" className="container mx-auto px-4">
        <NavbarBrand href="/" className="text-orange-600 font-bold text-xl">
          TN
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="border-none text-orange-600">
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto flex-grow flex items-center" navbar>
            <NavItem>
              <NavLink
                href="/"
                className="text-orange-600 hover:text-orange-800"
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/student"
                className="text-orange-600 hover:text-orange-800"
              >
                Student
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="text-orange-600">My website</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
