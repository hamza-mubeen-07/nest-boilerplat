import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../../../.env' });

export const ORIGIN_SITE = process.env.ORIGIN_SITE || '';

export const ORIGIN_DASHBOARD = process.env.ORIGIN_DASHBOARD || '';

export const REQUEST_BODY_SIZE = '50mb';

export const SERVER_PORT = parseInt(process.env.CATEGORY_PORT, 10);

export const WHITE_LISTED_DOMAINS = process.env.WHITE_LISTED_DOMAINS || '';

export const MAX_CACHE_ITEMS = 30;

export const MAX_CACHE_TIME_SEC = 5;
