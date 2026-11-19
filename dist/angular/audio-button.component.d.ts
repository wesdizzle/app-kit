import * as i0 from "@angular/core";
export declare function canPlayKitAudioMime(mimeType: string): boolean;
export declare function stopActiveKitAudio(): void;
/**
 * Compact audio playback button with native MIME codec feature detection
 * (gracefully hidden on browsers like Safari/iOS when `.ogg` is unsupported)
 * and global single-clip coordination.
 */
export declare class KitAudioButtonComponent {
    private readonly destroyRef;
    readonly src: import("@angular/core").InputSignal<string | null>;
    readonly mimeType: import("@angular/core").InputSignal<string>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly hideIfUnsupported: import("@angular/core").InputSignal<boolean>;
    readonly testId: import("@angular/core").InputSignal<string | null>;
    readonly playState: import("@angular/core").WritableSignal<"idle" | "loading" | "playing" | "error">;
    readonly isSupported: import("@angular/core").Signal<boolean>;
    private ownedAudio;
    constructor();
    togglePlay(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitAudioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitAudioButtonComponent, "kit-audio-button", never, { "src": { "alias": "src"; "required": false; "isSignal": true; }; "mimeType": { "alias": "mimeType"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "hideIfUnsupported": { "alias": "hideIfUnsupported"; "required": false; "isSignal": true; }; "testId": { "alias": "testId"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
