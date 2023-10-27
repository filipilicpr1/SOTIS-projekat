import { AppBar, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../components/UI/Logo/Logo";
import StyledButton from "../components/UI/Styled/StyledButton";
import { useNavigate } from "react-router-dom";

const LoginLayout = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                <Toolbar>
                  <Logo text="Learn Online" />
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
                    bgcolor: "#009000",
                    backgroundImage:
                      "linear-gradient(147deg, #009000 0%, #009000 74%)",
                    mb: 2,
                  }}
                >
                  LOGIN
                </StyledButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default LoginLayout;