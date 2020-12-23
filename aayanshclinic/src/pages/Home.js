import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Pages.css";
import { Carousel } from "react-responsive-carousel";
//import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { db } from "../components/FirebaseAuth";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
    root: {
        maxWidth: 350,
    }
});

class Home extends Component {
    state = {
        items: null,
        blogs: null
    };

    componentDidMount() {
        db
            .collection("SlideShowImages")
            .get()
            .then(data => {
                let images = [];
                data.forEach(doc => {
                    images.push({
                        src: doc.data().src
                    });
                });
                this.setState({
                    items: images
                });
            })
            .catch(err => {
                alert(err);
            });

        db
            .collection("Blogs")
            .get()
            .then(data => {
                let blog = [];
                data.forEach(doc => {
                    blog.push({
                        title: doc.data().title,
                        author: doc.data().author,
                        createdAt: doc.data().createdAt,
                        img: doc.data().img,
                        body: doc.data().body.substring(0, 100)
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
        let imageComponent = [];
        if (this.state.items) {
            imageComponent = this.state.items.map(eachItem =>
                <div className="thumbils">
                    <img
                        src={eachItem.src}
                        alt="Error Loading..."
                        className="SlideShowImage"
                    />
                </div>
            );
        }

        let blogComponent = [];
        if (this.state.blogs) {
            blogComponent = this.state.blogs.map((eachItem) => {
                if (eachItem.img !== "") {
                    return <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={eachItem.img}
                                title="Contemplative Reptile"
                            />
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
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                }
                else {
                    return <Card className="cardRoot">
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
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                }
            });
        };

        let slides = imageComponent.concat(blogComponent);

        return (
            <div className="container">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={10}>
                        {slides.length > 0
                            ? <Carousel
                                  autoPlay={true}
                                  interval={2000}
                                  infiniteLoop={true}
                                  dynamicHeight={true}
                                  swipeable={true}
                                  centerSlidePercentage={70}
                              >
                                  {slides}
                              </Carousel>
                            : "No Slides to show..."}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Home);
