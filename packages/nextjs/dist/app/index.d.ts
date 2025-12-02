import { LoginFlow, RegistrationFlow, RecoveryFlow, VerificationFlow, SettingsFlow, LogoutFlow, Session, ApiResponse, FlowType } from '@ory/client-fetch';

type QueryParams = {
    [key: string]: string | string[] | undefined;
};

/**
 * Use this method in an app router page to fetch an existing login flow or to create a new one. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { Login } from "@ory/elements-react/theme"
 * import { getLoginFlow, OryPageParams } from "@ory/nextjs/app"
 * import CardHeader from "@/app/auth/login/card-header"
 *
 * import config from "@/ory.config"
 *
 * export default async function LoginPage(props: OryPageParams) {
 *   const flow = await getLoginFlow(config, props.searchParams)
 *
 *   if (!flow) {
 *     return null
 *   }
 *
 *   return (
 *     <Login
 *       flow={flow}
 *       config={config}
 *       components={{
 *         Card: {
 *           Header: CardHeader,
 *         },
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @param config - The Ory configuration object.
 * @param params - The query parameters of the request.
 * @public
 */
declare function getLoginFlow(config: {
    project: {
        login_ui_url: string;
    };
}, params: QueryParams | Promise<QueryParams>): Promise<LoginFlow | null | void>;

/**
 * Use this method in an app router page to fetch an existing registration flow or to create a new one. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { Registration } from "@ory/elements-react/theme"
 * import { getRegistrationFlow, OryPageParams } from "@ory/nextjs/app"
 *
 * import config from "@/ory.config"
 * import CardHeader from "@/app/auth/registration/card-header"
 *
 * export default async function RegistrationPage(props: OryPageParams) {
 *   const flow = await getRegistrationFlow(config, props.searchParams)
 *
 *   if (!flow) {
 *     return null
 *   }
 *
 *   return (
 *     <Registration
 *       flow={flow}
 *       config={config}
 *       components={{
 *         Card: {
 *           Header: CardHeader,
 *         },
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @param config - The Ory configuration object.
 * @param params - The query parameters of the request.
 * @public
 */
declare function getRegistrationFlow(config: {
    project: {
        registration_ui_url: string;
    };
}, params: QueryParams | Promise<QueryParams>): Promise<RegistrationFlow | null | void>;

/**
 * Use this method in an app router page to fetch an existing recovery flow or to create a new one. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { Recovery } from "@ory/elements-react/theme"
 * import { getRecoveryFlow, OryPageParams } from "@ory/nextjs/app"
 * import config from "@/ory.config"
 * import CardHeader from "@/app/auth/recovery/card-header"
 *
 * export default async function RecoveryPage(props: OryPageParams) {
 *   const flow = await getRecoveryFlow(config, props.searchParams)
 *
 *   if (!flow) {
 *     return null
 *   }
 *
 *   return (
 *     <Recovery
 *       flow={flow}
 *       config={config}
 *       components={{
 *         Card: {
 *           Header: CardHeader,
 *         },
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @param config - The Ory configuration object.
 * @param params - The query parameters of the request.
 * @public
 */
declare function getRecoveryFlow(config: {
    project: {
        recovery_ui_url: string;
    };
}, params: QueryParams | Promise<QueryParams>): Promise<RecoveryFlow | null | void>;

/**
 * Use this method in an app router page to fetch an existing verification flow or to create a new one. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { Verification } from "@ory/elements-react/theme"
 * import { getVerificationFlow, OryPageParams } from "@ory/nextjs/app"
 *
 * import config from "@/ory.config"
 * import CardHeader from "@/app/auth/verification/card-header"
 *
 * export default async function VerificationPage(props: OryPageParams) {
 *   const flow = await getVerificationFlow(config, props.searchParams)
 *
 *   if (!flow) {
 *     return null
 *   }
 *
 *   return (
 *     <Verification
 *       flow={flow}
 *       config={config}
 *       components={{
 *         Card: {
 *           Header: CardHeader,
 *         },
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @param config - The Ory configuration object.
 * @param params - The query parameters of the request.
 * @public
 */
declare function getVerificationFlow(config: {
    project: {
        verification_ui_url: string;
    };
}, params: QueryParams | Promise<QueryParams>): Promise<VerificationFlow | null | void>;

/**
 * Use this method in an app router page to fetch an existing login flow or to create a new one. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { Login } from "@ory/elements-react/theme"
 * import { getLoginFlow, OryPageParams } from "@ory/nextjs/app"
 *
 * import config from "@/ory.config"
 * import CardHeader from "@/app/auth/login/card-header"
 *
 * export default async function LoginPage(props: OryPageParams) {
 *   const flow = await getLoginFlow(config, props.searchParams)
 *
 *   if (!flow) {
 *     return null
 *   }
 *
 *   return (
 *     <Login
 *       flow={flow}
 *       config={config}
 *       components={{
 *         Card: {
 *           Header: CardHeader,
 *         },
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @param config - The Ory configuration object.
 * @param params - The query parameters of the request.
 * @public
 */
declare function getSettingsFlow(config: {
    project: {
        settings_ui_url: string;
    };
}, params: QueryParams | Promise<QueryParams>): Promise<SettingsFlow | null | void>;

/**
 * Use this method in an app router page to create a new logout flow. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { getLogoutFlow } from "@ory/nextjs/app"
 *
 * async function LogoutLink() {
 *   const flow = await getLogoutFlow()
 *
 *   return (
 *     <a href={flow.logout_url}>
 *       Logout
 *     </a>
 *   )
 * }
 *
 * ```
 *
 * @param params - The query parameters of the request.
 * @public
 */
declare function getLogoutFlow({ returnTo, }?: {
    returnTo?: string;
}): Promise<LogoutFlow>;

/**
 * A helper to fetch the session on the server side. This method works with server-side rendering.
 *
 * @example
 * ```tsx
 * import { getServerSession } from "@ory/nextjs/app"
 *
 * async function MyComponent() {
 *  const session = await getServerSession()
 *
 *  if (!session) {
 *    return <p>No session found</p>
 *  }
 *
 * }
 * ```
 *
 * @returns The session object or null if no session is found.
 * @public
 */
declare function getServerSession(): Promise<Session | null>;

/**
 * A function that creates a flow fetcher. The flow fetcher can be used
 * to fetch a login, registration, recovery, settings, or verification flow
 * from the SDK.
 *
 * Unless you are building something very custom, you will not need this method. Use it with care and expect
 * potential breaking changes.
 *
 * @param params - The query parameters of the request.
 * @param fetchFlowRaw - A function that fetches the flow from the SDK.
 * @param flowType - The type of the flow.
 * @param baseUrl - The base URL of the application.
 * @param route - The route of the application.
 * @param options - Additional options.
 * @public
 */
declare function getFlowFactory<T extends object>(params: QueryParams, fetchFlowRaw: () => Promise<ApiResponse<T>>, flowType: FlowType, baseUrl: string, route: string, options?: {
    disableRewrite?: boolean;
}): Promise<T | null | void>;

/**
 * A utility type that represents the query parameters of a request.
 *
 * This is needed because Next.js does not expose the query parameters as a tye.
 *
 * ```ts
 * import { OryPageParams } from "@ory/nextjs/app"
 *
 * export default async function LoginPage(props: OryPageParams) {
 *   // props.searchParams is a Promise that resolves to an object with the query parameters
 * }
 * ```
 *
 * @public
 */
interface OryPageParams {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export { type OryPageParams, getFlowFactory, getLoginFlow, getLogoutFlow, getRecoveryFlow, getRegistrationFlow, getServerSession, getSettingsFlow, getVerificationFlow };
