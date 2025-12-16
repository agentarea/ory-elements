import { UiNode, UiNodeInputAttributes, UiNodeTextAttributes, UiNodeImageAttributes, UiNodeAnchorAttributes, UiNodeScriptAttributes, UiNodeDivisionAttributes, UiText, FlowType, LoginFlow, RegistrationFlow, RecoveryFlow, VerificationFlow, SettingsFlow, UiContainer, OAuth2ConsentRequest, Session, FlowError, ConfigurationParameters, AccountExperienceConfiguration, UpdateLoginFlowBody, UpdateRegistrationFlowBody, UpdateVerificationFlowBody, UpdateRecoveryFlowBody, UpdateSettingsFlowBody, OnRedirectHandler, UiNodeGroupEnum, FrontendApi } from '@ory/client-fetch';
import { ComponentPropsWithoutRef, PropsWithChildren, FormEventHandler, MouseEventHandler, ComponentType, ReactNode, Dispatch } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { IntlShape, useIntl } from 'react-intl';

type UiNodeInput = UiNode & {
    type: "input";
    attributes: UiNodeInputAttributes;
};
declare function isUiNodeInput(node: UiNode): node is UiNodeInput;
type UiNodeImage = UiNode & {
    type: "img";
    attributes: UiNodeImageAttributes;
};
declare function isUiNodeImage(node: UiNode): node is UiNodeImage;
type UiNodeAnchor = UiNode & {
    type: "a";
    attributes: UiNodeAnchorAttributes;
};
declare function isUiNodeAnchor(node: UiNode): node is UiNodeAnchor;
type UiNodeText = UiNode & {
    type: "text";
    attributes: UiNodeTextAttributes;
};
declare function isUiNodeText(node: UiNode): node is UiNodeText;
type UiNodeScript = UiNode & {
    type: "script";
    attributes: UiNodeScriptAttributes;
};
declare function isUiNodeScript(node: UiNode): node is UiNodeScript;
type UiNodeDiv = UiNode & {
    type: "div";
    attributes: UiNodeDivisionAttributes;
};
declare function isUiNodeDiv(node: UiNode): node is UiNodeDiv;
type UiNodeFixed = UiNodeInput | UiNodeImage | UiNodeAnchor | UiNodeText | UiNodeScript | UiNodeDiv;

type OryNodeButtonButtonProps = {
    type: "button" | "submit" | "reset";
    name: string;
    value: string | number | readonly string[] | undefined;
    onClick: (event: any) => void;
    disabled?: boolean;
};
type OryNodeButtonProps = {
    /** @deprecated Use node.attributes instead. */
    attributes: UiNodeInputAttributes;
    node: UiNodeInput;
    /**
     * Indicates whether the form is currently being submitted via this button.
     */
    isSubmitting: boolean;
    buttonProps: OryNodeButtonButtonProps;
};
/**
 * Props for the OryNodeSsoButton component.
 */
type OryNodeSsoButtonProps = {
    node: UiNodeInput;
    /** @deprecated Use node.attributes instead. */
    attributes: UiNodeInputAttributes;
    provider: string;
    isSubmitting: boolean;
    buttonProps: OryNodeButtonButtonProps;
};
type OryNodeAnchorProps = {
    attributes: UiNodeAnchorAttributes;
    node: UiNode;
} & Omit<ComponentPropsWithoutRef<"a">, "children">;
type OryNodeLabelProps = {
    /** @deprecated Use node.attributes instead. */
    attributes: UiNodeInputAttributes;
    node: UiNodeInput;
    fieldError?: object;
} & PropsWithChildren;
type OryNodeTextProps = {
    node: UiNodeText;
    /**
     * @deprecated Use node.attributes instead.
     */
    attributes: UiNodeTextAttributes;
};
type OryCardLogoProps = Record<string, never>;
type OryNodeCaptchaProps = {
    node: UiNode;
};
/**
 * Props for the Form.Group component.
 */
type OryFormGroupProps = PropsWithChildren;
/**
 * Props for the AuthMethodListItem component. This component is used
 * to render a single auth method in the AuthMethodList component.
 */
type OryCardAuthMethodListItemProps = {
    onClick: () => void;
    group: string;
    title?: {
        id: string;
        values?: Record<string, string>;
    };
    disabled?: boolean;
};
type OryNodeImageProps = {
    /** @deprecated Use node.attributes instead. */
    attributes: UiNodeImageAttributes;
    node: UiNodeImage;
};
/**
 * A generic type for the form values.
 */
type FormValues = Record<string, string | boolean | number | undefined>;
/**
 * Props for the Form.Root component.
 */
type OryFormRootProps = ComponentPropsWithoutRef<"form"> & {
    onSubmit: FormEventHandler<HTMLFormElement>;
};
type OryNodeCheckboxInputProps = {
    name: string;
    onChange: (event: any) => void;
    disabled?: boolean;
    type: "checkbox";
    checked: boolean;
    value: string | number | readonly string[] | undefined;
    ref: (instance: any) => void;
};
type OryNodeCheckboxProps = {
    /** @deprecated - use node.attributes */
    attributes: UiNodeInputAttributes;
    node: UiNodeInput;
    /** @deprecated - use inputProps.onClick */
    onClick: MouseEventHandler;
    inputProps: OryNodeCheckboxInputProps;
};
type OryNodeInputInputProps = {
    name: string;
    value: string | number | readonly string[] | undefined;
    onClick: MouseEventHandler;
    onChange: (event: any) => void;
    onBlur: () => void;
    ref: (instance: any) => void;
    disabled?: boolean;
    type: string;
    autoComplete?: string;
    maxLength?: number;
    placeholder: string;
};
type OryNodeInputProps = {
    /** @deprecated - use node.attributes */
    attributes: UiNodeInputAttributes;
    node: UiNodeInput;
    /** @deprecated - use inputProps.onClick */
    onClick?: MouseEventHandler;
    inputProps: OryNodeInputInputProps;
};
type OryNodeConsentScopeCheckboxProps = {
    attributes: UiNodeInputAttributes;
    node: UiNode;
    onCheckedChange: (checked: boolean) => void;
    inputProps: {
        name: string;
        disabled?: boolean;
        checked: boolean;
        value: string;
    };
};
type OryFormSectionContentProps = PropsWithChildren<{
    title?: string;
    description?: string;
}>;
type OryFormSectionFooterProps = PropsWithChildren<{
    text?: string;
}>;

type OryCardHeaderProps = Record<string, never>;
/**
 * Returns the header of the Ory Card.
 *
 * @returns The header of the Ory Card.
 * @group Components
 */
declare function OryCardHeader(): react_jsx_runtime.JSX.Element;

/**
 * @interface
 */
type OryCardRootProps = PropsWithChildren;
/**
 * The root component of the Ory Card.
 *
 * This can be used to build fully custom implementations of the Ory Flows.
 *
 * However, you most likely want to override the individual components instead.
 *
 * @param props - pass children to render instead of the default Ory Card components
 * @returns
 * @group Components
 */
declare function OryCard({ children }: PropsWithChildren): react_jsx_runtime.JSX.Element;

type OryCardFooterProps = Record<string, never>;
/**
 *
 * @returns The footer of a card component.
 * @group Components
 */
declare function OryCardFooter(): react_jsx_runtime.JSX.Element;

/**
 * Props for the OryCardContent component.
 */
type OryCardContentProps = PropsWithChildren;
/**
 * A component that renders the content of the Ory Card.
 * This is the main content of the card, such as the flow's form, with it's input fields and messages.
 *
 * You can use this component to build fully custom implementations of the Ory Flows.
 *
 * However, you most likely want to override the individual components instead.
 *
 * @param props - pass children to render instead of the default Ory Card components
 * @returns
 * @group Components
 */
declare function OryCardContent({ children }: OryCardContentProps): react_jsx_runtime.JSX.Element;

/**
 * The `OrySelfServiceFlowCard` component is an umbrella component that can render the self-service flows.
 *
 * Note: prefer using the {@link @ory/elements-react/theme!Login | <Login /> component}, etc. directly instead of this component.
 *
 * It renders different forms based on the current flow state, such as providing an identifier,
 * entering a password or one time code or selecting a method for authentication.
 *
 * The component must be use within an {@link OryProvider} that provides the flow context and components to use.
 *
 * @example
 * ```jsx
 * import { OrySelfServiceFlowCard } from "@ory/elements-react";
 *
 * function MyComponent() {
 *  return <OryProvider ...>
 *    <OrySelfServiceFlowCard />
 *  </OryProvider>;
 * }
 * ```
 *
 * @returns The Ory Two-Step Card component that renders different forms based on the current flow state.
 * @group Components
 */
declare function OrySelfServiceFlowCard(): react_jsx_runtime.JSX.Element;

/**
 * The `OryConsentCard` component renders a card for displaying the OAuth2 consent flow.
 *
 * @returns The consent card component.
 * @group Components
 */
declare function OryConsentCard(): react_jsx_runtime.JSX.Element;

/**
 * Props type for the Form Group Divider component.
 */
type OryCardDividerProps = Record<string, never>;
/**
 * Renders the {@link OryFlowComponents.Card.Divider} between the groups of nodes in the Ory Form.
 *
 * You can use this component to build fully custom implementations of the Ory Flows.
 *
 * However, you most likely want to override the individual components instead.
 *
 * @returns
 * @group Components
 */
declare function OryFormGroupDivider(): react_jsx_runtime.JSX.Element | null;

type OryPageHeaderProps = Record<never, never>;
/**
 * The OryPageHeader component renders the header of the page.
 *
 * Customize the header by providing a custom {@link OryFlowComponents.Page.Header} component in the `components` prop of the {@link OryProvider}.
 *
 * @returns a React component that renders the page header.
 * @group Components
 */
declare const OryPageHeader: () => react_jsx_runtime.JSX.Element;

/**
 * Renders the Ory Settings Card component.
 *
 * This component is used to display the settings flow for the user.
 * It utilizes the `useOryFlow` hook to access the current flow and renders the nodes with components
 * provided by the Ory Elements context.
 *
 * @returns The Ory Settings Card component that renders the settings flow.
 * @group Components
 */
declare function OrySettingsCard(): react_jsx_runtime.JSX.Element;

type OrySettingsRecoveryCodesProps = {
    codes: string[];
    regenerateButton: UiNodeInput | undefined;
    revealButton: UiNodeInput | undefined;
    onRegenerate: () => void;
    onReveal: () => void;
    isSubmitting: boolean;
};
type OrySettingsTotpProps = {
    totpImage: UiNodeImage | undefined;
    totpSecret: UiNodeText | undefined;
    totpInput: UiNodeInput | undefined;
    totpUnlink: UiNodeInput | undefined;
    onUnlink: () => void;
    isSubmitting: boolean;
};
/**
 * Props for a button used in the settings flow
 */
type OryNodeSettingsButton = {
    /** @deprecated - use buttonProps.onClick */
    onClick: () => void;
    buttonProps: OryNodeButtonButtonProps;
} & UiNodeInput;
type OrySettingsSsoProps = {
    linkButtons: OryNodeSettingsButton[];
    unlinkButtons: OryNodeSettingsButton[];
    isSubmitting: boolean;
};
type OrySettingsWebauthnProps = {
    nameInput: UiNodeInput;
    triggerButton: OryNodeSettingsButton;
    removeButtons: OryNodeSettingsButton[];
    isSubmitting: boolean;
};
type OrySettingsPasskeyProps = {
    triggerButton: OryNodeSettingsButton;
    removeButtons: OryNodeSettingsButton[];
    isSubmitting: boolean;
};

/**
 * Props for the OryMessageContent component.
 *
 * @interface
 */
type OryMessageContentProps = {
    /**
     * The message to display.
     */
    message: UiText;
};
/**
 *
 * @interface
 * @expand
 */
type OryMessageRootProps = PropsWithChildren;
/**
 * Props for the {@link OryCardValidationMessages} component.
 *
 * @inline
 * @hidden
 */
interface OryCardValidationMessagesProps {
    /**
     * An array of message IDs that should be hidden.
     * This is useful for hiding specific messages that are not relevant to the user or are rendered elsewhere.
     * If not provided, the default list of message IDs to hide will be used.
     * @default [1040009, 1060003, 1080003, 1010004, 1010014, 1040005, 1010016, 1010003]
     *
     * @see https://www.ory.sh/docs/kratos/concepts/ui-messages
     */
    hiddenMessageIds?: number[];
}
/**
 * Renders the {@link OryFlowComponents.Message.Content} component for each message in the current flow.
 *
 * See also {@link useOryFlow}
 * @returns
 * @group Components
 */
declare function OryCardValidationMessages({ hiddenMessageIds, }: OryCardValidationMessagesProps): react_jsx_runtime.JSX.Element | null;

/**
 * Props for the OrySettingsFormSection component.
 * This type extends the form element props but omits the `action`, `method`, and `onSubmit` properties.
 */
type OrySettingsFormProps = Omit<ComponentPropsWithoutRef<"form">, "action" | "method" | "onSubmit">;
/**
 * Props for the OrySettingsFormSection component.
 *
 * @inline
 * @hidden
 */
interface OryFormSectionProps extends PropsWithChildren, OrySettingsFormProps {
    nodes?: UiNode[];
}
interface OryCardSettingsSectionProps extends PropsWithChildren {
    action: string;
    method: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
}
/**
 * OrySettingsFormSection is a component that provides a form section for Ory settings.
 *
 * Can be used independently to render a form section with Ory nodes.
 *
 * @param props - The properties for the OrySettingsFormSection component.
 * @returns
 * @group Components
 */
declare function OrySettingsFormSection({ children, nodes, ...rest }: OryFormSectionProps): react_jsx_runtime.JSX.Element;

type OryFormSsoRootProps = PropsWithChildren<{
    nodes: UiNode[];
}>;
/**
 * Renders the flow's OIDC buttons.
 *
 * @returns a React component that renders the OIDC buttons.
 * @group Components
 */
declare function OryFormSsoButtons(): react_jsx_runtime.JSX.Element | null;
/**
 * The `OryFormSsoForm` component renders the Ory Form for SSO methods (OIDC and SAML).
 *
 * It needs to be its own form, as the OIDC buttons are form submits but are not related to the main form.
 *
 * @returns a React component that renders the Ory Form for SSO methods.
 * @group Components
 */
declare function OryFormSsoForm(): react_jsx_runtime.JSX.Element | null;

/**
 * A record of all the components that are used in the OryForm component.
 */
type OryFlowComponents = {
    Node: {
        /**
         * Button component, rendered whenever a button is encountered in the Ory UI Nodes.
         */
        Button: ComponentType<OryNodeButtonProps>;
        /**
         * The SsoButton component is rendered whenever a button of group "oidc" or "saml" node is encountered.
         *
         * It renders the "Login with Google", "Login with Facebook" etc. buttons.
         */
        SsoButton: ComponentType<OryNodeSsoButtonProps>;
        /**
         * Anchor component, rendered whenever an "anchor" node is encountered
         */
        Anchor: ComponentType<OryNodeAnchorProps>;
        /**
         * The Input component is rendered whenever a "input" node is encountered.
         */
        Input: ComponentType<OryNodeInputProps>;
        /**
         * Special version of the Input component for OTP codes.
         */
        CodeInput: ComponentType<OryNodeInputProps>;
        /**
         * The Image component is rendered whenever an "image" node is encountered.
         *
         * For example used in the "Logo" node.
         */
        Image: ComponentType<OryNodeImageProps>;
        /**
         * The Label component is rendered around Input components and is used to render form labels.
         */
        Label: ComponentType<OryNodeLabelProps>;
        /**
         * The Checkbox component is rendered whenever an input node with of boolean type is encountered.
         */
        Checkbox: ComponentType<OryNodeCheckboxProps>;
        /**
         * The Text component is rendered whenever a "text" node is encountered.
         */
        Text: ComponentType<OryNodeTextProps>;
        /**
         * The Captcha component is rendered whenever a "captcha" group is encountered.
         */
        Captcha: ComponentType<OryNodeCaptchaProps>;
        /**
         * Special version of the Input component for scopes in OAuth2 flows.
         */
        ConsentScopeCheckbox: ComponentType<OryNodeConsentScopeCheckboxProps>;
    };
    Card: {
        /**
         * The card container is the main container of the card.
         */
        Root: ComponentType<OryCardRootProps>;
        /**
         * The card footer is the footer of the card container.
         */
        Footer: ComponentType<OryCardFooterProps>;
        /**
         * The card header is the header of the card container.
         */
        Header: ComponentType<OryCardRootProps>;
        /**
         * The card content is the main content of the card container.
         */
        Content: ComponentType<OryCardContentProps>;
        /**
         * The card logo is the logo of the card container.
         */
        Logo: ComponentType<OryCardLogoProps>;
        /**
         * The HorizontalDivider component is rendered between groups.
         */
        Divider: ComponentType<OryCardDividerProps>;
        /**
         * The AuthMethodListContainer component is rendered around the "method" chooser step in the identifier_first login flow.
         *
         * This is only used, if login is configured to use identifier_first authentication.
         */
        AuthMethodListContainer: ComponentType<PropsWithChildren>;
        /**
         * The AuthMethodListItem component is rendered on the "method" chooser step in the identifier_first login flow.
         *
         * This is only used, if login is configured to use identifier_first authentication.
         */
        AuthMethodListItem: ComponentType<OryCardAuthMethodListItemProps>;
        /**
         * The SettingsSection component is rendered around each section of the settings.
         */
        SettingsSection: ComponentType<OryCardSettingsSectionProps>;
        /**
         * The SettingsSectionContent component is rendered around the content of each section of the settings.
         */
        SettingsSectionContent: ComponentType<OryFormSectionContentProps>;
        /**
         * The SettingsSectionFooter component is rendered around the footer of each section of the settings.
         */
        SettingsSectionFooter: ComponentType<OryFormSectionFooterProps>;
    };
    Form: {
        /**
         * The FormContainer component is the main container of the form.
         *
         * It should render its children.
         *
         * You most likely don't want to override this component directly.
         */
        Root: ComponentType<OryFormRootProps>;
        /**
         * A special form group container for the social buttons.
         *
         * This is required, because the social buttons need to be in its form, to not influence the other form groups.
         *
         * You most likely don't want to override this component directly.
         */
        SsoRoot: ComponentType<OryFormSsoRootProps>;
        /**
         * The FormGroup is rendered around each group of nodes in the UI nodes.
         */
        Group: ComponentType<OryFormGroupProps>;
        /**
         * The section on the settings page, rendering the OIDC settings
         */
        SsoSettings: ComponentType<OrySettingsSsoProps>;
        /**
         * The section on the settings page, rendering the Webauthn settings
         */
        WebauthnSettings: ComponentType<OrySettingsWebauthnProps>;
        /**
         * The section on the settings page, rendering the Passkey settings
         */
        PasskeySettings: ComponentType<OrySettingsPasskeyProps>;
        /**
         * The section on the settings page, rendering the TOTP settings
         */
        TotpSettings: ComponentType<OrySettingsTotpProps>;
        /**
         * The section on the settings page, rendering the recovery code settings
         */
        RecoveryCodesSettings: ComponentType<OrySettingsRecoveryCodesProps>;
    };
    Message: {
        /**
         * The MessageContainer is rendered around the messages.
         */
        Root: ComponentType<OryMessageRootProps>;
        /**
         * The Message component is rendered whenever a message is encountered.
         */
        Content: ComponentType<OryMessageContentProps>;
        /**
         * The Toast component is rendered for toast messages.
         *
         * Currently only used in the settings page to display messages.
         */
        Toast: ComponentType<OryToastProps>;
    };
    Page: {
        Header: ComponentType<OryPageHeaderProps>;
    };
};
type OryToastProps = {
    message: UiText;
    id: string | number;
};
/**
 * Makes the components in OryFlowComponents optional, so that you can override only the components you want to change.
 */
type OryFlowComponentOverrides = {
    [P in keyof OryFlowComponents]?: OryFlowComponents[P] extends object ? {
        [K in keyof OryFlowComponents[P]]?: OryFlowComponents[P][K];
    } : OryFlowComponents[P];
};
/**
 * The props for the OryForm component.
 * @inline
 * @hidden
 */
interface OryFormProps extends PropsWithChildren {
    /**
     * A callback function that is called after the form is submitted.
     *
     * It is always called after the form is submitted, unless the form submission is prevented by client side
     * validation or the API response dictated that the client should be redirected
     *
     * @param method - The method that was submitted.
     */
    onAfterSubmit?: (method: string | number | boolean | undefined) => void;
}
/**
 * The OryForm component is the main form container for Ory flows.
 *
 * It renders the form with the correct action and method, and handles the submission of the form.
 *
 * @param props - The props for the OryForm component.
 * @returns
 * @group Components
 */
declare function OryForm({ children, onAfterSubmit }: OryFormProps): react_jsx_runtime.JSX.Element;

type TextRendererProps = {
    node: UiNodeText;
};
declare function TextRenderer({ node }: TextRendererProps): react_jsx_runtime.JSX.Element;

type ImageRendererProps = {
    node: UiNodeImage;
};
declare function ImageRenderer({ node }: ImageRendererProps): react_jsx_runtime.JSX.Element;

type CheckboxRendererProps = {
    node: UiNodeInput;
};
declare function CheckboxRenderer({ node }: CheckboxRendererProps): react_jsx_runtime.JSX.Element;

type TextBasedInputProps = {
    node: UiNodeInput;
};
declare function InputRenderer({ node }: TextBasedInputProps): react_jsx_runtime.JSX.Element;

declare function ConsentCheckboxRenderer({ node }: {
    node: UiNodeInput;
}): react_jsx_runtime.JSX.Element;

type SsoButtonProps = {
    node: UiNodeInput;
};
declare function SSOButtonRenderer({ node }: SsoButtonProps): react_jsx_runtime.JSX.Element;

type ButtonRendererProps = {
    node: UiNodeInput;
};
declare function ButtonRenderer({ node }: ButtonRendererProps): react_jsx_runtime.JSX.Element;
/**
 * Renders the component passed for button nodes.
 *
 * @param props - The properties of the button node to render.
 * @returns A React element representing the button node.
 */
type ButtonRenderer = typeof ButtonRenderer;

type NodeProps = {
    node: UiNode;
};
/**
 * Use this component to render any UiNode. It will automatically pick the correct sub-component based on the node type and use any custom components provided via the ComponentsContext.
 *
 * Make sure to use this component instead of the custom component directly, to make sure it's integrated properly with the form system.
 *
 * @param props - NodeProps containing the UiNode to render
 * @returns A ReactNode rendering the appropriate component for the given UiNode
 * @group Components
 */
declare const Node: (({ node }: NodeProps) => ReactNode) & {
    Button: typeof ButtonRenderer;
    SsoButton: typeof SSOButtonRenderer;
    ConsentCheckbox: typeof ConsentCheckboxRenderer;
    Input: typeof InputRenderer;
    Checkbox: typeof CheckboxRenderer;
    Image: typeof ImageRenderer;
    Text: typeof TextRenderer;
};

/**
 * useResendCode provides a callback to trigger a code resend in the current flow.
 *
 * You may use this hook to implement a "Resend Code" button in your forms.
 *
 * If the current flow does not support code resending, `resendCodeNode` will be `undefined` and `resendCode` will be a no-op.
 *
 * Example:
 * ```tsx
 * const { resendCode, resendCodeNode } = useResendCode();
 *
 * return (
 *  {resendCodeNode && (
 *    <button onClick={resendCode}>Resend Code</button>
 *  )}
 * )
 * ```
 *
 * @returns the callback to trigger a code resend
 * @group Hooks
 */
declare function useResendCode(): {
    resendCode: () => void;
    resendCodeNode: UiNode | undefined;
};

/**
 * The `useComponents` hook provides access to the Ory Flow components provided in the `OryComponentProvider`.
 *
 * You can use this hook to access the components defined in the `components` prop of the `OryComponentProvider`.
 *
 * @returns the current component context value.
 * @group Hooks
 */
declare function useComponents(): OryFlowComponents;
/**
 * The `useNodeSorter` hook provides a way to access the node sorting function
 *
 * The node sorting function is used to determine the order of nodes in a flow based on their attributes and context.
 *
 * To customize the sorting behavior, you can provide a custom `nodeSorter` function to the `OryComponentProvider`.
 *
 * @returns a function that sorts nodes based on the provided context.
 * @group Hooks
 */
declare function useNodeSorter(): (a: UiNode, b: UiNode, ctx: {
    flowType: string;
}) => number;

/**
 * A flow container for the {@link LoginFlow}
 * @interface
 */
type LoginFlowContainer = {
    flowType: FlowType.Login;
    flow: LoginFlow;
};
/**
 * A flow container for the {@link RegistrationFlow}
 * @interface
 */
type RegistrationFlowContainer = {
    flowType: FlowType.Registration;
    flow: RegistrationFlow;
};
/**
 * A flow container for the {@link RecoveryFlow}
 * @interface
 */
type RecoveryFlowContainer = {
    flowType: FlowType.Recovery;
    flow: RecoveryFlow;
};
/**
 * A flow container for the {@link VerificationFlow}
 * @interface
 */
type VerificationFlowContainer = {
    flowType: FlowType.Verification;
    flow: VerificationFlow;
};
/**
 * A flow container for the {@link SettingsFlow}
 * @interface
 */
type SettingsFlowContainer = {
    flowType: FlowType.Settings;
    flow: SettingsFlow;
};
/**
 * A flow container for the {@link FlowError}
 * @interface
 */
type ErrorFlowContainer = {
    flowType: FlowType.Error;
    flow: FlowError;
};
/**
 * A flow container for the OAuth2 consent flow
 *
 * Note: This is a polyfill for the OAuth2 consent flow, which is not yet implemented in the Ory SDK.
 * It tries to mirror the structure of the other flow containers as closely as possible.
 * @interface
 */
type ConsentFlow = {
    /**
     * When the flow was created.
     */
    created_at: Date;
    /**
     * When the flow expires.
     */
    expires_at: Date;
    /**
     * Always "UNSET" as the consent flow does not have a specific ID.
     */
    id: "UNSET";
    /**
     * When the flow was issued.
     */
    issued_at: Date;
    /**
     * The state of the consent flow.
     *
     * - "show_form": The form is being shown to the user.
     * - "rejected": The user has rejected the consent request.
     * - "accepted": The user has accepted the consent request.
     */
    state: "show_form" | "rejected" | "accepted";
    /**
     * The active part of the flow, which is always "oauth2_consent" for this flow.
     */
    active: "oauth2_consent";
    ui: UiContainer;
    consent_request: OAuth2ConsentRequest;
    session: Session;
    return_to?: string;
};
/**
 * A flow container for the OAuth2 {@link ConsentFlow}
 * @interface
 */
type ConsentFlowContainer = {
    flowType: FlowType.OAuth2Consent;
    flow: ConsentFlow;
};
/**
 * A union type of all flow containers
 */
type OryFlowContainer = LoginFlowContainer | RegistrationFlowContainer | RecoveryFlowContainer | VerificationFlowContainer | SettingsFlowContainer | ConsentFlowContainer;

type LocaleMap = Record<string, Record<string, string>>;
declare const OryLocales: LocaleMap;

type Locale = keyof typeof OryLocales;

/**
 * The configuration for internationalization (i18n) in Ory Elements.
 *
 * This configuration is used to set the locale and can be used to provide custom translations.
 * The locale is used to determine the language of the UI.
 */
type IntlConfig = {
    /**
     * The locale to use for internationalization.
     *
     * @defaultValue "en"
     */
    locale: Locale;
    /**
     * Provide custom translations for the UI.
     */
    customTranslations?: Partial<LocaleMap>;
};
/**
 * The configuration for Ory Elements.
 *
 * This configuration is used to customize the behavior and appearance of Ory Elements.
 *
 * By setting UI urls, you can override the default URLs for the login, registration, recovery, and verification flows.
 *
 * You can also set the name of the application, the logo URL, and the SDK configuration.
 * By default, the name and logo are displayed in the card's header.
 */
interface OryClientConfiguration {
    /**
     * The SDK configuration.
     * This configuration is used to set the URL of the Ory SDK and any additional options used for the SDK client.
     */
    sdk?: {
        /**
         * The URL the Ory SDK should connect to.
         * This is typically the base URL of your Ory instance.
         */
        url?: string;
        /**
         * Additional parameters for the Ory SDK configuration.
         * This can include options like headers, credentials, and other settings.
         */
        options?: Partial<ConfigurationParameters>;
    };
    /**
     * The internationalization configuration.
     * This configuration is used to set the locale and any additional options used for the i18n library.
     * The locale is used to determine the language of the UI.
     * The default locale is "en".
     */
    intl?: IntlConfig;
    /**
     * The configuration for the project.
     */
    project: AccountExperienceConfiguration;
}

/**
 * Converts a UiText to a FormattedMessage.
 * The UiText contains the id of the message and the context.
 * The context is used to inject values into the message from Ory, e.g. a timestamp.
 * For example a UI Node from Ory might look like this:
 *
 * ```json
 * {
 *  "type":"input",
 *  "group":"default",
 *  "attributes": {
 *      "name":"traits.email",
 *      "type":"email",
 *      "required":true,
 *      "autocomplete":"email",
 *      "disabled":false,
 *      "node_type":"input"
 *  },
 *  "messages":[],
 *  "meta": {
 *    "label": {
 *      "id":1070002,
 *      "text":"E-Mail",
 *      "type":"info",
 *      "context":{
 *        "title":"E-Mail"
 *      },
 *    }
 *  }
 * }
 * ```
 *
 * The context has the key "title" which matches the formatter template name "\{title\}"
 * An example translation file would look like this:
 * ```json
 * {
 *  "identities.messages.1070002": "{title}"
 * }
 * ```
 *
 * The formatter would then take the meta.label.id and look for the translation with the key matching the id.
 * It would then replace the template "\{title\}" with the value from the context with the key "title".
 *
 * @param uiText - The UiText is part of the UiNode object sent by Kratos when performing a flow.
 * @param intl - The intl object from react-intl
 * @group Utilities
 */
declare const uiTextToFormattedMessage: ({ id, context, text }: Omit<UiText, "type">, intl: IntlShape) => string;
declare function resolvePlaceholder(text: UiText, intl: ReturnType<typeof useIntl>): string;

/**
 * Props for the submit handler
 */
type OnSubmitHandlerProps<T extends UpdateLoginFlowBody | UpdateRegistrationFlowBody | UpdateVerificationFlowBody | UpdateRecoveryFlowBody | UpdateSettingsFlowBody> = {
    /**
     * This method is used to update the flow container when a validation error occurs, for example.
     */
    setFlowContainer: (flowContainer: OryFlowContainer) => void;
    /**
     * The form values to submit.
     */
    body: T;
    /**
     * This method is used to redirect the user to a different page.
     */
    onRedirect: OnRedirectHandler;
};

/**
 * Helper function to generate a test id for a UiText message.
 *
 * @param message - the UiText message to generate a test id for
 * @returns a unique, stable test id for the message
 * @group Utilities
 */
declare function messageTestId(message: {
    id: number | string;
}): {
    "data-testid": string;
};

/**
 * Represents the state of the form when selecting an authentication method.
 * This type is used when the user is in the process of selecting an authentication method
 * (e.g., password, passkey, etc.) during the login or registration flow.
 * @inline
 * @hidden
 */
type FormStateSelectMethod = {
    current: "select_method";
};
/**
 * Represents the state of the form when providing an identifier.
 * This type is used when the user is required to provide an identifier (e.g., email or username)
 * before proceeding with the authentication flow.
 * @inline
 * @hidden
 */
type FormStateProvideIdentifier = {
    current: "provide_identifier";
};
/**
 * Represents the state of the form when an authentication method is active.
 * This type is used when the user is interacting with a specific authentication method
 * (e.g., entering a password or entering a code received via email).
 *
 * The `method` field indicates which authentication method is currently active.
 * @inline
 * @hidden
 */
type FormStateMethodActive = {
    current: "method_active";
    method: UiNodeGroupEnum;
};
/**
 * Represents the state of the form based on the flow type and active method.
 * This type is used to determine which part of the form should be displayed.
 *
 * It can be one of the following:
 * - `select_method`: The user is selecting an authentication method.
 * - `provide_identifier`: The user is providing an identifier (e.g., email or username).
 * - `method_active`: An authentication method is active, and the user is interacting with it.
 * - `success_screen`: The flow has successfully completed (only used in the verification flow).
 * - `settings`: The user is in the settings flow.
 */
type FormState = FormStateSelectMethod | FormStateProvideIdentifier | FormStateMethodActive | {
    current: "success_screen";
} | {
    current: "settings";
};
/**
 * Represents the actions that can be dispatched to update the form state.
 * These actions are used to change the current state of the form based on user interactions or flow updates.
 */
type FormStateAction = {
    /**
     * Action to update the flow state.
     * This action is dispatched when the flow is updated, and it will parse the new flow
     * to determine the current form state.
     */
    type: "action_flow_update";
    /**
     * The updated flow container that contains the new flow data.
     */
    flow: OryFlowContainer;
} | {
    /**
     * Action to select an authentication method.
     * This action is dispatched when the user selects an authentication method
     * (e.g., password, passkey, etc.) from the available options.
     */
    type: "action_select_method";
    /**
     * The authentication method that the user has selected.
     */
    method: UiNodeGroupEnum;
} | {
    /**
     * Action to clear the active authentication method.
     * This action is dispatched when the user wants to clear the currently active method
     * and return to the method selection state.
     */
    type: "action_clear_active_method";
};

/**
 * Returns an object that contains the current flow and the flow type, as well as the configuration.
 *
 * @returns The current flow container
 * @group Hooks
 */
declare function useOryFlow(): FlowContextValue;
/**
 * Function to set the flow container.
 * @interface
 */
type FlowContainerSetter = Dispatch<OryFlowContainer>;
/**
 * The return value of the OryFlowContext.
 */
type FlowContextValue = OryFlowContainer & {
    /**
     * Function to set the flow container.
     */
    setFlowContainer: FlowContainerSetter;
    /**
     * The current form state.
     * @see FormState
     */
    formState: FormState;
    /**
     * Dispatch function to update the form state.
     */
    dispatchFormState: Dispatch<FormStateAction>;
};

/**
 * Props type for the OryProvider component.
 */
type OryProviderProps = {
    /**
     * The components to use for rendering Ory flows.
     * You can provide custom components to override the default Ory components.
     */
    components: OryFlowComponents;
    /**
     * The Ory client configuration.
     * This includes the SDK and project configuration.
     */
    config: OryClientConfiguration;
} & OryFlowContainer & PropsWithChildren;
/**
 * OryProvider is a React component that provides the necessary context for rendering Ory flows.
 *
 * It wraps the application in several context providers, including {@link OryConfigurationProvider}.
 *
 * You can use this component to set up the Ory SDK, provide custom translations, and specify the components to use for rendering Ory flows.
 *
 * @example
 * ```tsx
 * import { OryProvider, LoginFlow, OryFlowComponents, OryClientConfiguration } from "@ory/elements-react";
 *
 *
 * export type Props = {
 *   flow: LoginFlow
 *   components: OryFlowComponents
 *   config: OryClientConfiguration
 * }
 *
 * function App({
 *   flow,
 *   config,
 *   children,
 *   components,
 * }: PropsWithChildren<Props>) {
 *   return (
 *     <OryProvider
 *       config={config}
 *       flow={flow}
 *       flowType={FlowType.Login}
 *       components={components}
 *     >
 *       {children}
 *     </OryProvider>
 *   )
 * }
 *
 * ```
 *
 * @param props - The properties for the OryProvider component.
 * @returns
 * @group Components
 */
declare function OryProvider({ children, components: Components, config, ...oryFlowProps }: OryProviderProps): react_jsx_runtime.JSX.Element;

/**
 * The Ory Elements configuration object.
 *
 * @interface
 */
type OryElementsConfiguration = {
    /**
     * The Ory SDK configuration.
     * This includes the URL and options for the Ory SDK.
     */
    sdk: OrySDK;
    /**
     * The project configuration.
     * This includes the project name, URLs, and other settings for the Ory Elements project.
     */
    project: AccountExperienceConfiguration;
};
/**
 * The `useOryConfiguration` hook provides access to the Ory Elements configuration.
 *
 * This includes the SDK configuration and the project configuration. To customize the configuration, provide the `sdk` and `project` properties in the `OryConfigurationProvider`.
 *
 * @returns the Ory Elements configuration, which includes the SDK and project configuration.
 * @group Hooks
 */
declare function useOryConfiguration(): OryElementsConfiguration;
type OrySDK = SDKConfig & {
    /**
     * The frontend client for the Ory SDK.
     * This client is used to interact with the Ory SDK and should be used to make API calls.
     */
    frontend: FrontendApi;
};
type SDKConfig = {
    /**
     * The URL of the Ory SDK.
     * This URL is used to connect to the Ory SDK and should be set to the base URL of your Ory instance.
     */
    url: string;
    options?: Partial<ConfigurationParameters>;
};
/**
 * Props for the `OryConfigurationProvider` component.
 *
 * @hidden
 * @inline
 */
interface OryConfigurationProviderProps extends PropsWithChildren {
    /**
     * The Ory SDK configuration to use.
     * If not provided, the SDK URL will be determined automatically based on the environment.
     *
     * Always required for production environments.
     */
    sdk?: OryClientConfiguration["sdk"];
    /**
     * This configuration is used to customize the behavior and appearance of Ory Elements.
     */
    project?: Partial<AccountExperienceConfiguration>;
}
/**
 * The `OryConfigurationProvider` component provides the Ory Elements configuration to its children.
 *
 * @param props - The properties for the OryConfigurationProvider component.
 * @returns
 * @group Components
 */
declare function OryConfigurationProvider({ children, sdk: initialConfig, project, }: OryConfigurationProviderProps): react_jsx_runtime.JSX.Element;

export { type ConsentFlow, type ConsentFlowContainer, type ErrorFlowContainer, type FlowContainerSetter, type FlowContextValue, type FormState, type FormStateAction, type FormStateMethodActive, type FormStateProvideIdentifier, type FormStateSelectMethod, type FormValues, type IntlConfig, type LoginFlowContainer, Node, type NodeProps, type OnSubmitHandlerProps, OryCard, type OryCardAuthMethodListItemProps, OryCardContent, type OryCardContentProps, type OryCardDividerProps, OryCardFooter, type OryCardFooterProps, OryCardHeader, type OryCardHeaderProps, type OryCardLogoProps, type OryCardRootProps as OryCardProps, type OryCardSettingsSectionProps, OryCardValidationMessages, type OryCardValidationMessagesProps, type OryClientConfiguration, OryConfigurationProvider, OryConsentCard, type OryElementsConfiguration, type OryFlowComponentOverrides, type OryFlowComponents, type OryFlowContainer, OryForm, OryFormGroupDivider, type OryFormGroupProps, type OryFormProps, type OryFormRootProps, type OryFormSectionContentProps, type OryFormSectionFooterProps, type OryFormSectionProps, OryFormSsoButtons, OryFormSsoForm, type OryFormSsoRootProps, OryLocales, type OryMessageContentProps, type OryMessageRootProps, type OryNodeAnchorProps, type OryNodeButtonButtonProps, type OryNodeButtonProps, type OryNodeCaptchaProps, type OryNodeCheckboxInputProps, type OryNodeCheckboxProps, type OryNodeConsentScopeCheckboxProps, type OryNodeImageProps, type OryNodeInputInputProps, type OryNodeInputProps, type OryNodeLabelProps, type OryNodeSettingsButton, type OryNodeSsoButtonProps, type OryNodeTextProps, OryPageHeader, type OryPageHeaderProps, OryProvider, type OryProviderProps, OrySelfServiceFlowCard, OrySettingsCard, type OrySettingsFormProps, OrySettingsFormSection, type OrySettingsPasskeyProps, type OrySettingsRecoveryCodesProps, type OrySettingsSsoProps, type OrySettingsTotpProps, type OrySettingsWebauthnProps, type OryToastProps, type RecoveryFlowContainer, type RegistrationFlowContainer, type SettingsFlowContainer, type UiNodeAnchor, type UiNodeDiv, type UiNodeFixed, type UiNodeImage, type UiNodeInput, type UiNodeScript, type UiNodeText, type VerificationFlowContainer, isUiNodeAnchor, isUiNodeDiv, isUiNodeImage, isUiNodeInput, isUiNodeScript, isUiNodeText, messageTestId, resolvePlaceholder, uiTextToFormattedMessage, useComponents, useNodeSorter, useOryConfiguration, useOryFlow, useResendCode };
