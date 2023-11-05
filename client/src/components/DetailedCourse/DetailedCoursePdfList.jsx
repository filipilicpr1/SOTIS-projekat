import { Container, CssBaseline, Grow, Box } from "@mui/material";
import DetailedCoursePdfItem from "./DetailedCoursePdfItem";
import PdfPreview from "./PdfPreview";

const DetailedCoursePdfList = (props) => {
  const items = props.items.map((item) => (
    <DetailedCoursePdfItem key={item.id} id={item.id} name={item.title} />
  ));

  return (
    <>
      {props.items.length > 0 && (
        <Grow in={true}>
          <Container
            component="main"
            sx={{ display: "flex", flexDirection: "column", mt: 2, ml: -2 }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {items}
            </Box>
            <PdfPreview />
          </Container>
        </Grow>
      )}
    </>
  );
};

export default DetailedCoursePdfList;
