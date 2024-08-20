import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';

const Pizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const NOTIFICATION_TIMEOUT = 3000;

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la pizza');
                }
                const data = await response.json();
                setPizza(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPizza();

        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, NOTIFICATION_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [id, showNotification]);

    const handleAddPizza = () => {
        setShowNotification(true);
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border">
                    <output aria-live="polite" className="visually-hidden">Cargando...</output>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={10} className="mb-5">
                    <Card className="pizza-card">
                        <Row noGutters className="align-items-center">
                            <Col md={5}>
                                <Card.Img src={pizza.img} alt={pizza.name} className="img-left"/>
                            </Col>
                            <Col md={7}>
                                <Card.Body>
                                    <Card.Title className='pizza-title'>{pizza.name}</Card.Title>
                                    <Card.Text>{pizza.desc}</Card.Text>
                                    <Card.Text>
                                        <strong>Ingredientes:</strong>
                                        <ul>
                                            {pizza.ingredients.map((ingredient) => (
                                                <li key={ingredient}>🍕 {ingredient}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Precio:</strong> {pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </Card.Text>
                                    <Button className='btnAddPizza' onClick={handleAddPizza}> Añadir al 🛒</Button>

                                    {showNotification && (
                                        <Alert variant="success" className="mt-3">
                                            ¡Pizza añadida al carrito!
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Pizza;

