import { useCallback, useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import ExifParser from "exif-parser";
import DisplayExif from './../components/exifdisplay';
import piex from "piexifjs";
import axios from "axios";

// You can actually see me mixing usage of functional components and class components.
// This is because the library I use for drag and dropping elements only showed examples for functional components and I could not figure out how to
// implement it in a class component. In a way, I kind of like functional components more.

function UploadPage() {
    // Set all the State properties up here
    const [currentImage, setImage] = useState();
    const [exifData, setDataExif] = useState(false);
    const [error, setError] = useState();
    const [recordAmount, setRecords] = useState(undefined);

    // This is equivalent of componentDidMount, a hacky one, though. 
    useEffect(() => {
        // As we load into the page for the first time, request distinct amount of users that used the website.
        axios.get('http://localhost:4000/statistics/distinct').then(response => {
            if (response?.data?.count !== undefined) {
                setRecords(response.data.count)
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const onDrop = useCallback((file, err) => {
        // We only care about the first file.
        if (err[0]?.errors?.length > 0) {
            setError(err[0].errors[0].message);
            return;
        }

        const instance = axios.create({ baseURL: "http://localhost:4000" })

        // Not much needed to pass, the back-end will take care of extracting the request IP by itself.
        instance.post("/statistics/add").catch(err => { })

        var file = file[0];

        // Not sure how to re-use one filereader for many different read types (BinaryString, ArrayBuffer) etc. because they are all call-back based
        // and I can't define a callback per type of load.
        const fileReader = new FileReader();
        const arrayBufferReader = new FileReader()
        const binaryReader = new FileReader()

        // with this one I am trying to remove the exif data.
        binaryReader.onload = (e) => {
            console.log(file);
            var result = piex.remove(e.target.result)

            var blob = new Blob([result])

            console.log(blob);
        }
        binaryReader.readAsBinaryString(file)

        // with this one I am trying to extract the exif data for display
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

        // With this one I am simply setting the image as the displayed image.
        arrayBufferReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
            setImage(e.target.result);
        }

        fileReader.readAsDataURL(file)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg' });


    return (
        <Container>
            {/* Error is not visible if error is undefined */}
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
                    {/* This card is responsible for drag and dropping of the file and reading the file */}
                    <h4>EXIF Inspector</h4>
                    <Card {...getRootProps()} className={`${isDragActive && 'bg-secondary' || 'bg-primary'} text-white d-flex align-items-center justify-content-center h-25`} >
                        <input {...getInputProps()}></input>
                        {isDragActive ? <span>Drop the image here!</span> : <span>Drag and drop your image here (or click here)</span> }
                    </Card>

                    <div className="d-flex justify-content-center mt-3" style={{borderStyle: currentImage ? "groove" : "none"}}>
                        {
                            currentImage ? <img src={currentImage} style={{ maxWidth: "400px", maxHeight: "300px" }}></img> : undefined
                        }
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

                        {recordAmount !== undefined ? <div>
                            <hr />
                            By the way, <strong>{recordAmount}</strong> unique people have trusted this website to check their images!
                        </div> : undefined}
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