import React, { useEffect, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(search);
  }, [search]);

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
                <Input
                  value={search}
                  placeholder="Search Books"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
