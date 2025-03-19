import React from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';
import PropTypes from 'prop-types';

const PropertyListing = ({ propertyData, isLoading }) =>
    isLoading ? (
        <div role="status" aria-live="assertive" aria-busy="true">
            Loading
        </div>
    ) : (
        <ul className="PropertyListing">
            {propertyData.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );

PropertyListing.propTypes = {
    propertyData: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
};

export default PropertyListing;
