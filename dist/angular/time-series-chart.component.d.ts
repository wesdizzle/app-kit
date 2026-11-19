import { AfterViewInit, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export type KitChartAxis = 'left' | 'right';
export type KitChartMode = 'line' | 'bar';
export interface KitChartSeries {
    id: string;
    label: string;
    axis?: KitChartAxis;
    color: string;
    areaFill?: boolean;
    dashed?: boolean;
    hiddenByDefault?: boolean;
    disabled?: boolean;
    disabledHint?: string;
    formatValue?: (val: number) => string;
}
export interface KitChartPoint {
    key: string;
    label: string;
    shortLabel?: string;
    values: Record<string, number | null | undefined>;
    meta?: unknown;
}
export interface KitChartDiffBand {
    upperSeriesId: string;
    lowerSeriesId: string;
    positiveColor?: string;
    negativeColor?: string;
}
export interface KitChartTooltipContext {
    $implicit: KitChartPoint;
    point: KitChartPoint;
    index: number;
    visibleSeries: readonly KitChartSeries[];
}
export interface KitNiceAxisResult {
    max: number;
    ticks: number[];
}
export interface KitDiffBandSegment {
    positive: boolean;
    path: string;
}
/**
 * Computes clean "1 / 2 / 2.5 / 5 × 10^n" Y-axis ticks starting at 0.
 * Guards against zero, negative, or non-finite upper bounds.
 */
export declare function computeNiceAxisTicks(maxValue: number, tickCount?: number): KitNiceAxisResult;
/**
 * Builds an SVG line path across nullable coordinates, breaking cleanly across gaps.
 */
export declare function buildSeriesLinePath(coords: ReadonlyArray<{
    x: number;
    y: number;
} | null>): string;
/**
 * Builds a closed SVG area fill path down to `baselineY` across contiguous runs of >= 2 points.
 */
export declare function buildSeriesAreaPath(coords: ReadonlyArray<{
    x: number;
    y: number;
} | null>, baselineY: number): string;
/**
 * Builds positive/negative SVG diff-band polygons between two same-axis series,
 * splitting cleanly at exact linear crossover points.
 * Note: in SVG space, smaller Y corresponds to higher numeric values (`upperY <= lowerY` => positive).
 */
export declare function buildDiffBandSegments(pairs: ReadonlyArray<{
    x: number;
    upperY: number | null;
    lowerY: number | null;
}>): KitDiffBandSegment[];
/**
 * Computes an X-axis tick label stride so dense timelines do not overlap horizontally.
 */
export declare function computeXLabelStep(pointCount: number, maxLabels?: number): number;
interface ChartPlotGeometry {
    width: number;
    height: number;
    padLeft: number;
    padRight: number;
    plotWidth: number;
    plotHeight: number;
    baselineY: number;
    hasLeftAxis: boolean;
    hasRightAxis: boolean;
    leftAxis: KitNiceAxisResult;
    rightAxis: KitNiceAxisResult;
    primaryTicks: number[];
    primaryAxisMax: number;
}
/**
 * Zero-dependency, responsive dual-axis SVG time-series chart with interactive legend
 * toggles, line/area and grouped-bar modes, optional difference shading, crosshair,
 * keyboard accessibility, and custom tooltip projection.
 */
export declare class KitTimeSeriesChartComponent implements AfterViewInit, OnDestroy {
    private static nextInstanceId;
    stageRef?: ElementRef<HTMLDivElement>;
    private resizeObserver;
    readonly chartUid: number;
    readonly padTop = 18;
    readonly padBottom = 36;
    readonly points: import("@angular/core").InputSignal<readonly KitChartPoint[]>;
    readonly series: import("@angular/core").InputSignal<readonly KitChartSeries[]>;
    readonly mode: import("@angular/core").InputSignal<KitChartMode>;
    readonly diffBand: import("@angular/core").InputSignal<KitChartDiffBand | null>;
    readonly leftAxisFormatter: import("@angular/core").InputSignal<(v: number) => string>;
    readonly rightAxisFormatter: import("@angular/core").InputSignal<(v: number) => string>;
    readonly leftAxisLabel: import("@angular/core").InputSignal<string>;
    readonly rightAxisLabel: import("@angular/core").InputSignal<string>;
    readonly heightPx: import("@angular/core").InputSignal<number>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly emptyTitle: import("@angular/core").InputSignal<string>;
    readonly emptyMessage: import("@angular/core").InputSignal<string>;
    readonly showLegend: import("@angular/core").InputSignal<boolean>;
    readonly interactive: import("@angular/core").InputSignal<boolean>;
    readonly tooltipTemplate: import("@angular/core").InputSignal<TemplateRef<KitChartTooltipContext> | null>;
    readonly pointClick: import("@angular/core").OutputEmitterRef<KitChartPoint>;
    readonly activePointChange: import("@angular/core").OutputEmitterRef<KitChartPoint | null>;
    readonly visibleSeriesChange: import("@angular/core").OutputEmitterRef<string[]>;
    readonly stageWidth: import("@angular/core").WritableSignal<number>;
    readonly visibilityOverrides: import("@angular/core").WritableSignal<Record<string, boolean>>;
    readonly activeIndex: import("@angular/core").WritableSignal<number | null>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    readonly visibleSeries: import("@angular/core").Signal<readonly KitChartSeries[]>;
    readonly showAllDots: import("@angular/core").Signal<boolean>;
    readonly geometry: import("@angular/core").Signal<ChartPlotGeometry>;
    readonly pointXPositions: import("@angular/core").Signal<readonly number[]>;
    readonly gridLines: import("@angular/core").Signal<{
        value: number;
        y: number;
    }[]>;
    readonly leftAxisLabels: import("@angular/core").Signal<{
        value: number;
        y: number;
        text: string;
    }[]>;
    readonly rightAxisLabels: import("@angular/core").Signal<{
        value: number;
        y: number;
        text: string;
    }[]>;
    readonly rightAxisTint: import("@angular/core").Signal<string | null>;
    readonly renderedLineSeries: import("@angular/core").Signal<{
        series: KitChartSeries;
        linePath: string;
        areaPath: string;
        dots: {
            x: number;
            y: number;
            index: number;
        }[];
    }[]>;
    readonly renderedDiffBand: import("@angular/core").Signal<{
        path: string;
        color: string;
    }[]>;
    readonly renderedBars: import("@angular/core").Signal<{
        key: string;
        index: number;
        x: number;
        y: number;
        width: number;
        height: number;
        color: string;
    }[]>;
    readonly xAxisLabels: import("@angular/core").Signal<{
        index: number;
        x: number;
        text: string;
    }[]>;
    readonly hitColumns: import("@angular/core").Signal<{
        index: number;
        x: number;
        width: number;
        ariaLabel: string;
    }[]>;
    readonly activeCrosshairX: import("@angular/core").Signal<number | null>;
    readonly activeTooltipData: import("@angular/core").Signal<{
        point: KitChartPoint;
        index: number;
        leftPct: number;
        flipLeft: boolean;
        rows: {
            id: string;
            label: string;
            color: string;
            formatted: string;
        }[];
    } | null>;
    isSeriesVisible(s: KitChartSeries): boolean;
    toggleSeries(seriesId: string): void;
    setActiveIndex(index: number | null): void;
    onStageMouseLeave(): void;
    onHitBlur(_event: FocusEvent): void;
    onHitClick(index: number): void;
    onHitKeydown(event: KeyboardEvent, index: number): void;
    getGradientId(seriesId: string): string;
    private resolveVisibility;
    private formatSeriesValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitTimeSeriesChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KitTimeSeriesChartComponent, "kit-time-series-chart", never, { "points": { "alias": "points"; "required": true; "isSignal": true; }; "series": { "alias": "series"; "required": true; "isSignal": true; }; "mode": { "alias": "mode"; "required": false; "isSignal": true; }; "diffBand": { "alias": "diffBand"; "required": false; "isSignal": true; }; "leftAxisFormatter": { "alias": "leftAxisFormatter"; "required": false; "isSignal": true; }; "rightAxisFormatter": { "alias": "rightAxisFormatter"; "required": false; "isSignal": true; }; "leftAxisLabel": { "alias": "leftAxisLabel"; "required": false; "isSignal": true; }; "rightAxisLabel": { "alias": "rightAxisLabel"; "required": false; "isSignal": true; }; "heightPx": { "alias": "heightPx"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "emptyTitle": { "alias": "emptyTitle"; "required": false; "isSignal": true; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; "isSignal": true; }; "showLegend": { "alias": "showLegend"; "required": false; "isSignal": true; }; "interactive": { "alias": "interactive"; "required": false; "isSignal": true; }; "tooltipTemplate": { "alias": "tooltipTemplate"; "required": false; "isSignal": true; }; }, { "pointClick": "pointClick"; "activePointChange": "activePointChange"; "visibleSeriesChange": "visibleSeriesChange"; }, never, never, true, never>;
}
export {};
