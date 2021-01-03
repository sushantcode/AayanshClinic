import React, { useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { db } from "../components/FirebaseAuth";
import { useParams } from "react-router-dom";
import "./Pages.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 20
    },
    blogCard: {
        marginBottom: 20
    }
}));

const SingleBlog = () => {
    const classes = useStyles();
    const { blogDocId } = useParams();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [img, setImg] = useState("");
    const [body, setBody] = useState("");

    

    db
        .collection("Blogs")
        .doc(blogDocId)
        .get()
        .then((doc) => {
            setTitle(doc.data().title);
            setAuthor(doc.data().author);
            setCreatedAt(doc.data().createdAt.toDate().toDateString());
            setImg(doc.data().img);
            setBody(doc.data().body);
        })
        .catch(err => {
            alert(err);
        });

    let blogComponent = null;
    if (title !== "") {
        blogComponent = (img !== "")?
        <Card className={classes.blogCard}>
            <CardActionArea>
                <CardHeader
                    title={title}
                    subheader={"By "+author}
                />
                <CardMedia
                    component="img"
                    alt="Blog Image"
                    height="400"
                    image={img}
                    title="Blog Image"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary">
                        <b>{" "}{createdAt}{","}</b>
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        :
        <Card className={classes.blogCard}>
            <CardActionArea>
                <CardHeader
                    title={title}
                    subheader={"By "+author}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary">
                        <b>{" "}{createdAt}{","}</b>
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }
    else {
        <Typography variant="h3" align="center">Blog not Found</Typography>;
    }

    return (
        <div className="container-blogs">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    {blogComponent}
                </Grid>
            </Grid>
        </div>
    );
};

export default SingleBlog;
