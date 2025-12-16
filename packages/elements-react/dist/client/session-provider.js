"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var session_provider_exports = {};
__export(session_provider_exports, {
  SessionContext: () => SessionContext,
  SessionProvider: () => SessionProvider
});
module.exports = __toCommonJS(session_provider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_frontendClient = require("./frontendClient");
const SessionContext = (0, import_react.createContext)({
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
  const initialized = (0, import_react.useRef)(!!initialSession);
  const [isLoading, setLoading] = (0, import_react.useState)(false);
  const [sessionState, setSessionState] = (0, import_react.useState)(
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
  const fetchSession = (0, import_react.useCallback)(async () => {
    try {
      setLoading(true);
      const session = await (0, import_frontendClient.frontendClient)({
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
  (0, import_react.useEffect)(() => {
    if (!initialized.current) {
      initialized.current = true;
      void fetchSession();
    }
  }, [fetchSession]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SessionContext,
  SessionProvider
});
//# sourceMappingURL=session-provider.js.map