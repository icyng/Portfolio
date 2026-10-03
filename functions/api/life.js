import { readLife } from '../../server/life.js';

export const onRequestGet = ({ env }) => readLife(env.GITHUB_PROJECT_TOKEN);
