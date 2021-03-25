import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Input,
  InputGroup,
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark color="dark" expand="sm">
        <NavbarBrand href="/">Liber</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav dar className="ml-auto" navbar>
            <NavItem>
              <InputGroup>
                <Input placeholder="Search Books" />
              </InputGroup>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
