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
  ListGroup,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../state/ducks/books";
import { useDebounce, isAuthenticated } from "../utils";
import SearchBook from "./SearchBook";

const Navigation = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const query = useDebounce(search, 500);

  useEffect(() => {
    const inputClick = (e) => {
      const element = document.querySelector(".searchBook__list");
      if (!e.target.className) {
        element.style.display = "none";
      }
      const name = e.target.className.split("__")[0];
      if (name !== "searchBook" && name !== "form-control") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    };

    document.addEventListener("click", inputClick);

    return () => document.removeEventListener("click", inputClick);
  }, []);

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
          {!isAuthenticated() && (
            <Nav className="mr-auto" navbar>
              <NavItem style={{ padding: "0 0.5rem" }}>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem style={{ padding: "0 0.5rem" }}>
                <NavLink to="/">Sign-up</NavLink>
              </NavItem>
            </Nav>
          )}
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
                  <SearchBook book={book} />
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
