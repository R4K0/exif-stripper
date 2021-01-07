import { useState } from "react";
import { Component } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

// About page
class About extends Component {

    // Whenever the alert should be displayed (About alert)
    state = {
        showComponent: true
    }

    render() {
        return (
            <Container>
                {this.state.showComponent &&
                    <Alert variant="success" show={this.state.showComponent} dismissible="true" onClose={() => this.setState({ showComponent: false })}>
                        <Alert.Heading>Hey! Thanks for checking out the About section!</Alert.Heading>
                        <p>
                            This website was made as a part of my Software Development project. Literal blood and sweat were invested in making of it!
                        </p>
                        <hr />
                        <p>
                            If you have any feedback, don't forget to pass it over along to inbox@miloszmilewski.dev
                        </p>
                    </Alert>
                }

                <Row>
                    <Col>
                        <h3>What is this website about?</h3>
                        <p>
                            Exif-Toolset provides a way to remove and read EXIF data from the pictures you submit.
                        </p>
                    </Col>

                    <Col>
                        <h3>What is EXIF?</h3>
                        <p>
                            According to google, Exchangeable image file format (officially Exif, according to JEIDA/JEITA/CIPA specifications) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras (including smartphones), scanners and other systems handling image and sound files recorded by digital cameras.
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>Aren't there loads of those services? Why should I use this one?</h3>
                        <p>
                            Most of the other services require you to actually upload the file to their server, which does who-knows-what. They might be storing your picture and not even tell you.
                            This service achieves the same, but client-side - Meaning no picture is ever sent to the internet!
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>Why is it important to remove EXIF data?</h3>
                        <h5>Short Answer</h5>
                        <p>
                            For your <strong>privacy</strong>.
                        </p>

                        <h5>Long answer</h5>
                        <p>
                            EXIF data contains possibly sensitive data which is saved at the moment of taking of the picture/video.<br />
                            Data such as the lens information (shutter speed, focal length, aperature), GPS location of the photo taken, camera manifacturer and so on.
                        </p>

                        <p>
                            When you upload such a photo to the internet, anybody can download it and read that data using widely available software. You could potentially tell people where you live, by simply taking a picture of your pet wearing that cute jumper and sharing it on internet!
                        </p>

                        <h5>Does it mean I have to remove all of my Facebook and Instagram photos?!</h5>
                        <p>No! Good news is, that all of the major social media websites already strips that data for you!<br /><br />

                        There's still a possibility that Facebook or other big corporations collect and resell EXIF data before removing it, so this tool gives you a chance to check if your photo contains any EXIF data.
                        </p>

                        <h5>What stops you from collecting such data?</h5>
                        <p>Good point. <strong>Absolutely nothing</strong>. It is really up to you whom to trust, but I know I'd rather put my trust in a student who put his name and face behind this website, rather than trusting multi billionaire companies known for reselling your data to the advertising companies.</p>
                    
                        <h5>But wait!</h5>
                        <p>
                            There is one way to verify good-intentions of this website. Use either wire-shark or good old browser console to see what type of requests are being sent out to
                            the external server. You'll see that when you submit the image, the image itself <strong>isn't</strong> being sent.<br/><br/>

                            There is only one "phoning home" call on image submission. It's letting me know when our service is being used. No data is being sent out, but I do collect the user IPs.<br/><br/>
                            This is not a big deal, as there is a <a href="/privacy">privacy page</a>, that allows you to either remove the data from our servers or make it anonymous by removing the IP information but leaving only the date you've used the service at.
                        </p>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default About;