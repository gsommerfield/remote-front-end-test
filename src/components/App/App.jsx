import React from 'react';
import './App.scss';
import Header from '../Header';
import SortAndFilter from '../SortAndFilter';
import PropertyListing from '../PropertyListing';
import useProperyData from '../../hooks/usePropertyData';

const App = () => {
    const { propertyData, loading, error } = useProperyData();

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
