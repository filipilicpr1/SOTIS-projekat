import { Box, Grid, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, clearPdf } from "../../store/pdfSlice";
import CloseIcon from "@mui/icons-material/Close";

const PdfPreview = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.pdf.modalOpen);
  const pdfFile = useSelector((state) => state.pdf.pdfFile);

  const clickHandler = () => {
    dispatch(closeModal());
    dispatch(clearPdf());
  };
  return (
      <Slide in={modalOpen} direction="right">
        <Box
          sx={{
            width: "180%",
            height: "95%",
            mt: 2.5,
            backgroundColor: "white",
            border: "2px solid #000",
            borderRadius: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",

            pt: 2,
            pl: 6,
            pb: 3,
          }}
        >
          <Grid container sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                height: "10%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon
                sx={{ mt: -1, mr: 1, cursor: "pointer" }}
                onClick={clickHandler}
              />
            </Box>
            <Box sx={{ height: "90%", ml: -2 }}>
              {
                pdfFile !== null && <embed
                src={`data:application/pdf;base64,${pdfFile}`}
                width={"95%"}
                height={"400%"}
              />
              }
              
            </Box>
          </Grid>
        </Box>
      </Slide>
  );
};

export default PdfPreview;
