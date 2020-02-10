import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  FormText
} from "reactstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const SignUp = props => {
  const postResponse = () => {
    Axios.post("https://insta.nextacademy.com/api/v1/users/", {
      username: usernameDetails,
      email: emailDetails,
      password: passwordDetails
    })
      .then(response => {
        toast.success("You have successfully signed up");
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  //   const getResponse = () => {
  //     Axios.post("https://insta.nextacademy.com/api/v1/users/").then(response => {
  //       console.log(response);
  //     });
  //   };

  const [personalInfo, setPersonalInfo] = useState([]);
  const [usernameDetails, setUsernameDetails] = useState("");
  const [emailDetails, setEmailDetails] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const [confirmPasswordDetails, setConfirmPasswordDetails] = useState("");

  const submitData = () => {
    console.log(`Username is ${usernameDetails}`);
    console.log(`Email is ${emailDetails}`);
    console.log(`Password is ${passwordDetails}`);
    const newPersonal = [...personalInfo];
    newPersonal.push([
      { usernameDetails },
      { emailDetails },
      { passwordDetails }
    ]);
    setPersonalInfo(newPersonal);
    console.log(personalInfo);
    setUsernameDetails("");
    setPasswordDetails("");
    setEmailDetails("");
    setConfirmPasswordDetails("");
    postResponse();
    redirect();
  };

  const redirect = () => {
    return <Redirect to="/Home" />;
  };
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  const handleChangePass = e => {
    const pass = e.target.value;
    setPasswordDetails(pass);
    console.log(passwordDetails);
  };

  const handleChangeConfirmPass = e => {
    const conPass = e.target.value;
    setConfirmPasswordDetails(conPass);
    console.log(confirmPasswordDetails);
  };

  const handleChangeUser = e => {
    const user = e.target.value;
    setUsernameDetails(user);
    console.log(usernameDetails);
  };
  const printUserFormFeedback = () => {
    return (
      <FormFeedback>Invalid! Please enter more than 8 characters</FormFeedback>
    );
  };

  const printValidUsername = () => {
    if (usernameDetails.length < 8) {
      printUserFormFeedback();
      return { invalid: true };
    } else if (usernameDetails.length >= 8 && usernameDetails.length <= 50) {
      return { valid: true };
    }
  };
  const printEmailFeedback = () => {
    return (
      <FormFeedback>Invalid! Please enter more than 8 characters!</FormFeedback>
    );
  };

  const printValidEmail = () => {
    if (emailDetails.length < 8) {
      printEmailFeedback();
      return { invalid: true };
    } else if (emailDetails.length >= 8 && emailDetails.length <= 50) {
      return { valid: true };
    }
  };
  const printPassFeedback = () => {
    return (
      <FormFeedback>Invalid! Please enter more than 8 characters!</FormFeedback>
    );
  };

  const printValidPass = () => {
    if (passwordDetails.length >= 1 && passwordDetails.length < 8) {
      printPassFeedback();
      return { invalid: true };
    } else if (passwordDetails.length >= 8 && passwordDetails.length <= 50) {
      return { valid: true };
    }
  };

  const printConPassFeedback = () => {
    return (
      <FormFeedback>Invalid! Please enter more than 8 characters!</FormFeedback>
    );
  };

  const printValidConPass = () => {
    if (
      confirmPasswordDetails.length >= 1 &&
      confirmPasswordDetails.length < 8
    ) {
      printConPassFeedback();
      return { invalid: true };
    } else if (
      confirmPasswordDetails.length >= 8 &&
      confirmPasswordDetails.length <= 50
    ) {
      return { valid: true };
    }
  };

  const handleChangeEmail = e => {
    const email = e.target.value;
    setEmailDetails(email);
    console.log(emailDetails);

    // getResponse();
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Sign Up
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        external={externalCloseBtn}
      >
        <ModalHeader>Sign Up</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                Username
              </Label>
              <Col sm={10}>
                <Input
                  onChange={e => {
                    handleChangeUser(e);
                  }}
                  type="username"
                  name="username"
                  id="exampleUsername"
                  placeholder="Username"
                  value={usernameDetails}
                  {...printValidUsername()}
                />
                <FormText>
                  Username must be more than 8 characters long.
                </FormText>
                {printUserFormFeedback()}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input
                  onChange={handleChangeEmail}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="example@email.com"
                  value={emailDetails}
                  {...printValidEmail()}
                />
                {printEmailFeedback()}
                <FormText>Email should look like example@example.com</FormText>
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
                  {...printValidPass()}
                />
                {printPassFeedback()}
                <FormText>Password must be more than 8 characters.</FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSignUpPassword" sm={2}>
                Confirm Password
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="password"
                  id="exampleSignUpPassword"
                  placeholder="Confirm Password"
                  onChange={handleChangeConfirmPass}
                  value={confirmPasswordDetails}
                  {...printValidConPass()}
                />
                {printConPassFeedback()}
                <FormText>
                  Confirmation Password must be the same as Password.
                </FormText>
              </Col>{" "}
            </FormGroup>
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
            Sign Up
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignUp;
