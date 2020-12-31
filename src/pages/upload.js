import { Component, useCallback, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import ExifParser from "exif-parser";
import DisplayExif from './../components/exifdisplay';
import piex from "piexifjs";
import filesaver from "file-saver";
import axios from "axios";

function UploadPage() {
    const [currentImage, setImage] = useState();
    const [exifData, setDataExif] = useState(false);
    const [error, setError] = useState();

    const onDrop = useCallback((file, err) => {
        if (err[0]?.errors?.length > 0) {
            setError(err[0].errors[0].message);
            return;
        }

        const instance = axios.create({baseURL: "http://localhost:4000"})

        instance.post("/statistics/add").catch(err => {})

        var file = file[0];
        const fileReader = new FileReader();
        const arrayBufferReader = new FileReader()
        const binaryReader = new FileReader()

        binaryReader.onload = (e) => {
            console.log(file);
            var result = piex.remove(e.target.result)

            var blob = new Blob([result])

            console.log(blob);
        }
        binaryReader.readAsBinaryString(file)

        arrayBufferReader.onload = (e) => {
            var parser = ExifParser.create(e.target.result)
            parser.enableSimpleValues(true) // Cast all the values to be human-readable.

            var result
            try {
                result = parser.parse()
            } catch (err) {
                setError("File is corruped/File extension is incompatible")
                return;
            }

            setDataExif(result)
        }

        arrayBufferReader.readAsArrayBuffer(file)

        fileReader.onload = (e) => {
            setImage(e.target.result);
        }

        fileReader.readAsDataURL(file)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg' });


    return (
        <Container>
            {
                error ?
                    <Alert variant="danger" dismissible onClose={() => setError(null)} >
                        <Alert.Heading>
                            ❌ Oh no!
                        </Alert.Heading>

                        <p>{error}</p>
                    </Alert> : undefined
            }


            <Row>
                <Col>
                    <h4>EXIF Inspector</h4>
                    <div {...getRootProps()} style={{ borderStyle: currentImage ? "none" : "dotted" }} className={`${isDragActive && 'bg-secondary' || (!currentImage && 'bg-primary' || '')} text-white text-center`}>
                        <input {...getInputProps()}></input>
                        {
                            currentImage ? <img src={currentImage} style={{ maxWidth: "400px", maxHeight: "300px"}}></img> : undefined
                        }

                        {isDragActive ? <p>Drop the image here!</p> : !currentImage ? <p>Drag and drop your image here (or click here)</p> : undefined}
                    </div>
                </Col>

                <Col>
                    <Alert variant="warning ">
                        <Alert.Heading>
                            Read this first!
                        </Alert.Heading>

                        <p>Each usage of this service will be logged to our external database.</p>
                        <p>This is only done to satisfy my colleges' submission requirements and for statistics purpose.</p>
                        <hr />

                        <Alert.Heading>What is being saved?</Alert.Heading>
                        <p><strong>Neither</strong> your EXIF data or the picture is being saved. All that is being saved is your IP address and the date and time at which you've interacted with this service</p>
                        <p>You are <strong>able</strong> to anonymise this data (remove the IP address) or delete it altogether from <a href="/privacy">this</a> page</p>
                    </Alert>

                    {!exifData ?
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