import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useDebounce } from "../utils";
import SearchBook from "./SearchBook";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const query = useDebounce(search, 500);

  useEffect(() => {
    const searchBooks = async (q) => {
      const response = await axios.get(`/api/books?search=${q}`);
      setBooks(response.data);
    };
    if (query !== "") {
      searchBooks(query);
    } else {
      setBooks([]);
    }
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
                  <ListGroupItem>
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
