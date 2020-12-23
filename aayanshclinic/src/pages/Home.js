import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Pages.css";
import { Carousel } from "react-responsive-carousel";
//import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { db } from "../components/FirebaseAuth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
    section1: {
        marginBottom: 20
    },
    section2: {
        height: 300,
        marginBottom: 30,
        backgroundImage: `url(${"https://thumbs.dreamstime.com/b/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-154742526.jpg"})`
    },
    section4: {
        height: 220,
        marginTop: 30,
        backgroundImage: `url(${"https://thumbs.dreamstime.com/b/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-154742526.jpg"})`
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
                    return <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Slide Image"
                                height="140"
                                image={eachItem.img}
                                title="Slide Image"
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
                    return <Card>
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

        const onSubmitHandler = () => {

        }

        return (
            <div className="container">
                <Grid container spacing={0} justify="center">
                    <Grid item xs={10} className={classes.section1}>
                        {slides.length > 0
                            ? <Carousel
                                  autoPlay={true}
                                  interval={2000}
                                  infiniteLoop={true}
                                  dynamicHeight={true}
                                  swipeable={true}
                                  centerMode={true}
                                  centerSlidePercentage={50}
                                  emulateTouch={true}
                                  showIndicators={false}
                                  showThumbs={false}
                              >
                                  {slides}
                              </Carousel>
                            : "No Slides to show..."}
                    </Grid>
                    <Grid item xs={10} className={classes.section2}>
                        <div className="section2-content">
                            <h1 style={{marginBottom: 10, marginTop: 10, color: "black"}} align="center"><b>KEEPING YOUR HEALTH IN MIND</b></h1><br />
                            <p className="section2p">Please call us to schedule an appointment or ask question with an expert 
                                at our clinic. If you are having an emergency, please call 100 for immediate help.
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={10} className="section3">
                        <h2 style={{marginBottom: 10}}><b>THE PRACTICE</b></h2>
                        <hr />
                        <br />
                        <h3>Our Health Mission</h3><br />
                        <p>Our experienced medical professionals put your healing needs first. We are proud to
                            provide a high-quality level of customer service, medical experience, pharmacy products,
                            commitment to health and wellnessto all our patients. Our goal is to make you feel better
                            as quickly as possible.
                        </p>
                        <br />
                        <h3>Experience and Professionalism</h3><br />
                        <p>Our medical team will assess you and create a custom recovery plan that's right for 
                            you and your loved ones. We understand the importance of educating you on
                            the most effective ways to take care of your body so that you can heal quickly.
                        </p>
                        <br />
                        <h3>Physicians Who Care</h3><br />
                        <p>Not only will our doctors treat your existing conditions, we also work to maximize your
                            prevention strategies. We strieve to help to improve your quality of life, achieve your 
                            wellness goals, and support your best possible life.
                        </p>
                    </Grid>
                    <Grid item xs={12} className={classes.section4} align="center">
                        <div className="subscribe-section">
                            <h1 style={{marginBottom: 10, marginTop: 10, color: "black"}}><b>SUBSCRIBE</b></h1>
                            <h3 style={{marginBottom: 10, marginTop: 5, color: "black"}}>Please subscribe our newsletter to
                            get latest health tips and health related informations.</h3>
                            <form className="subscribe-form" onSubmit={onSubmitHandler}>
                                <input 
                                    type="text"
                                    className="email"
                                    id="email"
                                    placeholder="Enter your email here"
                                />
                                <button className="signup-btn" type="submit">
                                    Sign-Up
                                </button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Home);
