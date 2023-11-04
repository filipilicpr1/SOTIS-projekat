import { useState, useRef } from "react";
import {
  Card,
  Divider,
  Typography,
  Box,
  Grow,
  Button,
  Input,
  Avatar,
  IconButton,
} from "@mui/material";
import DetailedCoursePdfList from "./DetailedCoursePdfList";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addPdfToCourseAction } from "../../store/courseSlice";

const PDFS = [
  {
    id: 1,
    name: "Pdf1.pdf",
  },
  {
    id: 2,
    name: "Pdf2.pdf",
  },
  {
    id: 3,
    name: "Pdf3.pdf",
  },
  {
    id: 4,
    name: "Pdf4.pdf",
  },
  {
    id: 5,
    name: "Pdf5.pdf",
  },
  {
    id: 6,
    name: "Pdf6.pdf",
  },
  {
    id: 7,
    name: "Pdf7.pdf",
  },
];

const DetailedCourse = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const pdfUploader = useRef();
  const params = useParams();
  const courseId = params.courseId;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestData = {
        "id" : courseId,
        "data" : data
    }

    dispatch(addPdfToCourseAction(requestData));
  };

  return (
    <Grow in={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
          m: 2,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80%",
            m: 1,
            backgroundColor: "white",
            boxShadow: "rgb(0, 128, 0) 0px 0px 0px 2px;",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              m: 2,
              mb: 3,
              fontFamily: "cursive",
              color: "green",
              fontWeight: "bold",
            }}
          >
            Biologija
          </Typography>
          <Divider sx={{ bgcolor: "#a3a3a2" }} />
          <DetailedCoursePdfList items={PDFS} />
        </Card>
        {isLoggedIn && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "20%",
              m: 1,
            }}
          >
            <IconButton
              sx={{ width: "375px", height: "35px", mt: 2 }}
              onClick={pdfUploadHandler}
            >
              <Avatar
                sx={{ width: "375px", height: "35px", borderRadius: "2%" }}
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
              sx={{ mt: -0.5 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!pdfUploaded}
              sx={{ mt: 1, mb: 2, color: "white" }}
            >
              ADD
            </Button>
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default DetailedCourse;
