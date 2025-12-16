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
export {
  guessPotentiallyProxiedOrySdkUrl,
  isProduction,
  orySdkUrl
};
//# sourceMappingURL=config.mjs.map