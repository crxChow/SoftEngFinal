/**
 * This prepares the AXIOS instance to EITHER connect to the actual
 * live-running AWS...
 * 
 * OR 
 * 
 * connect to the mock object designed to make the front-end GUI development
 * able to proceed even before the AWS back-end server is working
 */
 import axios from 'axios';
 import AxiosMockAdapter from 'axios-mock-adapter';

 // all WEB traffic using this API instance
 export const awsInstance = axios.create({
   baseURL: 'https://qsnf3fzubl.execute-api.us-east-1.amazonaws.com/Prod/'
 });
 
// create Mock for this
export const mockAwsInstance = new AxiosMockAdapter(awsInstance, { delayResponse: 0 });
