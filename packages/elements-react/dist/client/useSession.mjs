"use client";
import { useContext } from "react";
import { SessionContext } from "./session-provider";
function useSession() {
  if (!SessionContext) {
    throw new Error("[Ory/Elements] useSession must be used on the client");
  }
  return useContext(SessionContext);
}
export {
  useSession
};
//# sourceMappingURL=useSession.mjs.map