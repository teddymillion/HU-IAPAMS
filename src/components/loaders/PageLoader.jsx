import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import "./PageLoader.css";

export const PageLoader = ({ loading, error, children }) => {
  if (loading && !error) {
    return (
      <Box className="page-loader" width={"100%"}>
        <Card sx={{ m: 0 }}>
          <Box
            sx={{ minHeight: "300px" }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CircularProgress size={23} />
            <Typography sx={{ mt: 1 }} variant="body1">
              Please wait a moment...
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  } else if (error) {
    return (
      <div className="page-loader">
        <Card sx={{ m: 0 }}>
          <Box
            sx={{ minHeight: "300px" }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {error.icon ? (
              error.icon
            ) : (
              <ErrorOutline fontSize={"large"} color="error" />
            )}

            <Typography
              sx={{ mt: 1, maxWidth: "70%", textAlign: "center" }}
              variant="body1"
            >
              {error.message || "Something went wrong."}
            </Typography>
            {error.button && (
              <Button
                sx={error.button.sx}
                variant={error.button.variant}
                onClick={error.button.onClick}
              >
                {error.button.label}
              </Button>
            )}
          </Box>
        </Card>
      </div>
    );
  }
  return <>{children}</>;
};

PageLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    icon: PropTypes.node,
    message: PropTypes.string.isRequired,
    button: PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(["text", "outlined", "contained"]),
      sx: PropTypes.object,
      onClick: PropTypes.func,
    }),
  }),
  children: PropTypes.node.isRequired,
};

export default PageLoader;