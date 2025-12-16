"use client";
import { jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { frontendClient } from "./frontendClient";
const SessionContext = createContext({
  session: null,
  isLoading: false,
  initialized: false,
  error: void 0,
  refetch: async () => {
  }
});
function SessionProvider({
  session: initialSession,
  children,
  baseUrl
}) {
  const initialized = useRef(!!initialSession);
  const [isLoading, setLoading] = useState(false);
  const [sessionState, setSessionState] = useState(
    () => {
      if (initialSession) {
        return {
          session: initialSession,
          state: initialSession.active ? "authenticated" : "unauthenticated"
        };
      }
      return void 0;
    }
  );
  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      const session = await frontendClient({
        forceBaseUrl: baseUrl
      }).toSession();
      setSessionState({
        session,
        state: session.active ? "authenticated" : "unauthenticated"
      });
    } catch (error) {
      setSessionState({ state: "error", error });
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      void fetchSession();
    }
  }, [fetchSession]);
  return /* @__PURE__ */ jsx(
    SessionContext.Provider,
    {
      value: {
        error: (sessionState == null ? void 0 : sessionState.state) === "error" ? sessionState.error : void 0,
        session: (sessionState == null ? void 0 : sessionState.state) === "authenticated" ? sessionState.session : null,
        isLoading,
        initialized: initialized.current,
        refetch: fetchSession
      },
      children
    }
  );
}
export {
  SessionContext,
  SessionProvider
};
//# sourceMappingURL=session-provider.mjs.map