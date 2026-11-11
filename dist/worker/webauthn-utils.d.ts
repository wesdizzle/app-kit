/**
 * SHARED WEBAUTHN AUTHENTICATOR DATA PARSER (@wesdizzle/app-kit/worker)
 *
 * Parses binary W3C WebAuthn `authenticatorData` buffers (>= 37 bytes),
 * extracting RP ID hash, presence/verification/backup/attestation flags,
 * signature counter, and optional attested credential ID bytes.
 */
export interface ParsedAuthenticatorData {
    rpIdHash: Uint8Array;
    flags: number;
    userPresent: boolean;
    userVerified: boolean;
    backupEligible: boolean;
    backupState: boolean;
    attestedCredentialDataIncluded: boolean;
    extensionDataIncluded: boolean;
    signCount: number;
    aaguid?: Uint8Array;
    credentialId?: Uint8Array;
}
export declare function parseAuthenticatorData(authDataBytes: Uint8Array): ParsedAuthenticatorData;
