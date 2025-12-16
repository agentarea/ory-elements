import { SessionContextData } from './session-provider.mjs';
import 'react/jsx-runtime';
import 'react';
import '@ory/client-fetch';

/**
 * A hook to get the current session from the Ory Network.
 *
 * Usage:
 * ```ts
 * const session = useSession()
 *
 * if (session.state == "loading") {
 *  return <div>Loading...</div>
 * }
 *
 * if (session.state == "authenticated") {
 *  return <div>Session: {session.session.id}</div>
 * }
 * ```
 *
 * :::note
 * This is a client-side hook and must be used within a React component.
 * On the server, you can use the getServerSession function from `@ory/nextjs`
 * and hydrate SessionProvider with the session.
 * :::
 *
 * @returns The current session, and error or loading state.
 */
declare function useSession(): SessionContextData;

export { useSession };
