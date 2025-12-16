/**
 * This function returns the base URL of the Ory SDK as set by environment variables `NEXT_PUBLIC_ORY_SDK_URL` or `ORY_SDK_URL`.
 */
declare function orySdkUrl(): string;
/**
 * This function returns whether the current environment is a production environment.
 */
declare function isProduction(): boolean;
/**
 * This function returns the Ory SDK URL. If the environment is not production, it tries to guess the SDK URL based on the environment variables, assuming
 * that Ory APIs are proxied through the same domain as the application.
 *
 * Currently, this is only tested for Vercel deployments.
 *
 * @param options - Options for guessing the SDK URL.
 */
declare function guessPotentiallyProxiedOrySdkUrl(options?: {
    knownProxiedUrl?: string;
}): string;

export { guessPotentiallyProxiedOrySdkUrl, isProduction, orySdkUrl };
