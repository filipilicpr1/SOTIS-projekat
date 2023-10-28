import { AppBar, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../components/UI/Logo/Logo";
import StyledButton from "../components/UI/Styled/StyledButton";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isAdmin = user && user.type === "admin";
  const text =
    user === null
      ? "Learn Online"
      : `Hello ${user.first_name} ${user.last_name}`;

  const clickHandler = () => {
    dispatch(logout());
    navigate("/login")
  };

  const iconClickHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                <Toolbar>
                  <Logo text={text} />
                </Toolbar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "50%",
                }}
              >
                <StyledButton
                  onClick={clickHandler}
                  sx={{
                    mt: 1.5,
                    width: "15%",
                    borderRadius: "5px",
                    bgcolor: "#b50511",
                    backgroundImage:
                      "linear-gradient(147deg, #b50511 0%, #b50511 74%)",
                    mb: 2,
                  }}
                >
                  LOGOUT
                </StyledButton>
                {isAdmin && (
                  <PersonAddAltIcon
                    onClick={iconClickHandler}
                    style={{ color: "white" }}
                    sx={{
                      mt: 2.5,
                      mr: 4,
                      transform: "scale(1.8)",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
