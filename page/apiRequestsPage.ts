import { expect } from "@playwright/test";

export class apiRequestsPage{
     async getBreweryById(myUrl: RequestInfo | URL, ){
       let method = 'GET';
       
        const response =  await fetch(myUrl, {
            method: method,
            headers: {
                Accept: 'application/json',
              },
        });
          expect(response.status).toBe(200);
          const formJSON = await response.json()
         
          return formJSON;
        }
    }
    
   
      
      
