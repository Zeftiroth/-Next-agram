import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Row,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImg from "./UploadImg";

function MyProfilePage() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  let headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  let img = "https://insta.nextacademy.com/api/v1/images/me";

  let profImg = "https://insta.nextacademy.com/api/v1/users/me";

  const requestImg = Axios.get(img, headers);
  const requestProfImg = Axios.get(profImg, headers);

  useEffect(() => {
    Axios.all([requestImg, requestProfImg])
      .then(
        Axios.spread((...response) => {
          const responseImg = response[0];
          const responseProfImage = response[1];
          console.log(responseProfImage);
          console.log(responseImg);
          setProfData(responseImg.data);
          setProfImage(responseProfImage.data);
        })
      )
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  const [profData, setProfData] = useState([]);
  const [profImage, setProfImage] = useState([]);
  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="bg-dark container-fluid">
        <Row className="d-flex justify-content-center">
          <h1 className=" mt-4 py-1 px-3 d-flex justify-content-center bg-dark text-light text-monospace ">
            My Profile
          </h1>
        </Row>
        <Row>
          <CardBody className="h-100 d-flex flex-column justify-content-center flex-wrap ">
            <CardImg
              className="d-flex justify-content-center mx-auto w-50"
              src={profImage.profile_picture}
            ></CardImg>

            <h3 className="d-flex justify-content-center mt-3 text-light">
              Bio
            </h3>

            <CardSubtitle className=" mt-3 text-light d-flex justify-content-center">
              Placeholder Text
            </CardSubtitle>

            <div className="mt-3 text-light d-flex justify-content-center">
              <UploadImg />
            </div>
          </CardBody>
        </Row>
        <div className="col-10 d-flex mx-auto justify-content-center flex-wrap m-0">
          {profData.map(profData => {
            return (
              <CardBody className="text-center d-block flex-wrap">
                <CardImg
                  src={profData}
                  className="w-25 p-1 m-1 rounded-lg"
                  alt="..."
                />
              </CardBody>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyProfilePage;
