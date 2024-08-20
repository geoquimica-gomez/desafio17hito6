import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Table, Spinner, Alert } from 'react-bootstrap';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        consultarApi();
    }, []);

    const consultarApi = async () => {
        try {
            setLoading(true);
            const url = "http://localhost:5000/api/pizzas";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Inicializo el carrito con las pizzas de la API y cantidad en 0
            setCart(data.map((pizza) => ({ ...pizza, quantity: 0 })));
            setError(null);
        } catch (error) {
            setError(`Error al obtener los datos: ${error.message}`);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const increaseQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 0) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0);
    };

    const selectedPizzas = cart.filter((pizza) => pizza.quantity > 0);

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
        <Container className="mt-3 mb-3">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card>
                        <Card.Header>Carrito de Compras</Card.Header>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    {cart.map((pizza, index) => (
                                        <ListGroup.Item key={pizza.id}>
                                            <Row className="align-items-center">
                                                <Col md={3}>
                                                    <Card.Img src={pizza.img} alt={pizza.name} />
                                                </Col>
                                                <Col md={3}>
                                                    <h5>{pizza.name}</h5>
                                                    <p>{pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                                </Col>
                                                <Col md={3}>
                                                    <Button variant="outline-secondary" onClick={() => decreaseQuantity(index)}>-</Button>
                                                    <span className="mx-2">{pizza.quantity}</span>
                                                    <Button variant="outline-secondary" onClick={() => increaseQuantity(index)}>+</Button>
                                                </Col>
                                                <Col md={3}>
                                                    <h5>Sub total:</h5>
                                                    <p>{(pizza.price * pizza.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card.Body>
                                    <Card.Title className="mb-4">Detalle de Pago</Card.Title>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Cantidad</th>
                                                <th>Descripción</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPizzas.map((pizza) => (
                                                <tr key={pizza.id}>
                                                    <td>{pizza.quantity}</td>
                                                    <td>{pizza.name}</td>
                                                    <td>{pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                                    <td>{(pizza.price * pizza.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                                <td><strong>{calculateTotal().toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button variant="success" className="mt-3">Pagar</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;

