"use strict";
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
var config_exports = {};
__export(config_exports, {
  guessPotentiallyProxiedOrySdkUrl: () => guessPotentiallyProxiedOrySdkUrl,
  isProduction: () => isProduction,
  orySdkUrl: () => orySdkUrl
});
module.exports = __toCommonJS(config_exports);
function orySdkUrl() {
  let baseUrl;
  if (process.env.NEXT_PUBLIC_ORY_SDK_URL) {
    baseUrl = process.env.NEXT_PUBLIC_ORY_SDK_URL;
  }
  if (process.env.ORY_SDK_URL) {
    baseUrl = process.env.ORY_SDK_URL;
  }
  if (!baseUrl) {
    throw new Error(
      "You need to set environment variable `NEXT_PUBLIC_ORY_SDK_URL` or if you don't use Next.js `ORY_SDK_URL` to your Ory Network SDK URL."
    );
  }
  return baseUrl.replace(/\/$/, "");
}
function isProduction() {
  var _a, _b;
  return ["production", "prod"].indexOf(
    (_b = (_a = process.env.VERCEL_ENV) != null ? _a : process.env.NODE_ENV) != null ? _b : ""
  ) > -1;
}
function guessPotentiallyProxiedOrySdkUrl(options) {
  if (isProduction()) {
    return orySdkUrl();
  }
  if (process.env.VERCEL_ENV) {
    if (!isProduction() && process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
    }
    if (process.env.__NEXT_PRIVATE_ORIGIN) {
      return process.env.__NEXT_PRIVATE_ORIGIN.replace(/\/$/, "");
    }
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (options == null ? void 0 : options.knownProxiedUrl) {
    return options.knownProxiedUrl;
  }
  const final = orySdkUrl();
  console.warn(
    `Unable to determine a suitable SDK URL for setting up the Next.js integration of Ory Elements. Will proceed using default Ory SDK URL "${final}". This is likely not what you want for local development and your authentication and login may not work.`
  );
  return final;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  guessPotentiallyProxiedOrySdkUrl,
  isProduction,
  orySdkUrl
});
//# sourceMappingURL=config.js.map