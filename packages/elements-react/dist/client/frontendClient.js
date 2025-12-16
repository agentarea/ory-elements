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
var frontendClient_exports = {};
__export(frontendClient_exports, {
  frontendClient: () => frontendClient,
  oauth2Client: () => oauth2Client
});
module.exports = __toCommonJS(frontendClient_exports);
var import_client_fetch = require("@ory/client-fetch");
var import_config = require("./config");
function frontendClient({
  forceBaseUrl,
  ...opts
} = {
  credentials: "include"
}) {
  var _a;
  const basePath = forceBaseUrl != null ? forceBaseUrl : (0, import_config.guessPotentiallyProxiedOrySdkUrl)({
    knownProxiedUrl: window.location.origin
  });
  const config = new import_client_fetch.Configuration({
    ...opts,
    basePath: basePath == null ? void 0 : basePath.replace(/\/$/, ""),
    credentials: (_a = opts.credentials) != null ? _a : "include",
    headers: {
      Accept: "application/json",
      ...opts.headers
    }
  });
  return new import_client_fetch.FrontendApi(config);
}
function oauth2Client({
  forceBaseUrl,
  ...opts
} = {
  credentials: "include"
}) {
  var _a;
  const basePath = forceBaseUrl != null ? forceBaseUrl : (0, import_config.guessPotentiallyProxiedOrySdkUrl)({
    knownProxiedUrl: window.location.origin
  });
  const config = new import_client_fetch.Configuration({
    ...opts,
    basePath: basePath == null ? void 0 : basePath.replace(/\/$/, ""),
    credentials: (_a = opts.credentials) != null ? _a : "include",
    headers: {
      Accept: "application/json",
      ...opts.headers
    }
  });
  return new import_client_fetch.OAuth2Api(config);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  frontendClient,
  oauth2Client
});
//# sourceMappingURL=frontendClient.js.map