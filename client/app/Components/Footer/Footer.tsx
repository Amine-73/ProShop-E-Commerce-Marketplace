import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Box sx={{ bgcolor: '#121212', color: 'gray', py: 4, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            ProShop &copy; {new Date().getFullYear()} | All Rights Reserved
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;