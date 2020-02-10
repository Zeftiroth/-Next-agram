import React from "react";
import UserImages from "./userImages";
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardImg,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Homepage({ users }) {
  return (
    <Container className="container-fluid col-12 mx-0 px-0 bg-dark ">
      <Container className="col-10">
        {users.map(user => {
          const userId = user.id;
          return (
            <Row key={user.id} id={user.id}>
              <Col>
                <Card className="mt-3">
                  <CardBody style={{ backgroundColor: "whitesmoke" }}>
                    <CardTitle
                      style={{ fontSize: "2rem" }}
                      className="font-weight-bold d-flex"
                    >
                      {" "}
                      {user.username}{" "}
                    </CardTitle>
                    <Container className="col-12 d-flex flex-row align-items-center pl-0 pr-3">
                      <CardImg
                        className="col-4 w-50 d-flex flex-row align-items-center pl-0"
                        src={user.profileImage}
                        alt={user.username}
                      />
                      <UserImages userId={userId} />
                    </Container>
                    <Button
                      tag={Link}
                      to={`/users/${user.id}`}
                      className="d-block mx-auto mt-5 mb-5"
                    >
                      Profile
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </Container>
  );
}

export default Homepage;
