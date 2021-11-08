import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../../../.env' });

export const ORIGIN_SITE = process.env.ORIGIN_SITE || '';

export const ORIGIN_DASHBOARD = process.env.ORIGIN_DASHBOARD || '';

export const REQUEST_BODY_SIZE = '50mb';

export const SERVER_PORT = process.env.USER_PORT;

// INFO: ONLY FOR EXAMPLE, DELETE IT FOR CLONED PROJECTS!
export const COUNTRY_LIST_API_ENDPOINT = '';
export const SINGLE_COUNTRY_API_ENDPOINT = '';
