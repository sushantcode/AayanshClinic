import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { firebaseAuth, db } from "../components/FirebaseAuth";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import "./Admin.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 20
    }
}));

const EditAbout = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [team, setTeam] = useState([]);
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");
    const [newTeam, setNewTeam] = useState("");

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

    const onAddClickHandler = event => {
        event.preventDefault();
        if (newTeam !== "") {
            const newTeamDoc = {
                teamName: newTeam
            };
            db.collection("Teams").add(newTeamDoc).then(() => {
                setError("");
                setSuccessMsg(
                    "Team Member Added Successfully!!!"
                );
                setNewTeam("");
                setOpenAlertSuccess(true);
            });
        }
        else {
            setError("Must Have a Team Member Name and Title.");
            setOpenAlertError(true);
        }
    };

    const onTeamListDeleteHandler = teamDocId => {
        db
            .doc(`Teams/${teamDocId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg(
                    "Team member has been removed successfully!!!"
                );
                setOpenAlertSuccess(true);
            })
            .catch(err => {
                setError(err.message);
                setOpenAlertError(true);
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
                            onClick={() => onTeamListDeleteHandler(item.teamDocId)}
                        >
                            <i class="fas fa-trash-alt" />
                        </Button>
                    </ListItem>
                </List>
              )
        : <Typography variant="h4" align="center">
              No Team Member is Found
          </Typography>;

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h1>Tean Members</h1>
                    <br />
                    <hr />
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
                        <br />
                        <TextField
                            id="new-team"
                            label="Enter Name and Title..."
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
                            onClick={onAddClickHandler}
                        >
                            ADD MEMBER
                        </Button>
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
