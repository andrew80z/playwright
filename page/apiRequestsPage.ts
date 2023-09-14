import { expect } from "@playwright/test";

export class apiRequestsPage{
    async envSetup(){
      let myEnv = require( '../page/data/envs.json');
let postUrl = "https://api.restful-api.dev/objects" ;
let endpoint = '/v1/breweries/';
if (process.env.runEnv == 'qa'){
    postUrl =  myEnv.qa.postUrl;
    const endpoint = myEnv.qa.endpoint;
} else if(process.env.runEnv == 'dev'){
    postUrl =  myEnv.dev.postUrl;
    const endpoint = myEnv.dev.endpoint;
}
  return {
    "postUrl" : postUrl,
    "endpoint" : endpoint
  };

    }
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
        


    
    
   
      
      
