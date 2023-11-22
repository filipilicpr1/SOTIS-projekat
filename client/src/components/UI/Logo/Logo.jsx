import { Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

const Logo = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <>
      <SchoolIcon onClick={clickHandler} sx={{ cursor: "pointer", ml: -3 }} style={{ color: 'white' }} />
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, cursor: "default", m: 1.5, ml: 2, color: "white" }}
      >
        {props.text}
      </Typography>
    </>
  );
};

export default Logo;