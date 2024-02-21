import { Account, Client } from 'appwrite';

export const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}`|| '';
export const PROJECT_ID = `${process.env.REACT_APP_PROJECT_ID}` || '';


const client = new Client()


if (!API_ENDPOINT && !PROJECT_ID) {
	client.setEndpoint(API_ENDPOINT)
	client.setProject(PROJECT_ID);
}


export const account = new Account(client);

export default client;
