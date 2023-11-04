import { Typography, Box } from "@mui/material";
import StyledCard from "../UI/Styled/StyledCard";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const DetailedCoursePdfItem = (props) => {
  const clickHandler = () => {
    console.log("clicked on " + props.name);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledCard
        onClick={clickHandler}
        sx={{
          m: 1.5,
          borderRadius: "5px",
          width: "325px",
          backgroundColor: "white",
          boxShadow: "rgb(255, 156, 85) 0px 0px 0px 2px;",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          component="h6"
          variant="h6"
          sx={{ p: 1, color: "orange", fontFamily: "cursive", width: "80%" }}
        >
          {props.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "20%",
            mt: 1.5,
            mr: 1,
          }}
        >
          <FileOpenIcon style={{ color: "orange" }} />
        </Box>
      </StyledCard>
    </Box>
  );
};

export default DetailedCoursePdfItem;
