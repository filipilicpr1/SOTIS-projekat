import NewCourseForm from "../components/NewCourse/NewCourseForm";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector } from "react-redux";

const NewCoursePage = () => {
  const courseApiState = useSelector((state) => state.course.apiState);
  return (
    <>
      <NewCourseForm />
      <LoadingModal show={courseApiState === "PENDING"} />
    </>
  );
};

export default NewCoursePage;
