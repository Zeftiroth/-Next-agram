import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import SignUp from "./signUp";
import Axios from "axios";

const LogIn = props => {
  const { buttonLabel, className, setLogInStateToTrue } = props;
  //   const logInRef = useRef();
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [usernameDetails, setUsernameDetails] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  //   const [auth, setAuth] = useState("");
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const postResponse = () => {
    Axios.post("https://insta.nextacademy.com/api/v1/login", {
      username: usernameDetails,

      password: passwordDetails
    })
      .then(response => {
        // toast.success("You have successfully logged in");
        localStorage.setItem("jwt", response.data.auth_token);
        console.log(response);

        setLogInStateToTrue();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [personalInfo, setPersonalInfo] = useState([]);
  const [text, setText] = useState("");

  const submitData = () => {
    console.log(`Username is ${usernameDetails}`);
    console.log(`Password is ${passwordDetails}`);
    const newPersonal = [...personalInfo];
    newPersonal.push([{ usernameDetails }, { passwordDetails }]);
    setPersonalInfo(newPersonal);
    console.log(personalInfo);
    setPasswordDetails("");
    setUsernameDetails("");
    postResponse();
  };

  const handleChange = e => {
    const user = e.target.value;
    setUsernameDetails(user);
    console.log(usernameDetails);
  };

  const handleChangePass = e => {
    const pass = e.target.value;
    setPasswordDetails(pass);
    console.log(passwordDetails);
  };

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        Log In
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <div className="mr-5 d-flex justify-content-center">Log In</div>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Username
              </Label>
              <Col sm={10}>
                <Input
                  onChange={handleChange}
                  type="username"
                  name="username"
                  id="exampleUser"
                  placeholder="Username"
                  value={usernameDetails}
                  //   ref={logInRef}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                Password
              </Label>
              <Col sm={10}>
                <Input
                  onChange={handleChangePass}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  value={passwordDetails}
                />
                <FormFeedback>Please enter more than 1 character</FormFeedback>
              </Col>
            </FormGroup>
            <Label for="exampleSelect" sm={6}>
              Not a member?
            </Label>
            <Col>
              <SignUp />
            </Col>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              submitData();
            }}
          >
            Log In
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LogIn;
