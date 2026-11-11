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

export function parseAuthenticatorData(
  authDataBytes: Uint8Array,
): ParsedAuthenticatorData {
  if (authDataBytes.length < 37) {
    throw new Error('Authenticator data is shorter than 37 bytes');
  }
  const rpIdHash = authDataBytes.slice(0, 32);
  const flags = authDataBytes[32]!;
  const view = new DataView(
    authDataBytes.buffer,
    authDataBytes.byteOffset + 33,
    4,
  );
  const signCount = view.getUint32(0, false);

  const attestedCredentialDataIncluded = (flags & 0x40) !== 0;
  let aaguid: Uint8Array | undefined;
  let credentialId: Uint8Array | undefined;

  if (attestedCredentialDataIncluded) {
    // 37-byte header + 16-byte AAGUID + 2-byte credentialIdLength = 55 bytes min
    if (authDataBytes.length < 55) {
      throw new Error(
        'Authenticator data sets AT flag (0x40) but is shorter than 55 bytes',
      );
    }
    aaguid = authDataBytes.slice(37, 53);
    const credLenView = new DataView(
      authDataBytes.buffer,
      authDataBytes.byteOffset + 53,
      2,
    );
    const credIdLen = credLenView.getUint16(0, false);
    if (credIdLen === 0 || 55 + credIdLen > authDataBytes.length) {
      throw new Error('Invalid attested credential ID length in authData');
    }
    credentialId = authDataBytes.slice(55, 55 + credIdLen);
  }

  return {
    rpIdHash,
    flags,
    userPresent: (flags & 0x01) !== 0,
    userVerified: (flags & 0x04) !== 0,
    backupEligible: (flags & 0x08) !== 0,
    backupState: (flags & 0x10) !== 0,
    attestedCredentialDataIncluded,
    extensionDataIncluded: (flags & 0x80) !== 0,
    signCount,
    ...(aaguid ? { aaguid } : {}),
    ...(credentialId ? { credentialId } : {}),
  };
}
