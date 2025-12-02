import * as _ory_client_fetch from '@ory/client-fetch';
import { LogoutFlow } from '@ory/client-fetch';

/**
 * A client side hook to create a registration flow.
 *
 * @returns A registration flow
 * @public
 * @function
 * @group Hooks
 */
declare const useRegistrationFlow: () => void | _ory_client_fetch.RegistrationFlow | null;

/**
 * A client side hook to create a verification flow.
 *
 * @returns A verification flow
 * @public
 * @function
 * @group Hooks
 */
declare const useVerificationFlow: () => void | _ory_client_fetch.VerificationFlow | null;

/**
 * A client side hook to create a recovery flow.
 *
 * @returns A recovery flow
 * @public
 * @function
 * @group Hooks
 */
declare const useRecoveryFlow: () => void | _ory_client_fetch.RecoveryFlow | null;

/**
 * A client side hook to create a login flow.
 *
 * @returns A login flow
 * @public
 * @function
 * @group Hooks
 */
declare const useLoginFlow: () => void | _ory_client_fetch.LoginFlow | null;

/**
 * A client side hook to create a settings flow.
 *
 * @returns A settings flow
 * @public
 * @function
 * @group Hooks
 */
declare const useSettingsFlow: () => void | _ory_client_fetch.SettingsFlow | null;

/**
 * A client side hook to create a logout flow.
 *
 * @returns A logout flow
 * @public
 * @group Hooks
 */
declare function useLogoutFlow(): LogoutFlow | undefined;

export { useLoginFlow, useLogoutFlow, useRecoveryFlow, useRegistrationFlow, useSettingsFlow, useVerificationFlow };
