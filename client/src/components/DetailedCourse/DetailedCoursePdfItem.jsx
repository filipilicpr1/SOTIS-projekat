import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import StyledCard from "../UI/Styled/StyledCard";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/pdfSlice";
import { getPdfByIdAction } from "../../store/pdfSlice";

const DetailedCoursePdfItem = (props) => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const apiState = useSelector((state) => state.pdf.apiState);
  const pdfFile = useSelector((state) => state.pdf.pdfFile);

  const clickHandler = () => {
    dispatch(getPdfByIdAction(props.id));
    setRequestSent(true);
  };

  useEffect(() => {
    if (!requestSent) {
      return;
    }

    if (!(apiState === "COMPLETED")) {
      return;
    }

    if (pdfFile === null) {
      return;
    }

    dispatch(openModal());
  }, [apiState, requestSent, dispatch, pdfFile]);

  return (
    <Box sx={{ width: "100%" }}>
      <StyledCard
        onClick={clickHandler}
        sx={{
          m: 1.5,
          borderRadius: "5px",
          width: "250px",
          backgroundColor: "white",
          boxShadow: "rgb(255, 156, 85) 0px 0px 0px 2px;",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          component="h6"
          variant="h6"
          style={{ wordWrap: "break-word"}}
          sx={{ p: 1, color: "orange", fontFamily: "cursive", width: "90%", fontSize: 14 }}
        >
          {props.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "10%",
          }}
        >
          <FileOpenIcon style={{ color: "orange" }} />
        </Box>
      </StyledCard>
    </Box>
  );
};

export default DetailedCoursePdfItem;
