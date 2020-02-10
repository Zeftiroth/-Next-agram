import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import LogIn from "./logIn";

const NavTop = ({ setLogInStateToTrue, loggedIn, setLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    return <Redirect to="/" />;
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/Home">
          "Next"agram
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink> */}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Nothing to see here
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Don't Click Me</DropdownItem>
                <DropdownItem>Not on me either</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Im out!</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {!loggedIn ? (
              <Button color="secondary">
                <LogIn setLogInStateToTrue={setLogInStateToTrue} />
              </Button>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Logged In
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    className="d-flex flex-row justify-content-center"
                    onClick={logOut}
                  >
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavTop;
