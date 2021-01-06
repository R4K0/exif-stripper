import { useEffect, useState } from 'react';
const axios = require("axios").default;
const { Container, Col, Button, Modal, Alert } = require("react-bootstrap");

// Used as an ENUM for request types
var RequestType = {
    DELETE: 1,
    ANON: 2
}

// Privacy page
function PrivacyPage() {
    const [modalShown, setShow] = useState(false);
    const [showAlert, setAlertShow] = useState(false);
    const [alertType, setAlertType] = useState();
    const [recordAmount, setRecords] = useState(undefined);

    // Upon the page load, we fetch statistics count related to us.
    function fetchCount(){
        axios.get('http://localhost:4000/statistics/count').then(response => {
            if (response?.data?.count !== undefined) {
                setRecords(response.data.count)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchCount()
    }, [])

    function showModal() {
        setShow(true);
    }

    function closeModal() {
        setShow(false);
    }

    // this handles sending out the request to the server for anonymizing or deleting our data
    async function processRequest(requestType) {
        closeModal()

        const instance = axios.create({ baseURL: "http://localhost:4000" })

        switch (requestType) {
            case (RequestType.DELETE):
                try {
                    await instance.delete("statistics/delete")
                } catch (err) {
                    setAlertType("danger")
                    setAlertShow(err.response?.data || "An error occured :(")
                    return;
                    // if error occured, the code below won't execute.
                }

                // set alerts depending on outcome.
                setAlertType("success")
                setAlertShow("Successfully deleted all the data related to this IP address!")
                setRecords(0)
                break;
            case (RequestType.ANON):
                try {
                    await instance.post("statistics/anonymize")
                } catch (err) {
                    setAlertType("danger")
                    setAlertShow(err.response?.data || "An error occured :(")
                    return;
                }

                setAlertType("success")
                setAlertShow("Successfully anonymised your data!")
                setRecords(0)
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <Alert show={showAlert != false} variant={alertType} dismissible onClick={() => setAlertShow(false)}>
                <Alert.Heading>{alertType == "success" ? "Success!" : "Failure!"}</Alert.Heading>

                <p>{showAlert}</p>
            </Alert>

            <Col>
                <h4>Privacy Options</h4>
                <p>Here you're able to either delete all of your data or make it anonymous by requesting to delete the identifying IP from any of records related to you.</p>
                <p>This is an <strong>instant</strong> action and it cannot be reversed. The data is used for statistical purposes only.</p>
                {
                    // Display the record amount about the user only if we managed to fetch it
                    recordAmount !== undefined ? <div><hr /><p>There are {recordAmount} records related to your IP in our database.</p></div> : undefined
                }


                <Modal show={modalShown} onHide={() => setShow(false)}>
                    <Modal.Header closeButton >
                        Are you sure?
                        </Modal.Header>

                    <Modal.Body>
                        This action cannot be reversed! Thread lightly, samurai!
                        </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => processRequest(RequestType.DELETE)}>
                            I am sure!
                            </Button>
                    </Modal.Footer>
                </Modal>

                <div>
                    <Button variant="danger" onClick={() => showModal()} >Delete Data</Button>
                    <Button variant="warning" className="ml-1" onClick={() => processRequest(RequestType.ANON)}>Anonymise Data</Button>
                </div>
            </Col>
        </Container>
    )
}

export default PrivacyPage;