import { useState, useEffect } from "react";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/pdfSlice";
import { getPdfByIdAction } from "../../store/pdfSlice";

const ChatText = (props) => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const apiState = useSelector((state) => state.pdf.apiState);
  const pdfFile = useSelector((state) => state.pdf.pdfFile);

  const clickHandler = () => {
    dispatch(getPdfByIdAction(props.pdf.id));
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
    <ListItem key={props.id} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: props.align === "left" ? "flex-start" : "flex-end",
          width: "100%",
        }}
      >
        <Box
          sx={{
            justifyContent: "flex-end",
            maxWidth: "70%",
            width: "auto",
            backgroundColor: props.align === "left" ? "grey" : "#1ac334",
            borderRadius: "10px",
            p: 1,
          }}
        >
          <ListItemText align={props.align}>
            <Typography
              sx={{ color: "white", fontFamily: "cursive", fontWeight: "bold" }}
            >
              {props.text}
            </Typography>
          </ListItemText>
        </Box>
      </Box>
      {props.pdf && (
        <Typography
          onClick={clickHandler}
          sx={{
            textAlign: "left",
            width: "100%",
            pt: 1,
            pl: 1,
            fontFamily: "cursive",
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            textDecoration: "underline",
            color: "green"
          }}
        >
          {props.pdf.title}
        </Typography>
      )}
    </ListItem>
  );
};

export default ChatText;
