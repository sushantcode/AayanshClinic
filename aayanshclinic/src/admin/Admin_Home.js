import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { firebaseAuth, db, storage } from "../components/FirebaseAuth";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import "./Admin.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 20
    },
    blogCard: {
        marginBottom: 20
    }
}));

const AdminHome = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [imgs, setImgs] = useState([]);
    const [subscibers, setSubscribers] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");

    db
        .collection("SlideShowImages")
        .get()
        .then(data => {
            let images = [];
            data.forEach(doc => {
                images.push({
                    imgId: doc.id,
                    src: doc.data().src
                });
            });
            setImgs(images);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    db
        .collection("Subscribers")
        .get()
        .then(data => {
            let sub = [];
            data.forEach(doc => {
                sub.push({
                    subId: doc.id,
                    email: doc.data().email
                });
            });
            setSubscribers(sub);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    const onImgDeleteHandler = (imgId, imgSrc) => {
        db.doc(`SlideShowImages/${imgId}`).delete().then(() => {
            storage
                .refFromURL(imgSrc)
                .delete()
                .then(() => {
                    setError("");
                    setSuccessMsg("Image Removed Successfully!!!");
                    setOpenAlertSuccess(true);
                })
                .catch(err => {
                    setError(err.message);
                    setOpenAlertError(true);
                });
        });
    };

    const onSubListDeleteHandler = listId => {
        db
            .doc(`Subscribers/${listId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg("Email Is Removed Successfully!!!");
                setOpenAlertSuccess(true);
            })
            .catch(err => {
                setError(err.message);
                setOpenAlertError(true);
            });
    };

    const fileHandler = data => {
        if (data.target.files[0]) {
            setImgFile(data.target.files[0]);
        }
    };

    const onAddImageHandler = () => {
        try {
            // uploading image to the firebase storage
            const uploadToFirebase = storage
                .ref(`images/${imgFile.name}`)
                .put(imgFile);
            uploadToFirebase.on(
                "state_changed",
                snapshot => {},
                error => {
                    setError(error.message);
                    setOpenAlertError(true);
                },
                () => {
                    // geting url of the image
                    storage
                        .ref("images")
                        .child(imgFile.name)
                        .getDownloadURL()
                        .then(Url => {
                            let newImage = {
                                src: Url
                            };
                            // Pushing the user information once user is signed up successfully to database
                            db
                                .collection("SlideShowImages")
                                .add(newImage)
                                .then(() => {
                                    setError("");
                                    setSuccessMsg(
                                        "Image Added Successfully!!!"
                                    );
                                    setOpenAlertSuccess(true);
                                    setImgFile(null);
                                })
                                .catch(err => {
                                    setError(err.message);
                                    setOpenAlertError(true);
                                });
                        })
                        .catch(err => {
                            setError(err.message);
                            setOpenAlertError(true);
                        });
                }
            );
        } catch (err) {
            setError(err.message);
            setOpenAlertError(true);
        }
    };

    const handleCloseAlertError = () => {
        setOpenAlertError(false);
    };

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false);
    };

    let imageCard = imgs
        ? imgs.map(img =>
              <Grid item xs={10} sm={5}>
                  <Card className={classes.blogCard}>
                      <CardActionArea>
                          <CardMedia
                              component="img"
                              alt="Slide Image"
                              height="400"
                              image={img.src}
                              title="Slide Image"
                          />
                      </CardActionArea>
                      <CardActions>
                          <Button
                              size="small"
                              color="secondary"
                              onClick={() =>
                                  onImgDeleteHandler(img.imgId, img.src)}
                          >
                              <DeleteIcon /> DELETE
                          </Button>
                      </CardActions>
                  </Card>
              </Grid>
          )
        :   <Grid item xs={10} sm={5}>
                <Typography variant="h3" align="center">
                    No Image Found
                </Typography>
            </Grid>;

    let subsciberItem = subscibers
        ? subscibers
              .filter(
                  item => (keyword === "" && true) || item.email.substring(0, keyword.length) === keyword
              )
              .map(item =>
                  <List>
                      <ListItem>
                          {item.email + " "}
                          <Button
                              size="small"
                              color="secondary"
                              onClick={() => onSubListDeleteHandler(item.subId)}
                          >
                              <i class="fas fa-trash-alt" />
                          </Button>
                      </ListItem>
                  </List>
              )
        :   <Typography variant="h4" align="center">
                No Subscribers Found
            </Typography>;

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>Slide Show Images</b>
                    </h2>
                    <Grid container spacing={2} justify="center">
                        {imageCard}
                    </Grid>
                    <Button>
                        <input
                            type="file"
                            onChange={fileHandler}
                            accept="image/png, image/jpeg, image/jpg"
                            style={{ fontSize: "1rem" }}
                        />
                    </Button>
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={onAddImageHandler}
                    >
                        <b>ADD IMAGES</b>
                    </Button>
                    <Snackbar
                        open={openAlertSuccess}
                        autoHideDuration={6000}
                        onClose={handleCloseAlertSuccess}
                    >
                        <Alert
                            onClose={handleCloseAlertSuccess}
                            severity="success"
                        >
                            <h4 style={{ color: "red", marginTop: 10 }}>
                                {" "}{successMsg}
                            </h4>
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openAlertError}
                        autoHideDuration={6000}
                        onClose={handleCloseAlertError}
                    >
                        <Alert onClose={handleCloseAlertError} severity="error">
                            <h4 style={{ color: "red", marginTop: 10 }}>
                                {" "}{error}
                            </h4>
                        </Alert>
                    </Snackbar>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <hr />
                    <br />
                    <h1>Subscibers' List</h1>
                    <Grid
                        item
                        xs={10}
                        className={classes.section1}
                        justify="center"
                    >
                        <br />
                        <TextField
                            id="keyword"
                            label="start typing to search..."
                            variant="outlined"
                            onChange={e => {
                                setKeyword(e.target.value);
                            }}
                        />
                        {subsciberItem}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminHome;
