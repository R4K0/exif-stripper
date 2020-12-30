import { useState } from "react";
import { Component } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

class About extends Component {

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
                            If you have any feedback, don't forget to pass it over along to milosz@rako.dev
                        </p>
                    </Alert>
                }

                <Row>
                    <Col>
                        <h3>What is this website?</h3>
                        <p>
                            Exif-Toolset provides a variety of tools to manipulate, read and remove EXIF data from the pictures
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
                        <p>No! Good news is, that all of the major social media already strips that data for you!<br /><br />

                        This tool lets you view such data and if necessary, remove it - There's still a possibility that Facebook or other big corporations collect and resell EXIF data before removing it.
                        </p>

                        <h5>What stops you from collecting such data?</h5>
                        <p>Good point. <strong>Absolutely nothing</strong>. It is really up to you whom to trust, but I know I'd rather put my trust in a student who put his name and face behind this website, rather than trusting multi billionaire companies known for reselling your data to the advertising companies.</p>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default About;