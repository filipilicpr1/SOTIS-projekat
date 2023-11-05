import { useEffect } from "react";
import { getCourseByIdAction, clearSelectedCourse } from "../store/courseSlice";
import { Card } from "@mui/material";
import DetailedCourse from "../components/DetailedCourse/DetailedCourse";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DetailedCoursePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const courseApiState = useSelector((state) => state.course.apiState);
  const pdfApiState = useSelector((state) => state.pdf.apiState);

  useEffect(() => {
    dispatch(getCourseByIdAction(courseId))
  }, [dispatch, courseId]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedCourse());
    };
  }, [dispatch]);

  return (
    <>
      <Card sx={{ display: "flex", flexDirection: "row", height: "700px" }}>
        <DetailedCourse />
        <Card sx={{ border: "1px solid green", width: "75%", m: 2 }}></Card>
      </Card>
      <LoadingModal show={courseApiState === "PENDING" || pdfApiState === "PENDING"} />
    </>
  );
};

export default DetailedCoursePage;
