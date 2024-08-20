import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
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

    const contextValue = useMemo(() => ({ pizzas, loading, error }), [pizzas, loading, error]);

    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    );
};

PizzaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
