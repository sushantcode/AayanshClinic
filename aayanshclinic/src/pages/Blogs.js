import React, { Component }  from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { db } from "../components/FirebaseAuth";
import "./Pages.css";
import Link from "react-router-dom/Link";

const useStyles = theme => ({
    section1: {
        marginBottom: 20
    },
    blogCard: {
        marginBottom: 20
    }
});

class Blogs extends Component {
    state = {
        blogs: null
    };

    componentDidMount() {
    db
        .collection("Blogs")
        .orderBy("createdAt")
        .get()
        .then(data => {
            let blog = [];
            data.forEach(doc => {
                blog.push({
                    blogId: doc.id,
                    title: doc.data().title,
                    author: doc.data().author,
                    createdAt: doc.data().createdAt,
                    img: doc.data().img,
                    body: doc.data().body.substring(0, 400) + "..."
                });
            });
            this.setState({
                blogs: blog
            });
        })
        .catch(err => {
            alert(err);
        });
    }

    render() {
        const { classes } = this.props;

        let blogComponent = [];
        if (this.state.blogs) {
            blogComponent = this.state.blogs.map(eachItem => {
                if (eachItem.img !== "") {
                    return (<Card className={classes.blogCard}>
                        <CardActionArea>
                            <CardHeader
                                title={eachItem.title}
                                subheader={"By "+eachItem.author}
                            />
                            <CardMedia
                                component="img"
                                alt="Slide Image"
                                height="300"
                                image={eachItem.img}
                                title="Blog Image"
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary">
                                    <b>{" "}{eachItem.createdAt.toDate().toDateString()}{","}</b>
                                </Typography>
                                <br />
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
                            <Button size="small" color="primary" component={Link}
                                    to={{
                                        pathname: "/singleBlog",
                                        state: {
                                            blogDocId: eachItem.blogId
                                        }
                                    }}>
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>)
                 }
                 else {
                    return (<Card className={classes.blogCard}>
                        <CardActionArea>
                            <CardHeader
                                title={eachItem.title}
                                subheader={"By "+eachItem.author}
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary">
                                    <b>{" "}{eachItem.createdAt.toDate().toDateString()}{","}</b>
                                </Typography>
                                <br />
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
                            <Button size="small" color="primary" component={Link}
                                    to={{
                                        pathname: "/singleBlog",
                                        state: {
                                            blogDocId: eachItem.blogId
                                        }
                                    }}>
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>)
                }
            });
        }

        return (
            <div className="container-blogs">
                <Grid container spacing={0} justify="center">
                    <Grid item xs={8} className={classes.section1}>
                        {blogComponent}
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default withStyles(useStyles)(Blogs);
