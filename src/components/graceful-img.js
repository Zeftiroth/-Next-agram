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

function graceful() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1580554996018-ff8b408fc162?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      width="300"
      height="300"
      alt="My awesome image"
    />
  );
}

export default graceful;
