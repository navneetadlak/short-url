import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp, firestore} from "../../firebase";
import { CircularProgress, Box, Typography } from "@mui/material";
import { collection, doc, getDoc } from 'firebase/firestore';


const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      if (shortCode.length !== 6) return setLoading(false);
      // const linkDoc = await firestore.collection("links").doc(shortCode).get();
      const linkDoc = doc(collection(firestore, 'links'), shortCode);

      if (linkDoc.exists) {
        const { longURL, linkID, userUid } = linkDoc.data();
        await firestore
          .collection("users")
          .doc(userUid)
          .collection("links")
          .doc(linkID)
          .update({
            totalClicks: firebaseApp.firestore.FieldValue.increment(1),
          });
        window.location.href = longURL;
      } else {
        setLoading(false);
      }
    }
    fetchLinkDoc();
  }, [shortCode]);

  if (loading)
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  else
    return (
      <Box mt={10} textAlign="center">
        <Typography>Link is invalid</Typography>
      </Box>
    );
};

export default LinkRedirect;
