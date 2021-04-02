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
        <NavbarBrand href="/">Liber</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="searchBook">
              <InputGroup>
                <Input
                  value={search}
                  placeholder="Search Books"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <ListGroup className="searchBook__list">
                {books?.map((book) => (
                  <ListGroupItem key={book.id}>
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
