import { Box, ListItem, ListItemText, Typography } from "@mui/material";

const ChatText = (props) => {
  return (
    <ListItem key={props.id}>
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
            <Typography sx={{color: "white", fontFamily: "cursive", fontWeight: "bold"}}>{props.text}</Typography>
          </ListItemText>
        </Box>
      </Box>
    </ListItem>
  );
};

export default ChatText;
