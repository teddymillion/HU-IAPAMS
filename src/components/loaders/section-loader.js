import { Box, CircularProgress, Typography } from '@mui/material';

export const SectionLoader = ({ loading, height, children }) => {
  console.log(loading, 'loading form section....');
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={23} />
        <Typography sx={{ mt: 1 }} variant="body1">
          Please wait a moment...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};