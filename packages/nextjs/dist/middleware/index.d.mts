import { NextRequest, NextResponse } from 'next/server';
import { AccountExperienceConfiguration } from '@ory/client-fetch';

/**
 * @hidden
 * @inline
 * @public
 */
type OryMiddlewareOptions = {
    /**
     * By default headers are filtered to forward only a fixed list.
     *
     * If you need to forward additional headers you can use this setting to define them.
     */
    forwardAdditionalHeaders?: string[];
    /**
     * If you want to force a specific cookie domain, you can set it here.
     */
    forceCookieDomain?: string;
    /**
     * If you want to use a specific project configuration, you can set it here.
     *
     * Make sure to pass the same project configuration that you pass to `@ory/elements-react`
     */
    project?: Partial<AccountExperienceConfiguration>;
};
/**
 * Creates a Next.js middleware function that proxies requests to the Ory SDK.
 *
 * This middleware function intercepts requests to the Ory SDK and rewrites the URLs if
 * in development mode or on vercel.com domains.
 *
 * @example
 * ```ts title="middleware.ts"
 * import { createOryMiddleware } from "@ory/elements/nextjs";
 *
 * export default createOryMiddleware({
 *   forwardAdditionalHeaders: ["authorization", "x-custom-header"],
 *   forceCookieDomain: "example.com",
 *   project: {
 *     name: "my-project",
 *   },
 * });
 * ```
 *
 * @param options - The Ory configuration to use for the middleware.
 * @returns The Ory Next.js middleware function
 * @public
 */
declare function createOryMiddleware(options: OryMiddlewareOptions): (r: NextRequest) => Promise<NextResponse<unknown>>;

export { type OryMiddlewareOptions, createOryMiddleware };
