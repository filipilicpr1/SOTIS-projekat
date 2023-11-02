import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyStyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.35s ease-in-out",
  cursor: "pointer",
  "&:hover": { transform: "scale3d(1.04, 1.04, 1)" },
}));

const StyledCard = (props) => {
    return(
        <MyStyledCard onClick={props.onClick} sx={props.sx}>
            {props.children}
        </MyStyledCard>
    );
}

export default StyledCard;