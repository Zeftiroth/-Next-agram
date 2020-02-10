import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";
import LoadingScreen from "./components/loader.js";
import NavTop from "./components/nav.js";
import Homepage from "./components/hompage.js";
import { Route, Link } from "react-router-dom";
import UserProfilePage from "./UserProfilePage";
import WelcomeGif from "./welcomeGif.js";
import { ToastContainer, toast } from "react-toastify";
import MyProfilePage from "./components/MyProfilePage";
// import { useHistory } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );
  // const redirectHome = () => {
  // let history = useHistory()
  const setLogInStateToTrue = () => {
    if (localStorage.getItem("jwt")) {
      setLoggedIn(true);
      toast.success("You have successfully logged in");
    } else {
      setLoggedIn(false);
      toast.error("You have NOT successfully logged in");
    }
  };
  useEffect(() => {
    Axios.get("https://insta.nextacademy.com/api/v1/users").then(result => {
      // console.log(result);
      setUsers(result.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <div>
          <NavTop
            className="d-flex justify-content-between col-12 px-0 mx-0"
            users={users}
            setLogInStateToTrue={setLogInStateToTrue}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <ToastContainer />
          <Container className=" col-12 d-block justify-content-center mx-auto px-0">
            <Route exact path="/profile">
              <MyProfilePage />
            </Route>

            <Route exact path="/Home">
              <Homepage users={users} />
            </Route>
            <Route path="/users/:id">
              <UserProfilePage users={users} />
            </Route>
          </Container>
        </div>
      </>
    );
  }
}

export default App;

// {/* <Route path="/users/:id" component={UserImages} /> */}

// {/* <Route
//   exact
//   path="/"
//   component={props => {
//     return <Homepage users={users} />;
//   }}
// />

// <Route
//   exact
//   path="/"
//   render={props => <Homepage {...props} users={users} />}
// /> */}

// <Row className="col-12 d-flex justify-content-center mx-auto">
//   <Link to="/Home">Home</Link>
// </Row>
// <Row className="col-12 d-flex justify-content-center mx-auto">
//   <Link to="/users/1">My Profile</Link>
// </Row>
