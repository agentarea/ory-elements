import { ConfigurationParameters, FrontendApi, OAuth2Api } from '@ory/client-fetch';

declare function frontendClient({ forceBaseUrl, ...opts }?: Partial<ConfigurationParameters & {
    forceBaseUrl?: string;
}>): FrontendApi;
declare function oauth2Client({ forceBaseUrl, ...opts }?: Partial<ConfigurationParameters & {
    forceBaseUrl?: string;
}>): OAuth2Api;

export { frontendClient, oauth2Client };
