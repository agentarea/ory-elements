"use client";
import {
  Configuration,
  FrontendApi,
  OAuth2Api
} from "@ory/client-fetch";
import { guessPotentiallyProxiedOrySdkUrl } from "./config";
function frontendClient({
  forceBaseUrl,
  ...opts
} = {
  credentials: "include"
}) {
  var _a;
  const basePath = forceBaseUrl != null ? forceBaseUrl : guessPotentiallyProxiedOrySdkUrl({
    knownProxiedUrl: window.location.origin
  });
  const config = new Configuration({
    ...opts,
    basePath: basePath == null ? void 0 : basePath.replace(/\/$/, ""),
    credentials: (_a = opts.credentials) != null ? _a : "include",
    headers: {
      Accept: "application/json",
      ...opts.headers
    }
  });
  return new FrontendApi(config);
}
function oauth2Client({
  forceBaseUrl,
  ...opts
} = {
  credentials: "include"
}) {
  var _a;
  const basePath = forceBaseUrl != null ? forceBaseUrl : guessPotentiallyProxiedOrySdkUrl({
    knownProxiedUrl: window.location.origin
  });
  const config = new Configuration({
    ...opts,
    basePath: basePath == null ? void 0 : basePath.replace(/\/$/, ""),
    credentials: (_a = opts.credentials) != null ? _a : "include",
    headers: {
      Accept: "application/json",
      ...opts.headers
    }
  });
  return new OAuth2Api(config);
}
export {
  frontendClient,
  oauth2Client
};
//# sourceMappingURL=frontendClient.mjs.map