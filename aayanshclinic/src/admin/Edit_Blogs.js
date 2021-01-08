import React, { useState, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { firebaseAuth, db, storage } from "../components/FirebaseAuth";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import "./Admin.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 10
    },
    section2: {
        marginBottom: 20
    },
    messageForm: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "60vw"
        },
        "& .uploadButton": {
            margin: theme.spacing(1),
            width: "20vw"
        },
        "& .addBlogBtn": {
            margin: theme.spacing(1),
            width: "50vw"
        }
    },
    buttonGroup: {
        '& > *': {
          margin: theme.spacing(1),
        },
      }
}));

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">
                {children}
            </Typography>
            {onClose
                ? <IconButton
                      aria-label="close"
                      className={classes.closeButton}
                      onClick={onClose}
                  >
                      <CloseIcon />
                  </IconButton>
                : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

const EditBlogs = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [blogs, setBlogs] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    db
        .collection("Blogs")
        .get()
        .then(data => {
            let blog = [];
            data.forEach(doc => {
                blog.push({
                    docId: doc.id,
                    title: doc.data().title,
                    author: doc.data().author,
                    createdAt: doc.data().createdAt,
                    img: doc.data().img,
                    body: doc.data().body.substring(0, 310) + "..."
                });
            });
            setBlogs(blog);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    const onBlogDeleteHandler = docId => {
        db
            .doc(`Blogs/${docId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg("Message has been removed successfully!!!");
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
                .ref(`postImages/${imgFile.name}`)
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
                        .ref("postImages")
                        .child(imgFile.name)
                        .getDownloadURL()
                        .then(Url => {
                            setImgSrc(Url);
                            setOpenDialog(false);
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

    const onSubmitHandler = useCallback(async event => {
        event.preventDefault();
        const { title, author, body } = event.target.elements;
        if (title.value === "") {
            setError("*Must provide a title of the blog.");
            setOpenAlertError(true);
        } else if (author.value === "") {
            author.value = "Anonymous";
        } else if (body.value === "") {
            setError("*Must provide a title of the blog.");
            setOpenAlertError(true);
        } else {
            try {
                const newBlog = {
                    title: title.value,
                    author: author.value,
                    imgSrc: imgSrc,
                    body: body.value
                };
                // Pushing the user information once user is signed up successfully to database
                db
                    .collection("Blogs")
                    .add(newBlog)
                    .then(() => {
                        setError("");
                        setSuccessMsg("New Blog has been added successfully");
                        setOpenAlertSuccess(true);
                    })
                    .catch(err => {
                        setError(err.message);
                        setOpenAlertError(true);
                    });
            } catch (err) {
                setError(err.message);
                setOpenAlertError(true);
            }
        }
    }, [imgSrc]);

    const handleCloseAlertError = () => {
        setOpenAlertError(false);
    };

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
      };
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    let blogComponent = [];
    if (blogs) {
        blogComponent = blogs
            .filter(
                item =>
                    (keyword === "" && true) ||
                    item.title.substring(0, keyword.length) === keyword
            )
            .map(eachItem => {
                if (eachItem.img !== "") {
                    return (
                        <Card style={{ height: "55vh" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Slide Image"
                                    height="110vh"
                                    image={eachItem.img}
                                    title="Slide Image"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h3"
                                    >
                                        {eachItem.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {eachItem.body}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        onBlogDeleteHandler(eachItem.docId)}
                                >
                                    <DeleteIcon /> DELETE
                                </Button>
                            </CardActions>
                        </Card>
                    );
                } else {
                    return (
                        <Card style={{ height: "55vh" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        {eachItem.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {eachItem.body}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        onBlogDeleteHandler(eachItem.docId)}
                                >
                                    <DeleteIcon /> DELETE
                                </Button>
                            </CardActions>
                        </Card>
                    );
                }
            });
    } else {
        blogComponent = (
            <Typography variant="h4" align="center">
                No Blog Found
            </Typography>
        );
    }

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h1>CURRENT BLOGS</h1>
                    <br />
                    <hr />
                </Grid>
                <Grid
                    item
                    xs={10}
                    className={classes.section2}
                    justify="center"
                >
                    <br />
                    <div style={{ paddingBottom: 20 }}>
                        <TextField
                            id="keyword"
                            label="Searching by title..."
                            variant="outlined"
                            onChange={e => {
                                setKeyword(e.target.value);
                            }}
                        />
                    </div>
                    {blogComponent}
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <h1>ADD NEW BLOG</h1>
                    <br />
                    <hr />
                    <div style={{textAlign: "center"}}>
                        <form
                            className={classes.messageForm}
                            noValidate
                            autoComplete="off"
                            onSubmit={onSubmitHandler}
                        >
                            <TextField
                                id="title"
                                label="Title*"
                                variant="outlined"
                            />
                            <TextField
                                id="author"
                                label="Author*"
                                variant="outlined"
                            />
                            <TextField
                                id="body"
                                label="Body*"
                                multiline
                                rows={5}
                                variant="outlined"
                            />
                            <br />
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                onClick={handleClickOpenDialog}
                                className="uploadButton"
                            >
                                <b>UPLOAD IMAGE</b>
                            </Button>
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className="addBlogBtn"
                                type="submit"
                            >
                                <b>UPLOAD BLOG</b>
                            </Button>
                        </form>
                    </div>
                </Grid>
                <Snackbar
                    open={openAlertSuccess}
                    autoHideDuration={6000}
                    onClose={handleCloseAlertSuccess}
                >
                    <Alert onClose={handleCloseAlertSuccess} severity="success">
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
            <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    Uploading Blog Image
                </DialogTitle>
                <DialogContent dividers>
                    <Button>
                        <input
                            type="file"
                            onChange={fileHandler}
                            accept="image/png, image/jpeg, image/jpg"
                            style={{ fontSize: "1rem" }}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={onAddImageHandler} color="default" variant="contained">
                    <b>Upload</b>
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditBlogs;
