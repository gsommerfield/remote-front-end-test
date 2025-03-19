import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from '../Header';
import SortAndFilter from '../SortAndFilter';
import PropertyListing from '../PropertyListing';

const App = () => {
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
                // I would post to some real user monitoring tool like datadog
                console.error(error.message);
                setError(false);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    return (
        <div className="App">
            <Header />
            <main>
                <SortAndFilter />
                {!error && <PropertyListing propertyData={propertyData} isLoading={loading} />}
            </main>
        </div>
    );
};

export default App;
