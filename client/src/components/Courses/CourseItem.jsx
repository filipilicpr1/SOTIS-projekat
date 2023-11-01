import {
  Grow,
  Grid,
  Typography
} from "@mui/material";
import StyledCard from "../UI/Styled/StyledCard";
import { useNavigate } from "react-router-dom";

const CoursesItem = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/courses/${props.item.id}`);
  };

  return (
    <Grow in={true}>
      <Grid item xs={3}>
        <StyledCard
          onClick={clickHandler}
          sx={{
            m: 2,
            ml: 4,
            borderRadius: "8px",
            width: "1000px",
            backgroundColor: "#1ac334",
            backgroundImage: "linear-gradient(147deg, #1ac334 0%, #1ac334 74%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h4" variant="h4" sx={{ p: 1, color: "white", textAlign: "center" }}>
            {props.item.title}
          </Typography>
          <Typography component="h6" variant="h6" fontFamily={"cursive"} sx={{ pl: 2, color: "white" }}>
            {props.item.description}
          </Typography>
        </StyledCard>
      </Grid>
    </Grow>
  );
};

export default CoursesItem;
