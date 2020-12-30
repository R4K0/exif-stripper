import { Component, useCallback, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import ExifParser from "exif-parser";
import DisplayExif from './../components/exifdisplay';

function UploadPage() {
    const [currentImage, setImage] = useState();
    const [exifData, setDataExif] = useState(false);

    const onDrop = useCallback(file => {
        var file = file[0];
        const fileReader = new FileReader();
        const binaryFileReader = new FileReader()

        binaryFileReader.onload = (e) => {
            var parser = ExifParser.create(e.target.result)
            parser.enableSimpleValues(true) // Cast all the values to be human-readable.

            var result = parser.parse()

            setDataExif(result)
        }
        binaryFileReader.readAsArrayBuffer(file)

        fileReader.onload = (e) => {
            setImage(e.target.result);
        }

        fileReader.readAsDataURL(file)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    return (
        <Container>
            <Row>
                <Col>
                    <h4>EXIF Inspector</h4>
                    <div {...getRootProps()} style={{ borderStyle: currentImage ? "none" : "dotted", textAlign: "center" }}>
                        <input {...getInputProps()}></input>
                        <img src={currentImage} style={{ maxWidth: "200px" }}></img>

                        {isDragActive ?
                            <p>Drop the image here!</p> : !currentImage ? <p>Drag and drop your image here (or click here)</p> : undefined
                        }
                    </div>
                </Col>

                <Col>
                    <Alert variant="warning ">
                        <Alert.Heading>
                            Read this first!
                        </Alert.Heading>

                        <p>Each usage of this service will be logged to our external database.</p>
                        <hr />

                        <Alert.Heading>What is being saved?</Alert.Heading>
                        <p>Your EXIF data is not being saved. All that is being saved is your IP address and the date and time at which you've interacted with this service</p>
                        <p>You are <strong>able</strong> to anonymise this data (remove the IP address) or delete it altogether from <a href="/about">this</a> page</p>
                    </Alert>

                    {!currentImage ?
                        <Alert variant="info">
                            <p>To view the photos' EXIF information, please drag and drop your file on the box to the left.</p>
                        </Alert>
                        :
                        <DisplayExif exif={exifData}></DisplayExif>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default UploadPage;