import { useState } from "react";
import { Hidden, Typography, Button, Box, Grid } from "@mui/material";
import AuthModal from "./AuthModal";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      boxSizing="border-box"
      height="100vh"
      bgcolor="#56B7BA"
      color="#fff"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Short Link App</Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login/Signup
        </Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Short Links, Big Results.</Typography>
              <Box my={2}>
                <Typography>
                Easy way to make a link short with lots of advantages
                </Typography>
              </Box>
              <Button
                onClick={() => setOpenAuthModal(true)}
                // disableElevation
                variant="contained"
                size="large"
                style={{ color: "#56BBA" }}
              >
                Create a short link in a clicks And Get statistics of your short URLs.
              </Button>
            </Box>
          </Grid>
          <Hidden only="xs">
            <Grid item sm={6}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                src="/assets/mockup.png"
                alt="mockup"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
