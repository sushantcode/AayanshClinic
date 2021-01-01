import React, { Component }  from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { db } from "../components/FirebaseAuth";
import "./Pages.css";

const useStyles = theme => ({
    section1: {
        marginBottom: 20
    },
    blogCard: {
        marginBottom: 20
    }
});

class SingleBlog extends Component {
    state = {
        blog: null
    };

    componentDidMount() {
        const docId  = this.props.location.state.blogDocId;
        db
            .collection("Blogs")
            .doc(docId)
            .get()
            .then((doc) => {
                let tempBlog = {
                    title: doc.data().title,
                    author: doc.data().author,
                    createdAt: doc.data().createdAt,
                    img: doc.data().img,
                    body: doc.data().body
                };
                this.setState({
                    blog: tempBlog
                });
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {
        const { classes } = this.props;

        let blogComponent = null;
        if (this.state.blog) {
            blogComponent = (this.state.blog.img !== "")?
            <Card className={classes.blogCard}>
                <CardActionArea>
                    <CardHeader
                        title={this.state.blog.title}
                        subheader={"By "+this.state.blog.author}
                    />
                    <CardMedia
                        component="img"
                        alt="Blog Image"
                        height="400"
                        image={this.state.blog.img}
                        title="Blog Image"
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary">
                            <b>{" "}{this.state.blog.createdAt.toDate().toDateString()}{","}</b>
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {this.state.blog.body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            :
            <Card className={classes.blogCard}>
                <CardActionArea>
                    <CardHeader
                        title={this.state.blog.title}
                        subheader={"By "+this.state.blog.author}
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary">
                            <b>{" "}{this.state.blog.createdAt.toDate().toDateString()}{","}</b>
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {this.state.blog.body}
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
    }
};

export default withStyles(useStyles)(SingleBlog);
