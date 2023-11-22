import { Commet } from "react-loading-indicators";
import { Modal, Box } from "@mui/material";

const LoadingModal = (props) => {
  return (
    <Modal open={props.show}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 165,
          p: 4,
          alignItems: "center",
          outline: "none",
        }}
      >
        <Commet color="#ffffff" size="large" />
      </Box>
    </Modal>
  );
};

export default LoadingModal;