import { useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const user = useSelector((state) => state.user.user);
  const isAdmin = user && user.type === "admin";
  const registerBorderOptions =
    pathname === "/register"
      ? { border: "1px solid white", borderRadius: "15%" }
      : {};
  const courseBorderOptions =
    pathname === "/new-course"
      ? { border: "1px solid white", borderRadius: "15%" }
      : {};

  const registerIconClickHandler = () => {
    navigate("/register");
  };

  const courseIconClickHandler = () => {
    navigate("/new-course");
  };

  return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
      <PostAddIcon
        onClick={courseIconClickHandler}
        style={{ color: "white" }}
        sx={{
          mt: 2.5,
          mr: 7,
          transform: "scale(1.8)",
          cursor: "pointer",
          ...courseBorderOptions,
        }}
      />
      {isAdmin && (
        <PersonAddAltIcon
          onClick={registerIconClickHandler}
          style={{ color: "white" }}
          sx={{
            mt: 2.5,
            mr: 4,
            transform: "scale(1.8)",
            cursor: "pointer",
            ...registerBorderOptions,
          }}
        />
      )}
    </Box>
  );
};

export default Navigation;
