import { Grid, Container, CssBaseline, Grow } from "@mui/material";
import CoursesItem from "./CourseItem";

const CoursesList = (props) => {
  const items = props.courses.map((course) => (
    <CoursesItem key={course.id} item={course} />
  ));

  return (
    <>
      {props.courses.length > 0 && (
        <Grow in={true}>
          <Container
            component="main"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <CssBaseline />
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "100%",
                mt: 4,
                p: 4,
                ml: 2,
                mb: -6,
              }}
            >
              {items}
            </Grid>
          </Container>
        </Grow>
      )}
    </>
  );
};

export default CoursesList;
