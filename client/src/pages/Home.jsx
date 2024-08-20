import { useState, useEffect } from "react";
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setPizzas(data);
            setError(null);
        } catch (error) {
            setError(`Error al obtener los datos: ${error.message}`);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
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
        <>
            <Header />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    {pizzas.map((pizza) => (
                        <Col md={4} className="mb-4 d-flex" key={pizza.id}>
                            <CardPizza
                                id={pizza.id}
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;
