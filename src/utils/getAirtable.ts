import Airtable from 'airtable';

// check for .env.dev or env.prod
const key = process.env.REACT_APP_AIRTABLE_KEY;
const bn: string = process.env.REACT_APP_AIRTABLE_BASE as string;

const getAirtableBase = () => new Airtable({ apiKey: key }).base(bn);

export default getAirtableBase;
