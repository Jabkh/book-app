import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button, Card } from 'react-bootstrap';

function BookDetails() {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [authorDetails, setAuthorDetails] = useState(null);
    const [show, setShow] = useState(true);

    async function getAuthor(authorKey) {
        try {
            const response = await axios.get(`https://openlibrary.org${authorKey}.json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching author details:', error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
                setBookDetails(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            if (bookDetails && bookDetails.authors) {
                try {
                    const authorKey = bookDetails.authors[0].author.key;
                    const authorData = await getAuthor(authorKey);
                    setAuthorDetails(authorData);
                } catch (error) {
                    console.error('Error fetching author details:', error);
                }
            }
        };

        fetchAuthorDetails();
    }, [bookDetails]);

    const handleClose = () => setShow(false);

    if (!bookDetails || !authorDetails) {
        return <div>Chargement...</div>;
    }

    const coverUrl = bookDetails.covers ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}.jpg` : 'Couverture du Livre';

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Détails du livre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{ width: '18rem', margin: "auto" }}>
                    <Card.Img variant="top" src={coverUrl} alt="Couverture du livre" />
                    <Card.Body>
                        <Card.Title>{bookDetails.title}</Card.Title>
                        <Card.Text>
                            Auteur(s): {authorDetails.name}
                            <br />
                            Date de publication: {bookDetails.first_publish_date}
                            <br />
                            <details>
                                <summary>Description</summary>
                                <p>
                                    {bookDetails.description}
                                </p>
                            </details>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookDetails;
