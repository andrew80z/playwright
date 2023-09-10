// @ts-check
import { test, expect } from '@playwright/test';
import { apiRequestsPage } from '../page/apiRequestsPage';
import {} from '../page/data/envs.json'


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

let myEnv = require( '../page/data/envs.json');
let postUrl =  myEnv.qa.postUrl;
let endpoint = '/v1/breweries/';
if (process.env.runEnv == 'qa'){
    postUrl =  myEnv.qa.postUrl;
    const endpoint = myEnv.qa.endpoint;
    console.log(`test ${JSON.stringify( myEnv.qa.endpoint)}`);
} else if(process.env.runEnv == 'dev'){
    postUrl =  myEnv.dev.postUrl;
    const endpoint = myEnv.dev.endpoint;
    console.log(`test ${JSON.stringify( myEnv.dev.endpoint)}`);
} else{
    console.log(` ${process.env.runEnv}is an Invalid input`);
}
let requests = new apiRequestsPage();

//const postUrl = 'https://api.restful-api.dev/objects';

test.describe.skip('API tests', async () =>{
  
    test('should be get brewvery by ID and compare response', async ({  }) => {
        const endpoint = myEnv.qa.endpoint; //'/v1/breweries/'
        const myUrl = 'https://api.openbrewerydb.org'+ endpoint + testData.id;
        let getRequest = await requests.getBreweryById(myUrl);
        expect(getRequest.name).toEqual(testData.name);

    });
    test('Get List of objects', async () => {  
        let getAllObjects = await requests.getListOfObjects(postUrl);
        expect(getAllObjects).not.toBeEmpty
    });


    test('Send test POST request', async ({  }) => {
        const testId = 7
        const postBody = {
            "name": "Apple MacBook Pro 16",
            "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
            }
        }
        let postRequest = await requests.testPostrequest(postUrl, postBody);
        const testData = await requests.getListOfObjects(postUrl);
        expect(postRequest.name).toEqual(postBody.name);
        expect(postRequest.data).toEqual(postBody.data);
    });
});