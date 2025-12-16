import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Session } from '@ory/client-fetch';

/**
 * Holds the session context data.
 * This context is used to provide the session data to the children of the provider.
 * It is used by the {@link useSession} hook to access the session data.
 */
type SessionContextData = {
    /**
     * Whether the session is currently being loaded
     */
    isLoading: boolean;
    /**
     * Whether the session is being loaded for the first time
     * Never true, if a session was passed to the provider
     */
    initialized: boolean;
    /**
     * The current session or null if the user is not authenticated or an error occurred,
     * when fetching the session
     */
    session: Session | null;
    /**
     * The error that occurred when fetching the session if any
     */
    error: Error | undefined;
    /**
     * Refetches the session
     */
    refetch: () => Promise<void>;
};
declare const SessionContext: react.Context<SessionContextData>;
type SessionProviderProps = {
    session?: Session | null;
    baseUrl?: string;
} & React.PropsWithChildren;
/**
 * A provider that fetches the session from the Ory Network and provides it to the children.
 *
 * To use this provider, wrap your application in it:
 *
 * ```tsx
 * import { SessionProvider } from "@ory/elements-react"
 *
 * export default function App() {
 *   return (
 *     <SessionProvider>
 *       <MyApp />
 *     </SessionProvider>
 *   )
 * }
 * ```
 *
 * If you have a session from the server, you can pass it to the provider:
 *
 * ```tsx
 * <SessionProvider session={serverSession}>
 * ```
 *
 * @see {@link useSession}
 * @param props - The provider props
 */
declare function SessionProvider({ session: initialSession, children, baseUrl, }: SessionProviderProps): react_jsx_runtime.JSX.Element;

export { SessionContext, type SessionContextData, SessionProvider, type SessionProviderProps };
