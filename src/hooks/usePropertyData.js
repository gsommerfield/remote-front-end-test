import { useEffect, useState } from 'react';

const useProperyData = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            const url = 'http://localhost:3000/api/properties';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setPropertyData(json);
            } catch (error) {
                // I would post to rightmove's RUM here...
                console.error(error.message);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    return { propertyData, loading, error };
};

export default useProperyData;
