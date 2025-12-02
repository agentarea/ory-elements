import { handleFlowError, FlowType, FrontendApi, Configuration } from '@ory/client-fetch';
import { redirect, RedirectType } from 'next/navigation';
import { headers } from 'next/headers';
import 'cookie';
import 'set-cookie-parser';
import 'psl';

// src/types.ts
var initOverrides = {
  cache: "no-cache"
};

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

// src/app/client.ts
var serverSideFrontendClient = () => new FrontendApi(
  new Configuration({
    headers: {
      Accept: "application/json"
    },
    basePath: orySdkUrl()
  })
);
async function getCookieHeader() {
  var _a;
  const h = await headers();
  return (_a = h.get("cookie")) != null ? _a : void 0;
}
var onRedirect = (url) => {
  redirect(url);
};
async function toGetFlowParameter(params) {
  var _a, _b;
  return {
    id: (_b = (_a = (await params)["flow"]) == null ? void 0 : _a.toString()) != null ? _b : "",
    cookie: await getCookieHeader()
  };
}
async function getPublicUrl() {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}
function startNewFlow(params, flowType, baseUrl) {
  return redirect(
    new URL(
      "/self-service/" + flowType.toString() + "/browser?" + urlQueryToSearchParams(params).toString(),
      baseUrl
    ).toString(),
    RedirectType.replace
  );
}
function stringifyUrlQueryParam(param) {
  if (typeof param === "string") {
    return param;
  }
  if (typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
    return String(param);
  } else {
    return "";
  }
}
function urlQueryToSearchParams(query) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, stringifyUrlQueryParam(item));
      }
    } else {
      searchParams.set(key, stringifyUrlQueryParam(value));
    }
  }
  return searchParams;
}

// src/utils/rewrite.ts
function rewriteJsonResponse(obj, proxyUrl) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          key,
          value.map((item) => {
            if (typeof item === "object" && item !== null) {
              return rewriteJsonResponse(item, proxyUrl);
            } else if (typeof item === "string" && proxyUrl) {
              return item.replaceAll(orySdkUrl(), proxyUrl);
            }
            return item;
          }).filter((item) => item !== void 0)
        ];
      } else if (typeof value === "object" && value !== null) {
        return [key, rewriteJsonResponse(value, proxyUrl)];
      } else if (typeof value === "string" && proxyUrl) {
        return [key, value.replaceAll(orySdkUrl(), proxyUrl)];
      }
      return [key, value];
    })
  );
}

// src/utils/utils.ts
function onValidationError(value) {
  return value;
}

// src/app/flow.ts
async function getFlowFactory(params, fetchFlowRaw, flowType, baseUrl, route, options = { disableRewrite: false }) {
  const onRestartFlow = (useFlowId) => {
    if (!useFlowId) {
      return startNewFlow(params, flowType, baseUrl);
    }
    const redirectTo = new URL(route, baseUrl);
    redirectTo.search = new URLSearchParams({
      ...params,
      flow: useFlowId
    }).toString();
    return redirect(redirectTo.toString(), RedirectType.replace);
  };
  if (!params["flow"]) {
    return onRestartFlow();
  }
  try {
    const rawResponse = await fetchFlowRaw();
    return await rawResponse.value().then(
      (v) => options.disableRewrite ? v : rewriteJsonResponse(v, baseUrl)
    );
  } catch (error) {
    const errorHandler = handleFlowError({
      onValidationError,
      onRestartFlow,
      onRedirect
    });
    return await errorHandler(error);
  }
}

// src/app/login.ts
async function getLoginFlow(config, params) {
  return getFlowFactory(
    await params,
    async () => serverSideFrontendClient().getLoginFlowRaw(
      await toGetFlowParameter(params),
      initOverrides
    ),
    FlowType.Login,
    await getPublicUrl(),
    config.project.login_ui_url
  );
}
async function getRegistrationFlow(config, params) {
  return getFlowFactory(
    await params,
    async () => serverSideFrontendClient().getRegistrationFlowRaw(
      await toGetFlowParameter(params),
      initOverrides
    ),
    FlowType.Registration,
    await getPublicUrl(),
    config.project.registration_ui_url
  );
}
async function getRecoveryFlow(config, params) {
  return getFlowFactory(
    await params,
    async () => serverSideFrontendClient().getRecoveryFlowRaw(
      await toGetFlowParameter(params),
      initOverrides
    ),
    FlowType.Recovery,
    await getPublicUrl(),
    config.project.recovery_ui_url
  );
}
async function getVerificationFlow(config, params) {
  return getFlowFactory(
    await params,
    async () => serverSideFrontendClient().getVerificationFlowRaw(
      await toGetFlowParameter(params),
      initOverrides
    ),
    FlowType.Verification,
    await getPublicUrl(),
    config.project.verification_ui_url
  );
}
async function getSettingsFlow(config, params) {
  return getFlowFactory(
    await params,
    async () => serverSideFrontendClient().getSettingsFlowRaw(
      await toGetFlowParameter(params),
      initOverrides
    ),
    FlowType.Settings,
    await getPublicUrl(),
    config.project.settings_ui_url
  );
}
async function getLogoutFlow({
  returnTo
} = {}) {
  var _a;
  const h = await headers();
  const url = await getPublicUrl();
  return serverSideFrontendClient().createBrowserLogoutFlow({
    cookie: (_a = h.get("cookie")) != null ? _a : "",
    returnTo
  }).then((v) => rewriteJsonResponse(v, url));
}

// src/app/session.ts
async function getServerSession() {
  const cookie = await getCookieHeader();
  return serverSideFrontendClient().toSession({
    cookie
  }).catch(() => null);
}

export { getFlowFactory, getLoginFlow, getLogoutFlow, getRecoveryFlow, getRegistrationFlow, getServerSession, getSettingsFlow, getVerificationFlow };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map