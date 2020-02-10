import React, { useEffect, useState } from "react";
import { useParams, Router } from "react-router-dom";
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
import Axios from "axios";
// import UserImages from "./components/userImages.js";
import Image from "react-graceful-image";

function UserProfilePage({ users }) {
  let { id } = useParams();

  const [imgArray, setImgArray] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`).then(
      result => {
        console.log(users);
        const imgArrayCopy = [...result.data];
        setImgArray(imgArrayCopy);
      }
    );

    users.forEach(user => {
      if (user.id === parseInt(id)) {
        setUsername(user.username);
        setProfileImage(user.profileImage);
      }
    });
  }, []);

  return (
    <Container className="container-fluid col-12 mx-0 px-0 bg-dark ">
      <Row className="d-flex justify-content-center col-8 mx-auto">
        <Card>
          <CardBody>
            <CardTitle
              style={{ fontSize: "2rem" }}
              className="font-weight-bold d-flex"
            >
              {username}'s Pictures
            </CardTitle>
            <CardImg
              className="d-flex w-50 justify-content-center mx-auto"
              src={profileImage}
              alt={username}
            ></CardImg>
          </CardBody>
        </Card>
      </Row>
      <Container className=" d-flex flex-row flex-wrap justify-content-between">
        {imgArray.map(image => {
          console.log(image);
          return (
            <Row
              className=" col-4 d-flex flex-row"
              key={image.id}
              id={image.id}
            >
              <Card className="mt-3">
                <CardBody
                  className="d-flex align-items-center  "
                  style={{ backgroundColor: "whitesmoke" }}
                >
                  <CardImg className="py-auto my-auto" src={image}></CardImg>
                </CardBody>
              </Card>
            </Row>
          );
        })}
      </Container>
    </Container>
  );
}

export default UserProfilePage;
