import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ShortenURLModal = ({ handleClose, createShortenLink }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    longUrl: "",
  });
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async () => {
    const errors = {};
    const tName = form.name.trim();
    const tLongUrl = form.longUrl.trim();

    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (tName.length < 3 || tName.length > 15) {
      errors.name = "The name should be min 3 and max 15 char long";
    }
    if (!regex.test(tLongUrl)) {
      errors.longUrl = "URL is not valid";
    }

    if (!!Object.keys(errors).length) return setErrors(errors);
    setLoading(true);
    try {
      createShortenLink(tName, tLongUrl);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Create short URL
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="Name"
          />
        </Box>
        <TextField
          error={!!errors.longUrl}
          helperText={errors.longUrl}
          value={form.longUrl}
          name="longUrl"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long URL"
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={22} />
            ) : (
              "Create short URL"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
