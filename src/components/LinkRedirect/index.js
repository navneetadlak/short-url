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

      try {
        const linkDoc = await getDoc(doc(firestore, 'links', shortCode));
        console.log("Link Document:", linkDoc.exists() ? linkDoc.data() : "Does not exist");

        if (linkDoc.exists()) {
          const linkData = linkDoc.data();

          if (linkData && linkData.longURL) {
            const { longURL, linkID, userUid } = linkData;

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
            console.error("Long URL is missing in link data");
            setLoading(false);
          }
        } else {
          console.error("Link document does not exist");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching link document:", error);
        setLoading(false);
      }
    };

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
