import * as react_jsx_runtime from 'react/jsx-runtime';
import { OryCardContentProps, OryCardProps, OryNodeSsoButtonProps, OryFormRootProps, OryMessageContentProps, OryFlowComponentOverrides, OryFlowComponents, OryClientConfiguration } from '@ory/elements-react';
import * as react from 'react';
import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { FlowError, GenericError, Session, LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow, VerificationFlow, OAuth2ConsentRequest } from '@ory/client-fetch';

/**
 * Simply renders the children passed to it.
 *
 * @param props - pass children to render instead of the default Ory Card components
 * @returns
 * @group Components
 * @category Default Components
 */
declare function DefaultCardContent({ children }: OryCardContentProps): react.ReactNode;

/**
 * DefaultCardFooter renders the default footer for the card component based on the current flow type.
 *
 * @returns The default card footer component that renders the appropriate footer based on the current flow type.
 * @group Components
 * @category Default Components
 */
declare function DefaultCardFooter(): react_jsx_runtime.JSX.Element | null;

/**
 * Renders the default card header component.
 *
 * This component is used to display the header of a card, including the logo, title, description, and current identifier button.
 *
 * @returns the default card header component
 * @group Components
 * @category Default Components
 */
declare function DefaultCardHeader(): react_jsx_runtime.JSX.Element;

/**
 * The DefaultCardLogo component renders the logo from the {@link @ory/elements-react!OryProvider} or falls back to the project name.
 *
 * @returns the default logo for the Ory Card component.
 * @group Components
 * @category Default Components
 * @see {@link @ory/elements-react!OryProvider}
 * @see {@link @ory/elements-react!OryElementsConfiguration}
 */
declare function DefaultCardLogo(): react_jsx_runtime.JSX.Element;

/**
 * The `DefaultCurrentIdentifierButton` component renders a button that displays the current identifier
 *
 * The button can be used to restart the flow with the current identifier if appropriate.
 *
 * @returns
 * @group Components
 * @category Default Components
 */
declare function DefaultCurrentIdentifierButton(): react_jsx_runtime.JSX.Element | null;

/**
 * The DefaultCard component is a styled container that serves as the main card layout for Ory Elements.
 *
 * @param props - The properties for the DefaultCard component.
 * @returns
 * @group Components
 * @category Default Components
 */
declare function DefaultCard({ children, className, ...rest }: OryCardProps & ComponentPropsWithoutRef<"div">): react_jsx_runtime.JSX.Element;

/**
 * Props for the DefaultButtonSocial component.
 *
 * @inline
 * @hidden
 */
interface DefaultSocialButtonProps extends OryNodeSsoButtonProps {
    /**
     * Logos to use for the social buttons.
     * If not provided, the default logos will be used.
     */
    logos?: Record<string, ElementType>;
}
/**
 * The default implementation of a social button for Ory SSO.
 * It renders a button with a logo and an optional label.
 *
 * @param props - The props for the DefaultButtonSocial component.
 * @returns
 * @category Default Components
 * @group Components
 * @inlineType OryNodeSsoButtonProps
 */
declare function DefaultButtonSocial({ node, logos: providedLogos, isSubmitting, buttonProps, provider, attributes, }: DefaultSocialButtonProps): react_jsx_runtime.JSX.Element;
declare namespace DefaultButtonSocial {
    var WithLogos: (logos: Record<string, ElementType>) => (props: DefaultSocialButtonProps) => react_jsx_runtime.JSX.Element;
}

/**
 * The default form container for Ory Elements.
 *
 * @param props - The properties for the DefaultFormContainer component.
 * @returns
 * @group Components
 * @category Default Components
 */
declare function DefaultFormContainer({ children, onSubmit, action, method, }: PropsWithChildren<OryFormRootProps>): react_jsx_runtime.JSX.Element;
/**
 * The default message container for Ory Elements.
 *
 * @param props - The properties for the DefaultMessageContainer component.
 * @returns
 * @group Components
 * @category Default Components
 */
declare function DefaultMessageContainer({ children }: PropsWithChildren): react_jsx_runtime.JSX.Element | null;
/**
 * The default message component for Ory Elements.
 *
 * @param props - The properties for the DefaultMessage component.
 * @returns
 * @group Components
 * @category Default Components
 * @see {@link @ory/elements-react!uiTextToFormattedMessage}
 */
declare function DefaultMessage({ message }: OryMessageContentProps): react_jsx_runtime.JSX.Element;

/**
 * Merges the default Ory components with any provided overrides.
 *
 * The output of this function is a complete set of components that can be used in Ory flows.
 *
 * @param overrides - Optional overrides for the default components.
 * @returns
 *
 * @category Utilities
 */
declare function getOryComponents(overrides?: OryFlowComponentOverrides): OryFlowComponents;

/**
 * A union type of all possible errors that can be returned by the Ory SDK.
 * @hidden
 * @inline
 */
type OryError = FlowError | OAuth2Error | {
    error: GenericError;
};
/**
 * An OAuth2 error response.
 * @hidden
 * @inline
 */
type OAuth2Error = {
    error: string;
    error_description: string;
};
/**
 * Props for the Error component.
 *
 * @inline
 * @hidden
 */
type ErrorFlowContextProps = {
    /**
     * The error object returned by the Ory SDK.
     * This can be a FlowError, OAuth2Error, or a GenericError.
     */
    error: OryError;
    /**
     * The components to override the default ones.
     * This allows you to customize the appearance and behavior of the error flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     * This object contains the configuration for the Ory client, such as the base URL and project information.
     */
    config: OryClientConfiguration;
    /**
     * The session object, if available.
     * This is used to determine if the user is logged in and to provide appropriate actions.
     */
    session?: Session;
};
/**
 * The Error component is used to display an error message to the user.
 *
 * @param props - The props for the Error component.
 * @returns
 * @group Components
 * @category Flows
 */
declare function Error({ error, components: Components, config, session, }: ErrorFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Login component.
 *
 * @inline
 * @hidden
 */
type LoginFlowContextProps = {
    /**
     * The login flow object containing the state and data for the login process.
     */
    flow: LoginFlow;
    /**
     * Optional components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the login flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL and other settings.
     */
    config: OryClientConfiguration;
    /**
     * Optional children to render
     *
     * If not provided, the default OrySelfServiceFlowCard will be rendered.
     */
    children?: React.ReactNode;
};
/**
 * The `Login` component is used to render the login flow in Ory Elements.
 *
 * It provides the necessary context and components for the login flow, allowing you to customize the appearance and behavior of the login form.
 *
 * @param props - The props for the Login component.
 * @group Components
 * @category Flows
 */
declare function Login({ flow, config, children, components: flowOverrideComponents, }: LoginFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Recovery component.
 * @inline
 * @hidden
 */
type RecoveryFlowContextProps = {
    /**
     * The recovery flow object containing the state and data for the recovery process.
     */
    flow: RecoveryFlow;
    /**
     * Optional components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the recovery flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL and other settings.
     */
    config: OryClientConfiguration;
    /**
     * Optional children to render
     *
     * If not provided, the default OrySelfServiceFlowCard will be rendered.
     */
    children?: React.ReactNode;
};
/**
 * The `Recovery` component is used to render the recovery flow in Ory Elements.
 *
 * @param props - The props for the Recovery component.
 * @returns the recovery flow component.
 * @group Components
 * @category Flows
 */
declare function Recovery({ flow, config, children, components: flowOverrideComponents, }: RecoveryFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Registration component.
 *
 * @inline
 * @hidden
 */
type RegistrationFlowContextProps = {
    /**
     * The registration flow object containing the state and data for the registration process.
     */
    flow: RegistrationFlow;
    /**
     * Optional components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the registration flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL and other settings.
     */
    config: OryClientConfiguration;
    /**
     * Optional children to render
     *
     * If not provided, the default OrySelfServiceFlowCard will be rendered.
     */
    children?: React.ReactNode;
};
/**
 * The `Registration` component is used to render the registration flow in Ory Elements.
 *
 * @param props - The props for the Registration component.
 * @returns
 * @group Components
 * @category Flows
 */
declare function Registration({ flow, children, components: flowOverrideComponents, config, }: RegistrationFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Settings component.
 *
 * @inline
 * @hidden
 */
type SettingsFlowContextProps = {
    /**
     * The settings flow object containing the state and data for the settings process.
     */
    flow: SettingsFlow;
    /**
     * Optional components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the settings flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL and other settings.
     */
    config: OryClientConfiguration;
    /**
     * Optional children to render
     *
     * If not provided, the default OrySettingsCard will be rendered.
     */
    children?: React.ReactNode;
} & ComponentPropsWithoutRef<"div">;
/**
 * The `Settings` component is used to render the settings flow in Ory Elements.
 *
 * It provides the necessary context and components for the settings flow, allowing you to customize the appearance and behavior of the settings form.
 *
 * @param props - The props for the Settings component.
 * @group Components
 * @category Flows
 */
declare function Settings({ flow, config, children, components: flowOverrideComponents, className, ...rest }: SettingsFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Verification component.
 *
 * @inline
 * @hidden
 */
type VerificationFlowContextProps = {
    /**
     * The verification flow object containing the state and data for the verification process.
     */
    flow: VerificationFlow;
    /**
     * Optional components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the verification flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL and other settings.
     */
    config: OryClientConfiguration;
    /**
     * Optional children to render
     *
     * If not provided, the default OrySelfServiceFlowCard will be rendered.
     */
    children?: React.ReactNode;
};
/**
 * The `Verification` component is used to render the verification flow in Ory Elements.
 *
 * It provides the necessary context and components for the verification flow, allowing you to customize the appearance and behavior of the verification form.
 *
 * @param props - The props for the Verification component.
 * @group Components
 * @category Flows
 */
declare function Verification({ flow, config, children, components: flowOverrideComponents, }: VerificationFlowContextProps): react_jsx_runtime.JSX.Element;

/**
 * All the props that are passed to the Consent component.
 *
 * @hidden
 * @inline
 */
type ConsentFlowProps = {
    /**
     * The OAuth2 consent request object.
     */
    consentChallenge: OAuth2ConsentRequest;
    /**
     * The session object.
     *
     * Since the consent flow is used in the context of a logged-in user, the session object is required.
     * It contains information about the user, such as their ID and any associated metadata.
     * This information is used to accept or reject the consent request based on the user's preferences.
     * The session object is typically obtained from the Ory Kratos session API.
     */
    session: Session;
    /**
     * The Ory client configuration object.
     *
     * This object contains the configuration for the Ory client, such as the base URL
     */
    config: OryClientConfiguration;
    /**
     * The CSRF token to protect against CSRF attacks.
     *
     * This token is used to prevent cross-site request forgery attacks by ensuring that the request
     * is coming from the same origin as the consent flow.
     */
    csrfToken: string;
    /**
     * The URL to submit the consent form to.
     *
     * This URL is typically an endpoint on the server that handles the consent request.
     *
     * Make sure that this endpoint handles CSRF protection. During the form submission
     * the Consent component will send along the CSRF token passed in the props.
     * The server should validate this token before processing the consent request.
     */
    formActionUrl: string;
    /**
     * The components to override the default ones.
     *
     * This allows you to customize the appearance and behavior of the consent flow.
     */
    components?: OryFlowComponentOverrides;
    /**
     * Optional children to render inside the Consent component.
     *
     * If not provided, the default OryConsentCard will be rendered.
     */
    children?: React.ReactNode;
};
/**
 * The Consent component allows you to render the consent flow for Ory OAuth2.
 *
 * It is used to request user consent for accessing their data and resources.
 * The component takes in the OAuth2 consent request object, the session object,
 * the Ory client configuration, a CSRF token, and the URL to submit the consent form to.
 *
 * @param props - The props for the Consent component.
 * @returns the Consent component.
 * @group Components
 * @category Flows
 */
declare function Consent({ consentChallenge, session, config, components: Passed, children, csrfToken, formActionUrl, }: ConsentFlowProps): react_jsx_runtime.JSX.Element;

export { Consent, type ConsentFlowProps, DefaultButtonSocial, DefaultCard, DefaultCardContent, DefaultCardFooter, DefaultCardHeader, DefaultCardLogo, DefaultCurrentIdentifierButton, DefaultFormContainer, DefaultMessage, DefaultMessageContainer, Error, type ErrorFlowContextProps, Login, type LoginFlowContextProps, type OAuth2Error, type OryError, Recovery, type RecoveryFlowContextProps, Registration, Settings, type SettingsFlowContextProps, Verification, type VerificationFlowContextProps, getOryComponents };
