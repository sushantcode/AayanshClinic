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
    section2: {
        marginTop: 20
    }
}));

const EditAbout = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [team, setTeam] = useState([]);
    const [certImg, setCertImg] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");
    const [newTeam, setNewTeam] = useState("");
    const [loadingAddImage, setloadingAddImage] = useState(false);
    const [loadingAddTeamList, setlloadingAddTeamList] = useState(false);
    const [loadingDelImage, setloadingDelImage] = useState(false);
    const [loadingDelTeamList, setloadingDelTeamList] = useState(false);

    db
        .collection("Teams")
        .get()
        .then(data => {
            let teams = [];
            data.forEach(doc => {
                teams.push({
                    teamDocId: doc.id,
                    teamName: doc.data().teamName
                });
            });
            setTeam(teams);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    db
        .collection("Certificates")
        .get()
        .then(data => {
            let images = [];
            data.forEach(doc => {
                images.push({
                    docId: doc.id,
                    src: doc.data().src
                });
            });
            setCertImg(images);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    const onAddClickHandler = event => {
        setlloadingAddTeamList(true);
        event.preventDefault();
        if (newTeam !== "") {
            const newTeamDoc = {
                teamName: newTeam
            };
            db.collection("Teams").add(newTeamDoc).then(() => {
                setError("");
                setSuccessMsg("Team Member Added Successfully!!!");
                setNewTeam("");
                setOpenAlertSuccess(true);
                setlloadingAddTeamList(false);
            })
            .catch(err => {
                setError(err.message);
                setOpenAlertError(true);
                setlloadingAddTeamList(false);
            });
        } else {
            setError("Must Have a Team Member Name and Title.");
            setOpenAlertError(true);
            setlloadingAddTeamList(false);
        }
    };

    const onTeamListDeleteHandler = teamDocId => {
        setloadingDelTeamList(true);
        db
            .doc(`Teams/${teamDocId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg("Team member has been removed successfully!!!");
                setOpenAlertSuccess(true);
                setloadingDelTeamList(false);
            })
            .catch(err => {
                setError(err.message);
                setOpenAlertError(true);
                setloadingDelTeamList(false);
            });
    };

    const fileHandler = data => {
        if (data.target.files[0]) {
            setImgFile(data.target.files[0]);
        }
    };

    const onAddImageHandler = () => {
        setloadingAddImage(true);
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
                                .collection("Certificates")
                                .add(newImage)
                                .then(() => {
                                    setError("");
                                    setSuccessMsg(
                                        "New Certificate is Added Successfully!!!"
                                    );
                                    setOpenAlertSuccess(true);
                                    setloadingAddImage(false);
                                    setImgFile(null);
                                })
                                .catch(err => {
                                    setError(err.message);
                                    setOpenAlertError(true);
                                    setloadingAddImage(false);
                                });
                        })
                        .catch(err => {
                            setError(err.message);
                            setOpenAlertError(true);
                            setloadingAddImage(false);
                        });
                }
            );
        } catch (err) {
            setError(err.message);
            setOpenAlertError(true);
            setloadingAddImage(false);
        }
    };

    const onImgDeleteHandler = (docId, imgSrc) => {
        setloadingDelImage(true);
        db.doc(`Certificates/${docId}`).delete().then(() => {
            storage
                .refFromURL(imgSrc)
                .delete()
                .then(() => {
                    setError("");
                    setSuccessMsg("Image Removed Successfully!!!");
                    setOpenAlertSuccess(true);
                    setloadingDelImage(false);
                })
                .catch(err => {
                    setError(err.message);
                    setOpenAlertError(true);
                    setloadingDelImage(false);
                });
        });
    };

    const handleCloseAlertError = () => {
        setOpenAlertError(false);
    };

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false);
    };

    let teamItem = team
        ? team
              .filter(
                  item =>
                      (keyword === "" && true) ||
                      item.teamName.substring(0, keyword.length) === keyword
              )
              .map(item =>
                  <List>
                      <ListItem>
                          {item.teamName + " "}
                          <Button
                              size="small"
                              color="secondary"
                              disabled={loadingDelTeamList}
                              onClick={() =>
                                  onTeamListDeleteHandler(item.teamDocId)}
                          >
                              {loadingDelTeamList && <i class="fas fa-cog fa-spin" style={{color: "red"}}></i>}
                              <i class="fas fa-trash-alt" />
                          </Button>
                      </ListItem>
                  </List>
              )
        : <Typography variant="h4" align="center">
              No Team Member is Found
          </Typography>;

    let imageCard = certImg
        ? certImg.map(img =>
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
                              disabled={loadingDelImage}
                              startIcon={<DeleteIcon />}
                              onClick={() =>
                                  onImgDeleteHandler(img.docId, img.src)}
                          >
                              {loadingDelImage && <i class="fas fa-cog fa-spin" style={{color: "red"}}></i>}
                              DELETE
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

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h1>TEAM MEMBERS</h1>
                    <br />
                    <hr />
                    <Grid container>
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
                            {teamItem}
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            className={classes.section1}
                            justify="center"
                        >
                            <Typography variant="h5">
                                <b>Add New Member:</b>
                            </Typography>
                            <br />
                            <TextField
                                id="new-team"
                                label="Name and Title"
                                variant="outlined"
                                value={newTeam}
                                fullWidth
                                onChange={e => {
                                    setNewTeam(e.target.value);
                                }}
                            />
                            <br />
                            <br />
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                disabled={loadingAddTeamList}
                                onClick={onAddClickHandler}
                            >
                                {loadingAddTeamList && <i class="fas fa-sync fa-spin" style={{color: "blue"}}></i>}
                                <b>ADD MEMBER</b>
                            </Button>
                        </Grid>
                    </Grid>
                <Grid item xs={10} className={classes.section2}>
                    <h1>CERTIFICATIONS AND AUTHORIZATIONS</h1>
                    <br />
                    <Grid container spacing={2} justify="center">
                        {imageCard}
                    </Grid>
                    <div style={{ padding: 20 }}>
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
                            disabled={loadingAddImage}
                            onClick={onAddImageHandler}
                        >
                            {loadingAddImage && <i class="fas fa-sync fa-spin" style={{color: "blue"}}></i>}
                            <b>ADD IMAGE</b>
                        </Button>
                    </div>
                </Grid>
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
            </Grid>
        </div>
    );
};

export default EditAbout;
