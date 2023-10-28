import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyStyledButton = styled(Button)(({ theme }) => ({
  transition: "transform 0.35s ease-in-out",
  cursor: "pointer",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
}));

const StyledButton = (props) => {
  return (
    <MyStyledButton
      size="large"
      variant="contained"
      onClick={props.onClick}
      sx={props.sx}
    >
      <Typography sx={{ color: "white" }}>{props.children}</Typography>
    </MyStyledButton>
  );
};

export default StyledButton;
