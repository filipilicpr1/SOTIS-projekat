import { useEffect } from "react";
import { getCourseByIdAction, clearSelectedCourse } from "../store/courseSlice";
import { clearPdf, closeModal } from "../store/pdfSlice";
import { clearMessages } from "../store/chatSlice";
import { Box } from "@mui/material";
import DetailedCourse from "../components/DetailedCourse/DetailedCourse";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/Chat/ChatWindow";
import PdfPreview from "../components/DetailedCourse/PdfPreview";

const DetailedCoursePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const courseApiState = useSelector((state) => state.course.apiState);
  const pdfApiState = useSelector((state) => state.pdf.apiState);
  const pdfFile = useSelector((state) => state.pdf.pdfFile);

  useEffect(() => {
    dispatch(getCourseByIdAction(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedCourse());
      dispatch(closeModal());
      dispatch(clearPdf());
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", height: "700px" }}>
        <DetailedCourse />
        {pdfFile !== null && <PdfPreview />}
        <ChatWindow />
      </Box>
      <LoadingModal
        show={courseApiState === "PENDING" || pdfApiState === "PENDING"}
      />
    </>
  );
};

export default DetailedCoursePage;
