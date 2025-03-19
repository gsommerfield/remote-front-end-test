import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';

const DUMMY_PROPERTY = {
    id: 73864112,
    bedrooms: 3,
    summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
    propertyType: 'Flat',
    price: 1950000,
    branchName: 'M2 Property, London',
    propertyUrl: '/property-for-sale/property-73864112.html',
    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
    propertyTitle: '3 bedroom flat for sale',
    mainImage:
        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
};

const propertyData = new Array(5).fill(DUMMY_PROPERTY);

describe('PropertyListing', () => {
    it('should render five property cards', async () => {
        render(<PropertyListing propertyData={propertyData} isLoading={false} />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(5);
    });

    it.only('should show a loading state whilst waiting for data', async () => {
        render(<PropertyListing propertyData={propertyData} isLoading />);
        const loadingIndicator = screen.getByRole('status');
        expect(loadingIndicator).toBeInTheDocument();
    });

    it('should not show a loading state when data has been recieved', async () => {
        render(<PropertyListing propertyData={propertyData} />);
        const loadingIndicator = screen.queryByRole('status');
        expect(loadingIndicator).toBeNull;
    });
});
