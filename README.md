# `@wesdizzle/app-kit` (`v2.0.1`)

Shared Cloudflare Worker OIDC 1.0 Relying Party, WebCrypto, WebAuthn, Web Push & stateless session infrastructure, D1 $(1 + K)$ Cost Guard / Declarative Schema Diff CLI scripts, Material 3 Expressive semantic CSS tokens, and Angular 22 zoneless `OnPush` shell components.

## Subpath Exports

- **`@wesdizzle/app-kit/worker`**:
  - **Stateless Session & `__Host-` Cookie Helpers**: `signSession`, `verifySession`, `signOidcStateCookie`, `verifyOidcStateCookie`, `HOST_SESSION_COOKIE`, `HOST_OIDC_STATE_COOKIE`, `serializeSessionCookie`, `serializeClearSessionCookies`, `readSessionCookie`, `sanitizeReturnToPath`
  - **OIDC 1.0 + PKCE (`S256`) Verifier**: `verifyOidcIdToken` (enforcing `token_use !== 'access'`, `typ !== 'at+jwt'`, and `email_verified` normalization), `resetOidcJwksCache`
  - **WebCrypto Primitives (`crypto.ts`)**: `base64UrlEncode`, `base64UrlDecode`, `timingSafeEqualBytes`, `timingSafeEqualStrings`, `generateRandomBytes`, `generateRandomToken`, `sha256Bytes`, `sha256Hex`, `sha256Base64Url`, `hmacSha256Bytes`, `hmacSha256Hex`, `derToP1363`, `resolveStrongSecret`
  - **WebAuthn Parser (`webauthn-utils.ts`)**: `parseAuthenticatorData` (RP ID hash, `UP`/`UV`/`BE`/`BS`/`AT` flags, `signCount`, `aaguid`, attested `credentialId`)
  - **Web Push (`web-push.ts`)**: Zero-dependency RFC 8291 (`aes128gcm`) + RFC 8292 (VAPID) `sendWebPushNotification`, `isAllowedPushEndpoint` (HTTPS + port `443` + `redirect: 'manual'` + 3xx rejection)
  - **CSRF & Security Headers**: `isCrossOriginMutatingRequest`, `validateSameOriginMutation`, `buildCspHeader` (including optional `mediaSrc` directive), `withSecurityHeaders` (CSP without `'unsafe-inline'` in `script-src`, HSTS, `Permissions-Policy`, `X-Frame-Options: DENY`, `nosniff`)
  - **R2 Scheduled Backup (`r2-backup.ts`)**: `performScheduledBackup` (identifier validation, single-pass compact JSON, WebCrypto SHA-256 `head()` zero-download `skipIfUnchanged`, cursor-paginated retention pruning)
- **`@wesdizzle/app-kit/scripts`**:
  - **Pre-Flight SQL Cost Guard**: `auditSqlCost`, `printCostReport`, `runWithD1CostGuard`, `isSecondaryIndexOrigin`, `isTableWithoutRowid`, `splitSqlStatements`
  - **Declarative Schema Differ**: `diffSqliteSchema` (compares R2-hydrated `data/remote_baseline.db` against `:memory:` `migrations/schema.sql`)
  - **Remote D1 Schema Drift Check**: `runD1SchemaDriftCheck`, `detectWranglerDatabaseName`
  - **Static Schema & Query Plan CI Auditor**: `runStaticSchemaCostGuard`
  - **Operational Scripts**: `runWranglerDeploy` (UUID validation, early `--put-secrets` exit, single-build coordination), `runD1PullFromR2`, `hydrateSqliteFromSnapshot`, `runHybridDev` (`taskkill /T /F` on Windows)
- **`@wesdizzle/app-kit/angular`**:
  - `KitAuthService`, `sanitizeClientReturnToPath`, `checkUpstreamOidcStatus`
  - `KitThemeService`, `KIT_THEME_CONFIG`, `KitUserPreferences`, `normalizeKitUserPreferences`, `updateUpstreamPreferences`, `runKitViewTransition`, `isKitReducedMotionPreferred` (`light` / `dark` / `auto` mode with custom `theme-color`, View Transitions API helpers, & cross-app OIDC Account Server preference sync)
  - `createKitViewTransitionHandler`, `getKitLeafRouteSnapshot`, `KIT_VT_MEDIA_CLASS`, `KIT_VT_MEDIA_ATTR`, `KIT_VT_RADIUS_FROM_VAR`, `KIT_VT_RADIUS_TO_VAR`, `KitRouteSnapshotLike`, `KitViewTransitionLike`, `KitRouterViewTransitionInfo`, `KitMediaRadiusMorph`, `KitMediaViewTransitionOptions` (Angular Router View Transition helper with reduced-motion skipping and `--kit-vt-radius-from` / `--kit-vt-radius-to` media radius morphing)
  - `KitThemeToggleComponent` (`<kit-theme-toggle>`)
  - `BottomSheetDragController`, `KitDialogSheetComponent` (`<kit-dialog-sheet>`), `canAnimateKitDialogExit`
  - `KitCommandPaletteComponent` (`<kit-command-palette>`), `tokenizeKitCommandQuery`, `matchesKitCommandTokens`, `filterAndGroupKitCommands`
  - `KitHeaderBarComponent` (`<kit-header-bar>`)
  - `KitDetailShellComponent` (`<kit-detail-shell>`), `KitDetailNavItem`
  - `KitTabsComponent` (`<kit-tabs>`), `KitTabItem`, `getNextEnabledTabId`
  - `KitSectionCardComponent` (`<kit-section-card>`), `KitKvGridComponent` (`<kit-kv-grid>`), `KitKvItem`
  - `KitStatBarListComponent` (`<kit-stat-bar-list>`), `KitStatBarItem`, `computeKitStatPct`, `resolveKitStatTone`
  - `KitDataTableComponent` (`<kit-data-table>`), `KitTableColumn`, `KitTableSortState`, `sortKitTableRows`
  - `KitAudioButtonComponent` (`<kit-audio-button>`), `canPlayKitAudioMime`, `stopActiveKitAudio`
  - `KitProfileModalComponent` (`<kit-profile-modal>`)
  - `KitPublicBannerComponent` (`<kit-public-banner>`)
  - `KitLandingCardComponent` (`<kit-landing-card>`)
  - `KitFilterBarComponent` (`<kit-filter-bar>`)
  - `KitSelectComponent` (`<kit-select>`), `KitComboboxComponent` (`<kit-combobox>`), `KitMultiSelectComponent` (`<kit-multiselect>`)
  - `KitIconComponent` / `IconComponent` (`<kit-icon>`, `<app-icon>`) & `ICON_CATALOG`
  - `KitConfirmationDialogComponent` / `ConfirmationDialogComponent` (`<kit-confirmation-dialog>`, `<app-confirmation-dialog>`)
  - `KitSegmentedMeterComponent` (`<kit-segmented-meter>`)
  - `KitTimeSeriesChartComponent` (`<kit-time-series-chart>`), `KitChartPoint`, `KitChartSeries`, `KitChartDiffBand`, `KitChartTooltipContext`, `computeNiceAxisTicks`
  - `KitSyncIndicatorComponent` (`<kit-sync-indicator>`), `KitStatusBannerComponent` (`<kit-status-banner>`)
  - `createAnimatedNumber`, `interpolateNumber`
  - `KitOfflineStore<T>`, `getScopedStorageKey`
- **`@wesdizzle/app-kit/styles/tokens.css`**:
  - Unified Material 3 Expressive Dark & Light `--kit-*` tokens, M3 Expressive motion duration/easing tokens (`--kit-ease-*`, `--kit-duration-*`), interactive `.state-layer` & stagger/skeleton utilities, `.kit-vt-media` shared-element View Transition border-radius morphing, WCAG 2.1 AA status tokens, typography (`Outfit`, `Inter`, `JetBrains Mono`), shared `:focus-visible` focus rings, and global reduced-motion rules (including root and named View Transition pseudo-elements). Component-specific styles are co-located directly on each standalone Angular component (`ViewEncapsulation.None`) so unused components contribute zero CSS bytes.
