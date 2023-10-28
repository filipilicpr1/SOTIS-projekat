import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Zoom,
  Input,
  IconButton,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useDispatch, useSelector } from "react-redux";
import { createNewCourse } from "../../store/courseSlice";
import { useNavigate } from "react-router-dom";

const NewCourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const pdfUploader = useRef();
  const [requestSent, setRequestSent] = useState(false);
  const apiState = useSelector((state) => state.course.apiState);

  const titleChangeHandler = (event) => {
    setIsTitleValid(event.target.value.trim().length > 0);
  };

  const titleBlurHandler = (event) => {
    setIsTitleTouched(true);
  };

  const descriptionChangeHandler = (event) => {
    setIsDescriptionValid(event.target.value.trim().length > 0);
  };

  const descriptionBlurHandler = (event) => {
    setIsDescriptionTouched(true);
  };

  const pdfChangeHandler = (event) => {
    const file = event.target.files[0];
    setPdfUploaded(file !== null);
    setPdfName(file !== null ? file.name : "");
  };

  const pdfUploadHandler = () => {
    if (!pdfUploader.current) {
      return;
    }

    pdfUploader.current.children[0].click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const description = data.get("description");
    if (title == null || description == null || !pdfUploaded) {
      return;
    }

    dispatch(createNewCourse(data));
    setRequestSent(true);
  };

  useEffect(() => {
    if (!requestSent) {
      return;
    }

    if (!(apiState === "COMPLETED")) {
      return;
    }

    navigate("/");
  }, [apiState, navigate, requestSent, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PostAddIcon style={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create A Course
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={isTitleTouched && !isTitleValid}
              fullWidth
              id="title"
              label="Course Title"
              name="title"
              autoComplete="title"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
            <TextField
              margin="normal"
              required
              multiline
              error={isDescriptionTouched && !isDescriptionValid}
              fullWidth
              name="description"
              label="Course Description"
              type="text"
              id="description"
              autoComplete="description"
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            />
            <IconButton
              sx={{ width: "400px", height: "50px", mt: 2 }}
              onClick={pdfUploadHandler}
            >
              <Avatar
                sx={{ width: "400px", height: "50px", borderRadius: "2%" }}
                alt="pic"
              >
                <PostAddIcon
                  style={{ color: pdfUploaded ? "green" : "black" }}
                />
              </Avatar>
            </IconButton>
            <Box sx={{ display: "none" }}>
              <Input
                ref={pdfUploader}
                name="pdfFile"
                type="file"
                inputProps={{ accept: ".pdf" }}
                onChange={pdfChangeHandler}
              />
            </Box>
            <Input
              fullWidth
              disabled
              name="pdfName"
              type="text"
              id="pdfName"
              autoComplete="pdfName"
              value={pdfName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isTitleValid || !isDescriptionValid || !pdfUploaded}
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Container>
  );
};

export default NewCourseForm;
