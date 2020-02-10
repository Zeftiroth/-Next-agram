import React, { useState, useEffect } from "react";
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
import Image from "react-graceful-image";
import Axios from "axios";
import graceful from "./graceful-img";

function UserImages({ userId }) {
  //   console.log(userId);
  useEffect(() => {
    Axios.get(
      `https://insta.nextacademy.com/api/v2/images?userId=${userId}`
    ).then(result => {
      console.log(result.data);
      setUserPunyaImages(result.data);
      setIsLoading(false);
      //     return (
      // )
    });
  }, []);

  const [userPunyaImages, setUserPunyaImages] = useState([]);

  //   return <div>Hello</div>;
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Container className=" col-6 d-flex flex-row flex-wrap mx-0 px-0 mt-2">
      {userPunyaImages.map(userId => {
        return (
          <Image
            key={userId.id}
            id={userId.id}
            className="d-flex flex-row w-25 "
            if
            is
            src={userId.url}
            alt={userId.id}
          />
        );
      })}
    </Container>
  );
}
export default UserImages;
