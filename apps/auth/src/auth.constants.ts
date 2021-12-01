import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../../../.env' });

export const AUTH_SECRET =
  process.env.AUTH_SECRET || 'someSecretKeyThatNeedsToBeChangedLater';

export const REQUEST_BODY_SIZE = '50mb';

export const SERVER_PORT = parseInt(process.env.AUTH_PORT, 10) || 3001;

export const WHITE_LISTED_DOMAINS = process.env.WHITE_LISTED_DOMAINS || '';

export const NATS_URL = process.env.NATS_URL;

export const APP_NATS_QUEUE = 'auth_queue';
