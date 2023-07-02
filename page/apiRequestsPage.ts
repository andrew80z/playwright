import { expect } from "@playwright/test";
import { Response } from "node-fetch";

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
      
async getListOfObjects(myUrl: RequestInfo | URL){
  let method = 'GET';
  const response = await fetch(myUrl, {
    method: method,
    headers: {
      Accept: 'application/json',
    },
  });
  expect(response.status).toBe(200);
          const formJSON = await response.json()
         
          return formJSON;
}
    async testPostrequest(myUrl: RequestInfo | URL , postBody){
          let method = 'POST';
        
           const response =  await fetch(myUrl, {
               method: method,
               headers: {
                "Content-Type": "application/json"     
                 },
               body: JSON.stringify(postBody),    
            });
          expect(response.status).toBe(200);
          const formJSON = await response.json()
            
          return formJSON;
    }
}
        


    
    
   
      
      
