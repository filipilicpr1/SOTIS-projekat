import { Stack, PaginationItem, Grow } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Pagination = ({ page, totalPages, handleChange }) => {
  return (
    <Grow in={true}>
      <Stack
        spacing={2}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MuiPagination
          count={totalPages}
          siblingCount={0}
          boundaryCount={1}
          page={page}
          color="primary"
          size="large"
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </Grow>
  );
};

export default Pagination;
