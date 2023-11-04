import { Card } from "@mui/material";
import DetailedCourse from "../components/DetailedCourse/DetailedCourse";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector } from "react-redux";

const DetailedCoursePage = () => {
  const courseApiState = useSelector((state) => state.course.apiState);
  return (
    <>
      <Card sx={{ display: "flex", flexDirection: "row", height: "700px" }}>
        <DetailedCourse />
        <Card sx={{ border: "1px solid green", width: "75%", m: 2 }}></Card>
      </Card>
      <LoadingModal show={courseApiState === "PENDING"} />
    </>
  );
};

export default DetailedCoursePage;
