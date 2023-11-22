import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { getUserByIdAction } from "../store/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCoursesAction, clearAllCourses, changePage } from "../store/courseSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import Pagination from "../components/UI/Pagination/Pagination";
import CoursesList from "../components/Courses/CoursesList";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const { sub } = token ? jwtDecode(token) : { sub: null };
  const userApiState = useSelector((state) => state.user.apiState);
  const coursesApiState = useSelector((state) => state.course.apiState);
  const allCourses = useSelector((state) => state.course.allCourses);
  const page = useSelector((state) => state.course.page);
  const totalPages = useSelector((state) => state.course.totalPages);
  const pageSearch = new URLSearchParams(location.search).get("page");
  const currentPage =
    pageSearch !== null
      ? isNaN(parseInt(pageSearch))
        ? 1
        : parseInt(pageSearch)
      : 1;
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    return () => {
      dispatch(clearAllCourses());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isInitial) {
      return;
    }
    setIsInitial(false);
    dispatch(changePage(currentPage));
  }, [currentPage, dispatch, page, isInitial]);

  useEffect(() => {
    if (!sub) {
      return;
    }

    dispatch(getUserByIdAction(sub));
  }, [dispatch, sub]);

  useEffect(() => {
    dispatch(getAllCoursesAction(location.search));
  }, [dispatch, location.search]);

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: page < 2 ? "" : "?page=" + page,
    });
  }, [page, navigate, location.pathname]);

  const handleChange = (event, value) => {
    dispatch(changePage(value));
  };

  return (
    <>
      <CoursesList courses={allCourses} />
      {allCourses.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handleChange={handleChange}
        />
      )}
      <LoadingModal show={userApiState === "PENDING" || coursesApiState === "PENDING"} />
    </>
  );
};

export default HomePage;
