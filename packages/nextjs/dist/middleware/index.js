'use strict';

var server = require('next/server');
var cookie = require('cookie');
var setCookieParser = require('set-cookie-parser');
var psl = require('psl');

// src/middleware/middleware.ts

// src/utils/headers.ts
var defaultForwardedHeaders = [
  "accept",
  "accept-charset",
  "accept-encoding",
  "accept-language",
  "authorization",
  "cache-control",
  "content-type",
  "cookie",
  "host",
  "user-agent",
  "referer"
];
var defaultOmitHeaders = [
  "transfer-encoding",
  "content-encoding",
  "content-length"
];

// src/utils/sdk.ts
function getEnv(name) {
  return process.env[`NEXT_PUBLIC_${name}`] || process.env[name];
}
function orySdkUrl() {
  const baseUrl = getEnv("ORY_SDK_URL");
  if (!baseUrl) {
    throw new Error(
      "You need to set environment variable `NEXT_PUBLIC_ORY_SDK_URL` to your Ory Network SDK URL."
    );
  }
  return baseUrl.replace(/\/$/, "");
}
function isErrorResult(result) {
  return !!result && typeof result === "object" && "error" in result && "input" in result;
}
function guessCookieDomain(url) {
  var _a;
  let parsedUrl;
  try {
    parsedUrl = new URL(url).hostname;
  } catch (_) {
    parsedUrl = url;
  }
  if (isIPAddress(parsedUrl)) {
    return parsedUrl;
  }
  const parsed = psl.parse(parsedUrl);
  if (isErrorResult(parsed)) {
    return void 0;
  }
  return (_a = parsed.domain) != null ? _a : parsed.input;
}
function isIPAddress(hostname) {
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
  const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/;
  return ipv4Pattern.test(hostname) || ipv6Pattern.test(hostname);
}

// src/utils/utils.ts
function processSetCookieHeaders(protocol, fetchResponse, options, requestHeaders) {
  const isTls = protocol === "https:" || requestHeaders.get("x-forwarded-proto") === "https";
  const forwarded = requestHeaders.get("x-forwarded-host");
  const host = forwarded ? forwarded : requestHeaders.get("host");
  const domain = host && !options.forceCookieDomain ? guessCookieDomain(host != null ? host : "") : options.forceCookieDomain;
  return setCookieParser.parse(
    setCookieParser.splitCookiesString(fetchResponse.headers.get("set-cookie") || "")
  ).map((cookie) => ({
    ...cookie,
    domain,
    secure: isTls,
    encode: (v) => v
  })).map(
    ({ value, name, ...options2 }) => cookie.serialize(name, value, options2)
  );
}
function filterRequestHeaders(headers, forwardAdditionalHeaders) {
  const filteredHeaders = new Headers();
  headers.forEach((value, key) => {
    const isValid = defaultForwardedHeaders.includes(key) || (forwardAdditionalHeaders != null ? forwardAdditionalHeaders : []).includes(key);
    if (isValid) filteredHeaders.set(key, value);
  });
  return filteredHeaders;
}
function joinUrlPaths(baseUrl, relativeUrl) {
  const base = new URL(baseUrl);
  const relative = new URL(relativeUrl, baseUrl);
  relative.pathname = base.pathname.replace(/\/$/, "") + "/" + relative.pathname.replace(/^\//, "");
  return new URL(relative.toString(), baseUrl).href;
}

// src/utils/rewrite.ts
function rewriteUrls(source, matchBaseUrl, selfUrl, config) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  for (const [_, [matchPath, replaceWith]] of [
    // TODO load these dynamically from the project config
    // Old AX routes
    ["/ui/recovery", (_a = config.project) == null ? void 0 : _a.recovery_ui_url],
    ["/ui/registration", (_b = config.project) == null ? void 0 : _b.registration_ui_url],
    ["/ui/login", (_c = config.project) == null ? void 0 : _c.login_ui_url],
    ["/ui/verification", (_d = config.project) == null ? void 0 : _d.verification_ui_url],
    ["/ui/settings", (_e = config.project) == null ? void 0 : _e.settings_ui_url],
    ["/ui/welcome", (_f = config.project) == null ? void 0 : _f.default_redirect_url],
    // New AX routes
    ["/recovery", (_g = config.project) == null ? void 0 : _g.recovery_ui_url],
    ["/registration", (_h = config.project) == null ? void 0 : _h.registration_ui_url],
    ["/login", (_i = config.project) == null ? void 0 : _i.login_ui_url],
    ["/verification", (_j = config.project) == null ? void 0 : _j.verification_ui_url],
    ["/settings", (_k = config.project) == null ? void 0 : _k.settings_ui_url]
  ].entries()) {
    const match = joinUrlPaths(matchBaseUrl, matchPath || "");
    if (replaceWith && source.startsWith(match)) {
      source = source.replaceAll(
        match,
        new URL(replaceWith, selfUrl).toString()
      );
    }
  }
  return source.replaceAll(
    matchBaseUrl.replace(/\/$/, ""),
    new URL(selfUrl).toString().replace(/\/$/, "")
  );
}

// src/middleware/middleware.ts
function getProjectApiKey() {
  let baseUrl = "";
  if (process.env["ORY_PROJECT_API_TOKEN"]) {
    baseUrl = process.env["ORY_PROJECT_API_TOKEN"];
  }
  return baseUrl.replace(/\/$/, "");
}
async function proxyRequest(request, options) {
  var _a, _b;
  const match = [
    "/self-service",
    "/sessions/whoami",
    "/ui",
    "/.well-known/ory",
    "/.ory"
  ];
  if (!match.some((m) => request.nextUrl.pathname.startsWith(m))) {
    return server.NextResponse.next();
  }
  const appBaseHost = request.headers.get("host");
  const matchBaseUrl = new URL(orySdkUrl());
  const selfUrl = request.nextUrl.protocol + "//" + (appBaseHost || request.nextUrl.host);
  const upstreamUrl = request.nextUrl.clone();
  upstreamUrl.hostname = matchBaseUrl.hostname;
  upstreamUrl.host = matchBaseUrl.host;
  upstreamUrl.protocol = matchBaseUrl.protocol;
  upstreamUrl.port = matchBaseUrl.port;
  const upstreamRequestHeaders = filterRequestHeaders(
    await request.headers,
    options.forwardAdditionalHeaders
  );
  upstreamRequestHeaders.set("Host", upstreamUrl.host);
  upstreamRequestHeaders.set("Ory-Base-URL-Rewrite", selfUrl.toString());
  upstreamRequestHeaders.set("Ory-Base-URL-Rewrite-Token", getProjectApiKey());
  upstreamRequestHeaders.set("Ory-No-Custom-Domain-Redirect", "true");
  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers: upstreamRequestHeaders,
    body: request.method !== "GET" && request.method !== "HEAD" ? await request.arrayBuffer() : null,
    redirect: "manual"
  });
  defaultOmitHeaders.forEach((header) => {
    upstreamResponse.headers.delete(header);
  });
  if (upstreamResponse.headers.get("set-cookie")) {
    const cookies = processSetCookieHeaders(
      request.nextUrl.protocol,
      upstreamResponse,
      options,
      request.headers
    );
    upstreamResponse.headers.delete("set-cookie");
    cookies.forEach((cookie) => {
      upstreamResponse.headers.append("Set-Cookie", cookie);
    });
  }
  const originalLocation = upstreamResponse.headers.get("location");
  if (originalLocation) {
    let location = originalLocation;
    if (location.startsWith("../self-service")) {
      location = location.replace("../self-service", "/self-service");
    } else if (!location.startsWith("http")) {
      location = new URL(location, matchBaseUrl).toString();
    }
    location = rewriteUrls(location, matchBaseUrl.toString(), selfUrl, options);
    if (!location.startsWith("http")) {
      location = new URL(location, selfUrl).toString();
    }
    if (!location.startsWith("http")) {
      throw new Error(
        "The HTTP location header must be an absolute URL in NextJS middlewares. However, it is not. The resulting HTTP location is `" + location + "`. This is either a configuration or code bug. Please open an issue on https://github.com/ory/elements."
      );
    }
    upstreamResponse.headers.set("location", location);
  }
  let modifiedBody = Buffer.from(await upstreamResponse.arrayBuffer());
  if (((_a = upstreamResponse.headers.get("content-type")) == null ? void 0 : _a.includes("text/")) || ((_b = upstreamResponse.headers.get("content-type")) == null ? void 0 : _b.includes("application/json"))) {
    const bufferString = modifiedBody.toString("utf-8");
    modifiedBody = Buffer.from(
      rewriteUrls(bufferString, matchBaseUrl.toString(), selfUrl, options)
    );
  }
  return new server.NextResponse(modifiedBody, {
    headers: upstreamResponse.headers,
    status: upstreamResponse.status
  });
}
function createOryMiddleware(options) {
  return (r) => {
    return proxyRequest(r, options);
  };
}

exports.createOryMiddleware = createOryMiddleware;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map