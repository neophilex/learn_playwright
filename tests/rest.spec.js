//@ts-check

const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });




test('rest endpoint', async ({ request }) => {

    //read the json file and parse it into variable my_data
    const fs = require('fs');
    const validation_data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));


    //make a request to the endpoint
    const response = await request.get('/todos/1');

    //validate the response
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');

    //validate the response body
    response.json().then((response_data) => {
        console.log(response_data);
        for (const key in validation_data) {
            expect(validation_data[key]).toBe(response_data[key]);
        }
    });
});