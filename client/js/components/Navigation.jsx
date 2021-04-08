import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Input,
  InputGroup,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../state/ducks/books";
import { useDebounce } from "../utils";
import SearchBook from "./SearchBook";

const Navigation = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const query = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchBooks(query));
  }, [query]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark color="dark" expand="sm">
        <NavbarBrand style={{ fontSize: "2rem" }} href="/">
          Liber
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem style={{ padding: "0 0.5rem" }}>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem style={{ padding: "0 0.5rem" }}>
              <NavLink to="/">Sign-up</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem className="searchBook">
              <InputGroup>
                <Input
                  value={search}
                  style={{ fontSize: "1.6rem" }}
                  placeholder="Search Books"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <ListGroup className="searchBook__list">
                {books?.map((book) => (
                  <ListGroupItem key={book.id} style={{ fontSize: "1.6rem" }}>
                    <SearchBook book={book} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
