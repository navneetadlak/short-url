import { useState, Fragment, useEffect, useCallback, useMemo } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import { firebaseApp, firestore, auth } from "../../firebase";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

// const dummyData = [
//   {
//     id: "31r08ms0fam",
//     createdAt: new Date(),
//     name: "My website",
//     longURL: "https://google.com",
//     shortCode: "masdo",
//     totalClicks: 313,
//   },
//   {
//     id: "31r08asdasfam",
//     createdAt: new Date(),
//     name: "E-book",
//     longURL: "https://drive.google.com/asdokasnd89",
//     shortCode: "182as",
//     totalClicks: 32,
//   },
//   {
//     id: "asdasdas",
//     createdAt: new Date(),
//     name: "E-book",
//     longURL: "https://drive.google.com/asdokasnd89",
//     shortCode: "182as",
//     totalClicks: 32,
//     cool: ["1,2,3"],
//   },
// ];

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [newLinkToastr, setNewLinkToastr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([]);
  const userUid = auth.currentUser.uid;
  const linksPathRef = useMemo(
    () => firestore.collection("users").doc(userUid).collection("links"),
    [userUid]
  );

  const handleCreateShortenLink = async (name, longURL) => {
    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const resp = await linksPathRef.add(link);

    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: resp.id },
    ]);
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const snapshot = await linksPathRef.get();

      const tempLinks = [];
      snapshot.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setLinks(tempLinks);
      setFetchingLinks(false);
    };

    fetchLinks();
  }, [linksPathRef]);

  const handleDeleteLink = useCallback(
    async (linkDocID) => {
      if (window.confirm("Do you want to delete the link?")) {
        await linksPathRef.doc(linkDocID).delete();
        setLinks((oldLinks) =>
          oldLinks.filter((link) => link.id !== linkDocID)
        );
      }
    },
    [linksPathRef]
  );

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToastr(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkToastr}
        onClose={() => setNewLinkToastr(false)}
        autoHideDuration={2000}
        message="Link copied to the clipboard"
      />
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Box mt={{ xs: 3, sm: 5 }} p={{ xs: 2, sm: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create new
              </Button>
            </Box>

            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img
                  style={{
                    width: "225px",
                    height: "auto",
                    marginBottom: "24px",
                  }}
                  src="/assets/no_links.svg"
                  alt="no links"
                />
                <Typography>You have no links</Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt - prevLink.createdAt
                )
                .map((link, idx) => (
                  <Fragment key={link.id}>
                    <LinkCard
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />
                    {idx !== links.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
