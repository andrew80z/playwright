// @ts-check
import { test, expect } from '@playwright/test';
import { apiRequestsPage } from '../page/apiRequestsPage';

const testData = {
    id : 'b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0',
    name: 'MadTree Brewing 2.0',
    address_3: null,
    city: 'Cincinnati',
    state_province: 'Ohio',
    postal_code: '45213',
    country: 'United States',
    longitude: '-84.4137736',
    latitude: '39.1885752',
    phone: '5138368733',
    website_url: 'http://www.madtreebrewing.com',
    state: 'Ohio',
    street: '5164 Kennedy Ave'
}
const endpoint = '/v1/breweries/'
const myUrl = 'https://api.openbrewerydb.org'+ endpoint + testData.id;
  
test('should be get brewvery by ID and compare response', async ({ request }) => {
     
    let requests = new apiRequestsPage();
    let getRequest = await requests.getBreweryById(myUrl);
    expect(getRequest.name).toEqual(testData.name);

});