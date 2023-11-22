import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppLayout from "../layouts/AppLayout";
import { useSelector } from "react-redux";
import NewCoursePage from "../pages/NewCoursePage";
import DetailedCoursePage from "../pages/DetailedCoursePage";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user && user.type === "admin";
  return (
    <BrowserRouter>
      <Routes>
      {!isLoggedIn && (
          <Route element={<LoginLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses/:courseId" element={<DetailedCoursePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate replace to={"/"} />} />
          </Route>
        )}
        {isLoggedIn && (
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses/:courseId" element={<DetailedCoursePage />} />
            {isAdmin && <Route path="/register" element={<RegisterPage />} />}
            <Route path="/new-course" element={<NewCoursePage />} />
            <Route path="*" element={<Navigate replace to={"/"} />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;