import { useState } from "react";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

// const resp = await collection(firestore, "users")...
const usersCollection = collection(firestore, "users");

const AuthModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  // const handleAuth = async () => {
  //   setLoading(true);
  //   try {
  //     if (isSignIn) {
  //       await auth.signInWithEmailAndPassword(form.email, form.password);
  //     } else {
  //       await auth.createUserWithEmailAndPassword(form.email, form.password);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  // const auth = getAuth(); // Get the Auth instance

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
      setLoading(false);
    }
  };


// const handleAuth = async () => {
//   setLoading(true);
//   try {
//     let userCredential;
//     if (isSignIn) {
//       userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
//     } else {
//       userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      
//       // Add a document to the "users" collection
//       const usersCollection = collection(firestore, "users");
//       await addDoc(usersCollection, {
//         uid: userCredential.user.uid,
//         email: form.email,
//         // other data...
//       });
//     }
//   } catch (err) {
//     setError(err.message);
//     setLoading(false);
//   }
// };


  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? "Sign in" : "Sign up"}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoComplete="off"
          style={{ marginBottom: "24px" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Box mt={2} color="red">
          <Typography>{error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx={2}
        >
          <Typography onClick={() => setIsSignIn((o) => !o)}>
            {isSignIn ? <Button>Don't have an account?</Button> : <Button>Already have an account</Button> }
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={22} />
            ) : isSignIn ? (
              "Sign in"
            ) : (
              "Sign up"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
