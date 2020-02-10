import React, { useState } from "react";
import {
  Form,
  FormGroup,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardImg
} from "reactstrap";
import Axios from "axios";
import LoadingScreen from "./loader";

const UploadImg = props => {
  const { buttonLabel, className } = props;
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState();
  const [modal, setModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => setModal(!modal);
  const handleImage = e => {
    let image = e.target.files[0];
    let imagePlus = URL.createObjectURL(image);
    setImagePreview(imagePlus);
    setImageUpload(image);
  };

  const handleUpload = e => {
    setIsLoading(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", imageUpload);
    let jwt = localStorage.getItem("jwt");
    Axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(result => {
        if (result.data.success) {
          setResponseMessage("Image uploaded successfully!");
          setIsLoading(false);
        } else {
          setResponseMessage("Error uploading Image.");
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error.response);
        setResponseMessage("Major error, contact admin!");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        Upload a picture{buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Upload an Image</ModalHeader>
        <ModalBody>
          <div
            className="border border-light rounded mx-auto d-block mt-4"
            style={{ height: "400px", width: "400px", position: "relative" }}
          >
            {isLoading ? (
              <LoadingScreen />
            ) : imagePreview ? (
              responseMessage ? (
                <h2
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  {responseMessage}
                </h2>
              ) : (
                <img
                  className="w-75"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                  src={imagePreview}
                  alt="preview"
                />
              )
            ) : (
              <h2
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                Choose image to preview
              </h2>
            )}
          </div>
        </ModalBody>
        <Form onSubmit={handleUpload}>
          <FormGroup className="w-75 mx-auto d-block">
            <CustomInput
              type="file"
              id="exampleCustomFileBrowser"
              name="customFile"
              className="mt-4"
              onChange={handleImage}
            />
          </FormGroup>
        </Form>
        <ModalFooter>
          <Button
            outline
            color="primary"
            onClick={e => {
              handleUpload(e);
            }}
          >
            Upload
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UploadImg;
