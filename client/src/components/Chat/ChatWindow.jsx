import React, { useState } from "react";
import {
  TextField,
  Typography,
  List,
  Fab,
  Grow,
  Box,
  Card,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import { getAnswerAction, askQuestion } from "../../store/chatSlice";
import { useParams } from "react-router-dom";
import ChatText from "./ChatText";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const chatApiState = useSelector((state) => state.chat.apiState);
  const messages = useSelector((state) => state.chat.messages);
  const [question, setQuestion] = useState("");

  const chatContent = messages.map((message, index) => (
    <ChatText
      key={index}
      id={index}
      align={message.align}
      text={message.text}
    />
  ));

  const questionChangeHandler = (event) => {
    setQuestion(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (chatApiState === "PENDING" || question.trim().length === 0) {
      return;
    }

    const data = {
      question: question,
      id: courseId,
    };

    dispatch(askQuestion(data));
    dispatch(getAnswerAction(data));
    setQuestion("");
  };

  return (
    <>
      {selectedCourse !== null && (
        <Grow in={true}>
          <Box sx={{ width: "80%", maxWidth: "80%", m: 2 }}>
            <Card
              sx={{
                m: 1,
                height: "98%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                boxShadow: "rgb(0, 128, 0) 0px 0px 0px 2px;",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Box>
                <Card sx={{ bgcolor: "#1ac334", position: "static" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      m: 2,
                      mb: 3,
                      fontFamily: "cursive",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "static",
                    }}
                  >
                    Postavi pitanje
                  </Typography>
                </Card>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "89%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundImage:
                    "url(data:image/jpeg;base64,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)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <List
                    sx={{
                      height: "92%",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    {chatContent}
                  </List>
                  {chatApiState === "PENDING" && (
                    <Stack sx={{ width: "100%", pl: 4, pr: 4 }} spacing={2}>
                      <LinearProgress color="success" />
                    </Stack>
                  )}
                  <Box
                    component={"form"}
                    onSubmit={submitHandler}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ width: "100%", m: 2, mr: 0, pr: 2 }}>
                      <TextField
                        value={question}
                        onChange={questionChangeHandler}
                        disabled={chatApiState === "PENDING"}
                        id="question"
                        name="question"
                        label="Postavi pitanje"
                        fullWidth
                        sx={{
                          border: "1px solid green",
                          bgcolor: "white",
                          borderRadius: "5px",
                        }}
                        InputLabelProps={{
                          style: { color: "green", bgcolor: "red" },
                        }}
                      />
                    </Box>
                    <Box align="right" sx={{ width: "auto", mt: 3, mr: 2 }}>
                      <Fab
                        type="submit"
                        disabled={chatApiState === "PENDING"}
                        color="primary"
                        aria-label="add"
                        size="small"
                      >
                        <SendIcon style={{ color: "white" }} />
                      </Fab>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grow>
      )}
    </>
  );
};

export default ChatWindow;
