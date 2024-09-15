import { Client,Account } from "appwrite";
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e6ffc4001511334485');

const account = new Account(client);
export {client,account};