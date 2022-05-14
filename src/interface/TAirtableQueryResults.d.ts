import Airtable from 'airtable';

export type TAirtableQueryResults = {
  success: boolean;
  data: Airtable.Record<any>[];
  error: string;
};
