'use strict';

var clientFetch = require('@ory/client-fetch');
var react = require('react');
var router = require('next/router');
var navigation = require('next/navigation');
require('cookie');
require('set-cookie-parser');
require('psl');

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
function isProduction() {
  const env = getEnv("VERCEL_ENV") || getEnv("NODE_ENV") || "";
  return ["production", "prod"].indexOf(env) > -1;
}
function guessPotentiallyProxiedOrySdkUrl(options) {
  if (getEnv("VERCEL_ENV")) {
    if (!isProduction() && getEnv("VERCEL_URL")) {
      return `https://${getEnv("VERCEL_URL")}`.replace(/\/$/, "");
    }
    const productionUrl = getEnv("VERCEL_PROJECT_PRODUCTION_URL") || "";
    if (isProduction() && productionUrl.indexOf("vercel.app") > -1) {
      return `https://${productionUrl}`.replace(/\/$/, "");
    }
    if (process.env["__NEXT_PRIVATE_ORIGIN"]) {
      return process.env["__NEXT_PRIVATE_ORIGIN"].replace(/\/$/, "");
    }
  }
  if (isProduction()) {
    return orySdkUrl();
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

// src/pages/client.ts
var clientSideFrontendClient = () => new clientFetch.FrontendApi(
  new clientFetch.Configuration({
    headers: {
      Accept: "application/json"
    },
    credentials: "include",
    basePath: guessPotentiallyProxiedOrySdkUrl({
      knownProxiedUrl: window.location.origin
    })
  })
);
function onValidationError(value) {
  return value;
}
var toBrowserEndpointRedirect = (params, flowType) => guessPotentiallyProxiedOrySdkUrl({
  knownProxiedUrl: window.location.origin
}) + "/self-service/" + flowType.toString() + "/browser?" + new URLSearchParams(params).toString();
var handleRestartFlow = (searchParams, flowType) => () => {
  window.location.assign(toBrowserEndpointRedirect(searchParams, flowType));
};
function useOnRedirect() {
  const router$1 = router.useRouter();
  return (url, external) => {
    if (external) {
      window.location.assign(url);
    } else {
      void router$1.push(url);
    }
  };
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
              return rewriteJsonResponse(item);
            }
            return item;
          }).filter((item) => item !== void 0)
        ];
      } else if (typeof value === "object" && value !== null) {
        return [key, rewriteJsonResponse(value)];
      } else ;
      return [key, value];
    })
  );
}

// src/utils/utils.ts
function toValue(res) {
  return res.value().then((v) => rewriteJsonResponse(v));
}

// src/pages/flow.ts
function createUseFlowFactory(flowType, createFlow, getFlow) {
  return () => {
    const [flow, setFlow] = react.useState();
    const router$1 = router.useRouter();
    const searchParams = navigation.useSearchParams();
    const onRestartFlow = handleRestartFlow(searchParams, flowType);
    const onRedirect = useOnRedirect();
    const errorHandler = clientFetch.handleFlowError({
      onValidationError,
      onRestartFlow,
      onRedirect
    });
    const handleSetFlow = async (flow2) => {
      setFlow(flow2);
      await router$1.replace({
        query: { flow: flow2.id }
      });
      return;
    };
    react.useEffect(() => {
      const id = searchParams.get("flow");
      if (!router$1.isReady || flow !== void 0) {
        return;
      }
      if (!id) {
        createFlow(searchParams).then(toValue).then(handleSetFlow).catch(errorHandler);
        return;
      }
      getFlow(id).then(toValue).then(handleSetFlow).catch(errorHandler);
    }, [searchParams, router$1, router$1.isReady, flow]);
    return flow;
  };
}
var useRegistrationFlow = createUseFlowFactory(
  clientFetch.FlowType.Registration,
  (params) => {
    var _a, _b, _c, _d;
    return clientSideFrontendClient().createBrowserRegistrationFlowRaw({
      returnTo: (_a = params.get("return_to")) != null ? _a : void 0,
      loginChallenge: (_b = params.get("registration_challenge")) != null ? _b : void 0,
      afterVerificationReturnTo: (_c = params.get("after_verification_return_to")) != null ? _c : void 0,
      organization: (_d = params.get("organization")) != null ? _d : void 0
    });
  },
  (id) => clientSideFrontendClient().getRegistrationFlowRaw({ id })
);
var useVerificationFlow = createUseFlowFactory(
  clientFetch.FlowType.Verification,
  (params) => {
    var _a;
    return clientSideFrontendClient().createBrowserVerificationFlowRaw({
      returnTo: (_a = params.get("return_to")) != null ? _a : void 0
    });
  },
  (id) => clientSideFrontendClient().getVerificationFlowRaw({ id })
);
var useRecoveryFlow = createUseFlowFactory(
  clientFetch.FlowType.Recovery,
  (params) => {
    var _a;
    return clientSideFrontendClient().createBrowserRecoveryFlowRaw({
      returnTo: (_a = params.get("return_to")) != null ? _a : void 0
    });
  },
  (id) => clientSideFrontendClient().getRecoveryFlowRaw({ id })
);
var useLoginFlow = createUseFlowFactory(
  clientFetch.FlowType.Login,
  (params) => {
    var _a, _b, _c, _d, _e, _f;
    return clientSideFrontendClient().createBrowserLoginFlowRaw({
      refresh: params.get("refresh") === "true",
      aal: (_a = params.get("aal")) != null ? _a : void 0,
      returnTo: (_b = params.get("return_to")) != null ? _b : void 0,
      cookie: (_c = params.get("cookie")) != null ? _c : void 0,
      loginChallenge: (_d = params.get("login_challenge")) != null ? _d : void 0,
      organization: (_e = params.get("organization")) != null ? _e : void 0,
      via: (_f = params.get("via")) != null ? _f : void 0
    });
  },
  (id) => clientSideFrontendClient().getLoginFlowRaw({ id })
);
var useSettingsFlow = createUseFlowFactory(
  clientFetch.FlowType.Settings,
  (params) => {
    var _a, _b;
    return clientSideFrontendClient().createBrowserSettingsFlowRaw({
      returnTo: (_a = params.get("return_to")) != null ? _a : void 0,
      cookie: (_b = params.get("cookie")) != null ? _b : void 0
    });
  },
  (id) => clientSideFrontendClient().getSettingsFlowRaw({ id })
);
function useLogoutFlow() {
  const [flow, setFlow] = react.useState(void 0);
  const createFlow = async () => {
    const flow2 = await clientSideFrontendClient().createBrowserLogoutFlow({});
    setFlow(flow2);
  };
  react.useEffect(() => {
    if (!flow) {
      void createFlow();
    }
  }, []);
  return flow;
}

exports.useLoginFlow = useLoginFlow;
exports.useLogoutFlow = useLogoutFlow;
exports.useRecoveryFlow = useRecoveryFlow;
exports.useRegistrationFlow = useRegistrationFlow;
exports.useSettingsFlow = useSettingsFlow;
exports.useVerificationFlow = useVerificationFlow;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map