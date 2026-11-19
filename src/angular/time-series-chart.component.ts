import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

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

const DEFAULT_STAGE_WIDTH = 760;
const PAD_TOP = 18;
const PAD_BOTTOM = 36;

function roundFloat(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

/**
 * Computes clean "1 / 2 / 2.5 / 5 × 10^n" Y-axis ticks starting at 0.
 * Guards against zero, negative, or non-finite upper bounds.
 */
export function computeNiceAxisTicks(
  maxValue: number,
  tickCount = 5,
): KitNiceAxisResult {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return { max: 1, ticks: [0, 1] };
  }

  const targetTicks = Math.max(2, Math.floor(tickCount));
  const rawStep = maxValue / (targetTicks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;

  let niceMultiplier = 10;
  if (normalized <= 1) {
    niceMultiplier = 1;
  } else if (normalized <= 2) {
    niceMultiplier = 2;
  } else if (normalized <= 2.5) {
    niceMultiplier = 2.5;
  } else if (normalized <= 5) {
    niceMultiplier = 5;
  }

  const step = niceMultiplier * magnitude;
  const max = roundFloat(Math.ceil(maxValue / step) * step);
  const ticks: number[] = [];
  const stepCount = Math.max(1, Math.round(max / step));

  for (let i = 0; i <= stepCount; i++) {
    ticks.push(roundFloat(i * step));
  }

  return { max: max > 0 ? max : 1, ticks };
}

/**
 * Builds an SVG line path across nullable coordinates, breaking cleanly across gaps.
 */
export function buildSeriesLinePath(
  coords: ReadonlyArray<{ x: number; y: number } | null>,
): string {
  const segments: string[] = [];
  let inRun = false;

  for (const pt of coords) {
    if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) {
      inRun = false;
      continue;
    }
    const x = roundFloat(pt.x);
    const y = roundFloat(pt.y);
    if (!inRun) {
      segments.push(`M ${x} ${y}`);
      inRun = true;
    } else {
      segments.push(`L ${x} ${y}`);
    }
  }

  return segments.join(' ');
}

/**
 * Builds a closed SVG area fill path down to `baselineY` across contiguous runs of >= 2 points.
 */
export function buildSeriesAreaPath(
  coords: ReadonlyArray<{ x: number; y: number } | null>,
  baselineY: number,
): string {
  const safeBaseline = roundFloat(baselineY);
  const paths: string[] = [];
  let run: Array<{ x: number; y: number }> = [];

  const flushRun = () => {
    if (run.length >= 2) {
      const first = run[0];
      const last = run[run.length - 1];
      const lineParts = run
        .map((p) => `L ${roundFloat(p.x)} ${roundFloat(p.y)}`)
        .join(' ');
      paths.push(
        `M ${roundFloat(first.x)} ${safeBaseline} ${lineParts} L ${roundFloat(last.x)} ${safeBaseline} Z`,
      );
    }
    run = [];
  };

  for (const pt of coords) {
    if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) {
      flushRun();
    } else {
      run.push({ x: pt.x, y: pt.y });
    }
  }
  flushRun();

  return paths.join(' ');
}

/**
 * Builds positive/negative SVG diff-band polygons between two same-axis series,
 * splitting cleanly at exact linear crossover points.
 * Note: in SVG space, smaller Y corresponds to higher numeric values (`upperY <= lowerY` => positive).
 */
export function buildDiffBandSegments(
  pairs: ReadonlyArray<{
    x: number;
    upperY: number | null;
    lowerY: number | null;
  }>,
): KitDiffBandSegment[] {
  const segments: KitDiffBandSegment[] = [];

  type ValidPair = { x: number; upperY: number; lowerY: number };
  let run: ValidPair[] = [];

  const emitContiguousRun = (items: ValidPair[]) => {
    if (items.length < 2) return;

    let currentSign = items[0].upperY <= items[0].lowerY;
    let upperPts: Array<{ x: number; y: number }> = [
      { x: items[0].x, y: items[0].upperY },
    ];
    let lowerPts: Array<{ x: number; y: number }> = [
      { x: items[0].x, y: items[0].lowerY },
    ];

    const pushPolygon = (positive: boolean) => {
      if (upperPts.length < 2) return;
      const top = upperPts
        .map(
          (p, idx) =>
            `${idx === 0 ? 'M' : 'L'} ${roundFloat(p.x)} ${roundFloat(p.y)}`,
        )
        .join(' ');
      const bottom = [...lowerPts]
        .reverse()
        .map((p) => `L ${roundFloat(p.x)} ${roundFloat(p.y)}`)
        .join(' ');
      segments.push({ positive, path: `${top} ${bottom} Z` });
    };

    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1];
      const curr = items[i];
      const prevDiff = prev.lowerY - prev.upperY;
      const currDiff = curr.lowerY - curr.upperY;
      const nextSign = curr.upperY <= curr.lowerY;

      if ((prevDiff > 0 && currDiff < 0) || (prevDiff < 0 && currDiff > 0)) {
        const t = prevDiff / (prevDiff - currDiff);
        const cx = prev.x + t * (curr.x - prev.x);
        const cy = prev.upperY + t * (curr.upperY - prev.upperY);
        upperPts.push({ x: cx, y: cy });
        lowerPts.push({ x: cx, y: cy });
        pushPolygon(currentSign);

        currentSign = nextSign;
        upperPts = [
          { x: cx, y: cy },
          { x: curr.x, y: curr.upperY },
        ];
        lowerPts = [
          { x: cx, y: cy },
          { x: curr.x, y: curr.lowerY },
        ];
      } else {
        upperPts.push({ x: curr.x, y: curr.upperY });
        lowerPts.push({ x: curr.x, y: curr.lowerY });
        currentSign = nextSign;
      }
    }

    pushPolygon(currentSign);
  };

  for (const p of pairs) {
    if (
      p.upperY !== null &&
      p.lowerY !== null &&
      Number.isFinite(p.x) &&
      Number.isFinite(p.upperY) &&
      Number.isFinite(p.lowerY)
    ) {
      run.push({ x: p.x, upperY: p.upperY, lowerY: p.lowerY });
    } else {
      emitContiguousRun(run);
      run = [];
    }
  }
  emitContiguousRun(run);

  return segments;
}

/**
 * Computes an X-axis tick label stride so dense timelines do not overlap horizontally.
 */
export function computeXLabelStep(pointCount: number, maxLabels = 8): number {
  if (pointCount <= 0) return 1;
  const safeMax = Math.max(2, Math.floor(maxLabels));
  if (pointCount <= safeMax) return 1;
  return Math.ceil(pointCount / safeMax);
}

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
@Component({
  selector: 'kit-time-series-chart',
  standalone: true,
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kit-ts-chart" [attr.aria-label]="ariaLabel()">
      @if (showLegend() && series().length > 0) {
        <div
          class="kit-ts-legend"
          role="group"
          aria-label="Chart series visibility"
        >
          @for (s of series(); track s.id) {
            <button
              type="button"
              class="kit-ts-legend-btn"
              [class.active]="isSeriesVisible(s)"
              [class.disabled]="!!s.disabled"
              [disabled]="!!s.disabled"
              [attr.aria-pressed]="isSeriesVisible(s)"
              [attr.title]="
                s.disabled
                  ? s.disabledHint || s.label + ' unavailable'
                  : 'Toggle ' + s.label
              "
              (click)="toggleSeries(s.id)"
            >
              <span
                class="kit-ts-legend-swatch"
                [class.dashed]="!!s.dashed"
                [style.background]="s.dashed ? null : s.color"
                [style.border-color]="s.dashed ? s.color : null"
              ></span>
              <span class="kit-ts-legend-label">{{ s.label }}</span>
              @if (s.disabled && s.disabledHint) {
                <span class="kit-ts-legend-hint">· {{ s.disabledHint }}</span>
              }
            </button>
          }
        </div>
      }

      @if (points().length === 0) {
        <div class="kit-ts-empty" [style.min-height.px]="heightPx()">
          <p class="kit-ts-empty-title">{{ emptyTitle() }}</p>
          @if (emptyMessage()) {
            <p class="kit-ts-empty-message">{{ emptyMessage() }}</p>
          }
        </div>
      } @else {
        <div #stageRef class="kit-ts-stage" (mouseleave)="onStageMouseLeave()">
          <svg
            class="kit-ts-svg"
            [attr.viewBox]="'0 0 ' + geometry().width + ' ' + geometry().height"
            [style.height.px]="geometry().height"
            role="img"
            [attr.aria-label]="ariaLabel()"
          >
            <defs>
              @for (s of visibleSeries(); track s.id) {
                @if (s.areaFill && mode() === 'line') {
                  <linearGradient
                    [attr.id]="getGradientId(s.id)"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      [attr.stop-color]="s.color"
                      stop-opacity="0.22"
                    />
                    <stop
                      offset="100%"
                      [attr.stop-color]="s.color"
                      stop-opacity="0.01"
                    />
                  </linearGradient>
                }
              }
            </defs>

            <!-- Horizontal Gridlines -->
            <g class="kit-ts-grid">
              @for (tick of gridLines(); track tick.value) {
                <line
                  class="kit-ts-grid-line"
                  [attr.x1]="geometry().padLeft"
                  [attr.y1]="tick.y"
                  [attr.x2]="geometry().width - geometry().padRight"
                  [attr.y2]="tick.y"
                />
              }
            </g>

            <!-- Left Y-Axis Labels -->
            @if (geometry().hasLeftAxis) {
              <g class="kit-ts-axis kit-ts-axis-left">
                @for (lbl of leftAxisLabels(); track lbl.value) {
                  <text
                    class="kit-ts-axis-text"
                    [attr.x]="geometry().padLeft - 8"
                    [attr.y]="lbl.y + 4"
                    text-anchor="end"
                  >
                    {{ lbl.text }}
                  </text>
                }
                @if (leftAxisLabel()) {
                  <text
                    class="kit-ts-axis-caption"
                    [attr.x]="geometry().padLeft"
                    y="11"
                    text-anchor="start"
                  >
                    {{ leftAxisLabel() }}
                  </text>
                }
              </g>
            }

            <!-- Right Y-Axis Labels -->
            @if (geometry().hasRightAxis) {
              <g class="kit-ts-axis kit-ts-axis-right">
                @for (lbl of rightAxisLabels(); track lbl.value) {
                  <text
                    class="kit-ts-axis-text"
                    [attr.x]="geometry().width - geometry().padRight + 8"
                    [attr.y]="lbl.y + 4"
                    text-anchor="start"
                    [style.fill]="rightAxisTint()"
                  >
                    {{ lbl.text }}
                  </text>
                }
                @if (rightAxisLabel()) {
                  <text
                    class="kit-ts-axis-caption"
                    [attr.x]="geometry().width - geometry().padRight"
                    y="11"
                    text-anchor="end"
                    [style.fill]="rightAxisTint()"
                  >
                    {{ rightAxisLabel() }}
                  </text>
                }
              </g>
            }

            <!-- Line / Area Mode -->
            @if (mode() === 'line') {
              @for (seg of renderedDiffBand(); track $index) {
                <path
                  [attr.d]="seg.path"
                  [attr.fill]="seg.color"
                  class="kit-ts-diff-band"
                />
              }

              @for (render of renderedLineSeries(); track render.series.id) {
                @if (render.areaPath) {
                  <path
                    [attr.d]="render.areaPath"
                    [attr.fill]="
                      'url(#' + getGradientId(render.series.id) + ')'
                    "
                    class="kit-ts-area"
                  />
                }
                @if (render.linePath) {
                  <path
                    [attr.d]="render.linePath"
                    fill="none"
                    [attr.stroke]="render.series.color"
                    [attr.stroke-dasharray]="
                      render.series.dashed ? '6 4' : null
                    "
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="kit-ts-line"
                  />
                }
                @for (pt of render.dots; track pt.index) {
                  @if (showAllDots() || activeIndex() === pt.index) {
                    <circle
                      [attr.cx]="pt.x"
                      [attr.cy]="pt.y"
                      [attr.r]="activeIndex() === pt.index ? 5 : 3"
                      [attr.fill]="render.series.color"
                      class="kit-ts-dot"
                      [class.active]="activeIndex() === pt.index"
                    />
                  }
                }
              }
            } @else {
              <!-- Grouped Bar Mode -->
              @for (bar of renderedBars(); track bar.key) {
                <rect
                  class="kit-ts-bar"
                  [class.active]="activeIndex() === bar.index"
                  [attr.x]="bar.x"
                  [attr.y]="bar.y"
                  [attr.width]="bar.width"
                  [attr.height]="bar.height"
                  [attr.fill]="bar.color"
                  rx="3"
                />
              }
            }

            <!-- Active Crosshair -->
            @if (activeCrosshairX(); as cx) {
              <line
                class="kit-ts-crosshair"
                [attr.x1]="cx"
                [attr.y1]="padTop"
                [attr.x2]="cx"
                [attr.y2]="geometry().baselineY"
              />
            }

            <!-- X-Axis Labels -->
            <g class="kit-ts-x-axis">
              @for (xl of xAxisLabels(); track xl.index) {
                <text
                  class="kit-ts-axis-text"
                  [class.active]="activeIndex() === xl.index"
                  [attr.x]="xl.x"
                  [attr.y]="geometry().height - 10"
                  text-anchor="middle"
                >
                  {{ xl.text }}
                </text>
              }
            </g>

            <!-- Interactive Column Hit Targets -->
            <g class="kit-ts-hits">
              @for (hit of hitColumns(); track hit.index) {
                <rect
                  class="kit-ts-hit-rect"
                  [class.clickable]="interactive()"
                  [attr.x]="hit.x"
                  [attr.y]="padTop"
                  [attr.width]="hit.width"
                  [attr.height]="geometry().plotHeight"
                  tabindex="0"
                  [attr.role]="interactive() ? 'button' : 'img'"
                  [attr.aria-label]="hit.ariaLabel"
                  (mouseenter)="setActiveIndex(hit.index)"
                  (focus)="setActiveIndex(hit.index)"
                  (blur)="onHitBlur($event)"
                  (click)="onHitClick(hit.index)"
                  (keydown)="onHitKeydown($event, hit.index)"
                />
              }
            </g>
          </svg>

          <!-- Floating Crosshair Tooltip -->
          @if (activeTooltipData(); as tip) {
            <div
              class="kit-ts-tooltip"
              [class.align-right]="tip.flipLeft"
              [style.left.%]="tip.leftPct"
              role="status"
              aria-live="polite"
            >
              @if (tooltipTemplate(); as customTpl) {
                <ng-container
                  [ngTemplateOutlet]="customTpl"
                  [ngTemplateOutletContext]="{
                    $implicit: tip.point,
                    point: tip.point,
                    index: tip.index,
                    visibleSeries: visibleSeries(),
                  }"
                />
              } @else {
                <div class="kit-ts-tooltip-title">{{ tip.point.label }}</div>
                <div class="kit-ts-tooltip-rows">
                  @for (row of tip.rows; track row.id) {
                    <div class="kit-ts-tooltip-row">
                      <span class="kit-ts-tooltip-key">
                        <span
                          class="kit-ts-tooltip-dot"
                          [style.background]="row.color"
                        ></span>
                        <span>{{ row.label }}</span>
                      </span>
                      <strong class="kit-ts-tooltip-val">{{
                        row.formatted
                      }}</strong>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class KitTimeSeriesChartComponent implements AfterViewInit, OnDestroy {
  private static nextInstanceId = 0;

  @ViewChild('stageRef') stageRef?: ElementRef<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null = null;

  readonly chartUid = ++KitTimeSeriesChartComponent.nextInstanceId;
  readonly padTop = PAD_TOP;
  readonly padBottom = PAD_BOTTOM;

  readonly points = input.required<readonly KitChartPoint[]>();
  readonly series = input.required<readonly KitChartSeries[]>();
  readonly mode = input<KitChartMode>('line');
  readonly diffBand = input<KitChartDiffBand | null>(null);
  readonly leftAxisFormatter = input<(v: number) => string>((v) =>
    String(Math.round(v)),
  );
  readonly rightAxisFormatter = input<(v: number) => string>((v) =>
    String(Math.round(v)),
  );
  readonly leftAxisLabel = input<string>('');
  readonly rightAxisLabel = input<string>('');
  readonly heightPx = input<number>(300);
  readonly ariaLabel = input<string>('Time series chart');
  readonly emptyTitle = input<string>('No timeline data yet');
  readonly emptyMessage = input<string>('');
  readonly showLegend = input<boolean>(true);
  readonly interactive = input<boolean>(true);
  readonly tooltipTemplate = input<TemplateRef<KitChartTooltipContext> | null>(
    null,
  );

  readonly pointClick = output<KitChartPoint>();
  readonly activePointChange = output<KitChartPoint | null>();
  readonly visibleSeriesChange = output<string[]>();

  readonly stageWidth = signal<number>(DEFAULT_STAGE_WIDTH);
  readonly visibilityOverrides = signal<Record<string, boolean>>({});
  readonly activeIndex = signal<number | null>(null);

  ngAfterViewInit(): void {
    const el = this.stageRef?.nativeElement;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.clientWidth);
      if (w >= 240 && w !== this.stageWidth()) {
        this.stageWidth.set(w);
      }
    };
    measure();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => measure());
      this.resizeObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  readonly visibleSeries = computed<readonly KitChartSeries[]>(() => {
    const overrides = this.visibilityOverrides();
    return this.series().filter((s) => this.resolveVisibility(s, overrides));
  });

  readonly showAllDots = computed<boolean>(() => this.points().length <= 24);

  readonly geometry = computed<ChartPlotGeometry>(() => {
    const width = Math.max(280, this.stageWidth());
    const height = Math.max(180, this.heightPx());
    const pts = this.points();
    const vis = this.visibleSeries();
    const leftSeries = vis.filter((s) => (s.axis ?? 'left') === 'left');
    const rightSeries = vis.filter((s) => s.axis === 'right');

    const hasLeftAxis = leftSeries.length > 0;
    const hasRightAxis = rightSeries.length > 0;

    const isNarrow = width < 480;
    const padLeft = hasLeftAxis ? (isNarrow ? 50 : 66) : isNarrow ? 16 : 24;
    const padRight = hasRightAxis ? (isNarrow ? 40 : 54) : isNarrow ? 16 : 24;
    const plotWidth = Math.max(80, width - padLeft - padRight);
    const plotHeight = Math.max(80, height - PAD_TOP - PAD_BOTTOM);
    const baselineY = PAD_TOP + plotHeight;

    let leftMax = 0;
    for (const s of leftSeries) {
      for (const p of pts) {
        const val = p.values[s.id];
        if (typeof val === 'number' && Number.isFinite(val) && val > leftMax) {
          leftMax = val;
        }
      }
    }

    let rightMax = 0;
    for (const s of rightSeries) {
      for (const p of pts) {
        const val = p.values[s.id];
        if (typeof val === 'number' && Number.isFinite(val) && val > rightMax) {
          rightMax = val;
        }
      }
    }

    const leftAxis = computeNiceAxisTicks(leftMax, 5);
    const rightAxis = computeNiceAxisTicks(rightMax, 5);
    const primaryTicks = hasLeftAxis ? leftAxis.ticks : rightAxis.ticks;
    const primaryAxisMax = hasLeftAxis ? leftAxis.max : rightAxis.max;

    return {
      width,
      height,
      padLeft,
      padRight,
      plotWidth,
      plotHeight,
      baselineY,
      hasLeftAxis,
      hasRightAxis,
      leftAxis,
      rightAxis,
      primaryTicks,
      primaryAxisMax,
    };
  });

  readonly pointXPositions = computed<readonly number[]>(() => {
    const pts = this.points();
    const geom = this.geometry();
    const n = pts.length;
    if (n === 0) return [];
    if (n === 1) {
      return [geom.padLeft + geom.plotWidth / 2];
    }
    if (this.mode() === 'bar') {
      const slot = geom.plotWidth / n;
      return pts.map((_, i) => geom.padLeft + (i + 0.5) * slot);
    }
    return pts.map((_, i) => geom.padLeft + (i / (n - 1)) * geom.plotWidth);
  });

  readonly gridLines = computed(() => {
    const geom = this.geometry();
    return geom.primaryTicks.map((value) => ({
      value,
      y: roundFloat(
        geom.baselineY - (value / geom.primaryAxisMax) * geom.plotHeight,
      ),
    }));
  });

  readonly leftAxisLabels = computed(() => {
    const geom = this.geometry();
    if (!geom.hasLeftAxis) return [];
    const fmt = this.leftAxisFormatter();
    return geom.leftAxis.ticks.map((value) => ({
      value,
      y: roundFloat(
        geom.baselineY - (value / geom.leftAxis.max) * geom.plotHeight,
      ),
      text: fmt(value),
    }));
  });

  readonly rightAxisLabels = computed(() => {
    const geom = this.geometry();
    if (!geom.hasRightAxis) return [];
    const fmt = this.rightAxisFormatter();
    return geom.rightAxis.ticks.map((value) => ({
      value,
      y: roundFloat(
        geom.baselineY - (value / geom.rightAxis.max) * geom.plotHeight,
      ),
      text: fmt(value),
    }));
  });

  readonly rightAxisTint = computed<string | null>(() => {
    const vis = this.visibleSeries().filter((s) => s.axis === 'right');
    return vis.length === 1 ? vis[0].color : null;
  });

  readonly renderedLineSeries = computed(() => {
    if (this.mode() !== 'line') return [];
    const pts = this.points();
    const xs = this.pointXPositions();
    const geom = this.geometry();

    return this.visibleSeries().map((s) => {
      const axisMax =
        s.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
      const coords = pts.map((pt, idx) => {
        const raw = pt.values[s.id];
        if (typeof raw !== 'number' || !Number.isFinite(raw)) {
          return null;
        }
        const clamped = Math.max(0, raw);
        const y = geom.baselineY - (clamped / axisMax) * geom.plotHeight;
        return { x: xs[idx], y: roundFloat(y), index: idx };
      });

      const linePath = buildSeriesLinePath(coords);
      const areaPath = s.areaFill
        ? buildSeriesAreaPath(coords, geom.baselineY)
        : '';
      const dots = coords.filter(
        (c): c is { x: number; y: number; index: number } => c !== null,
      );

      return { series: s, linePath, areaPath, dots };
    });
  });

  readonly renderedDiffBand = computed(() => {
    const band = this.diffBand();
    if (!band || this.mode() !== 'line') return [];
    const vis = this.visibleSeries();
    const upper = vis.find((s) => s.id === band.upperSeriesId);
    const lower = vis.find((s) => s.id === band.lowerSeriesId);
    if (!upper || !lower) return [];
    if ((upper.axis ?? 'left') !== (lower.axis ?? 'left')) return [];

    const geom = this.geometry();
    const axisMax =
      upper.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
    const xs = this.pointXPositions();
    const pts = this.points();

    const pairs = pts.map((pt, idx) => {
      const uRaw = pt.values[upper.id];
      const lRaw = pt.values[lower.id];
      const upperY =
        typeof uRaw === 'number' && Number.isFinite(uRaw)
          ? roundFloat(
              geom.baselineY - (Math.max(0, uRaw) / axisMax) * geom.plotHeight,
            )
          : null;
      const lowerY =
        typeof lRaw === 'number' && Number.isFinite(lRaw)
          ? roundFloat(
              geom.baselineY - (Math.max(0, lRaw) / axisMax) * geom.plotHeight,
            )
          : null;
      return { x: xs[idx], upperY, lowerY };
    });

    const posColor = band.positiveColor ?? 'rgba(34, 197, 94, 0.14)';
    const negColor = band.negativeColor ?? 'rgba(248, 113, 113, 0.14)';

    return buildDiffBandSegments(pairs).map((seg) => ({
      path: seg.path,
      color: seg.positive ? posColor : negColor,
    }));
  });

  readonly renderedBars = computed(() => {
    if (this.mode() !== 'bar') return [];
    const pts = this.points();
    const vis = this.visibleSeries();
    const xs = this.pointXPositions();
    const geom = this.geometry();
    const n = pts.length;
    const m = vis.length;
    if (n === 0 || m === 0) return [];

    const slotWidth = geom.plotWidth / n;
    const groupWidth = Math.min(44, Math.max(6, slotWidth * 0.72));
    const innerGap = m > 1 ? Math.min(4, groupWidth * 0.1) : 0;
    const barWidth = Math.max(2, (groupWidth - innerGap * (m - 1)) / m);

    const bars: Array<{
      key: string;
      index: number;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
    }> = [];

    for (let i = 0; i < n; i++) {
      const centerX = xs[i];
      const groupStartX = centerX - groupWidth / 2;
      for (let j = 0; j < m; j++) {
        const s = vis[j];
        const raw = pts[i].values[s.id];
        if (typeof raw !== 'number' || !Number.isFinite(raw) || raw <= 0) {
          continue;
        }
        const axisMax =
          s.axis === 'right' ? geom.rightAxis.max : geom.leftAxis.max;
        const barHeight = Math.max(2, (raw / axisMax) * geom.plotHeight);
        bars.push({
          key: `${pts[i].key}:${s.id}`,
          index: i,
          x: roundFloat(groupStartX + j * (barWidth + innerGap)),
          y: roundFloat(geom.baselineY - barHeight),
          width: roundFloat(barWidth),
          height: roundFloat(barHeight),
          color: s.color,
        });
      }
    }

    return bars;
  });

  readonly xAxisLabels = computed(() => {
    const pts = this.points();
    const xs = this.pointXPositions();
    const w = this.geometry().width;
    const maxLabels = w < 460 ? 4 : w < 700 ? 6 : 9;
    const step = computeXLabelStep(pts.length, maxLabels);
    const out: Array<{ index: number; x: number; text: string }> = [];

    for (let i = 0; i < pts.length; i++) {
      const isLast = i === pts.length - 1;
      const lastEmittedIdx = out.length > 0 ? out[out.length - 1].index : -99;
      if (
        i % step === 0 ||
        (isLast && i - lastEmittedIdx >= Math.max(1, Math.floor(step / 2)))
      ) {
        out.push({
          index: i,
          x: roundFloat(xs[i]),
          text: pts[i].shortLabel || pts[i].label,
        });
      }
    }
    return out;
  });

  readonly hitColumns = computed(() => {
    const pts = this.points();
    const xs = this.pointXPositions();
    const geom = this.geometry();
    const vis = this.visibleSeries();
    const n = pts.length;
    if (n === 0) return [];

    return pts.map((pt, i) => {
      const prevMid = i === 0 ? geom.padLeft : (xs[i - 1] + xs[i]) / 2;
      const nextMid =
        i === n - 1 ? geom.width - geom.padRight : (xs[i] + xs[i + 1]) / 2;
      const summaryParts = vis
        .map((s) => {
          const val = pt.values[s.id];
          if (typeof val !== 'number' || !Number.isFinite(val)) return null;
          return `${s.label}: ${this.formatSeriesValue(s, val)}`;
        })
        .filter((part): part is string => part !== null);

      return {
        index: i,
        x: roundFloat(prevMid),
        width: roundFloat(Math.max(8, nextMid - prevMid)),
        ariaLabel: `${pt.label}${summaryParts.length ? ` — ${summaryParts.join(', ')}` : ''}`,
      };
    });
  });

  readonly activeCrosshairX = computed<number | null>(() => {
    const idx = this.activeIndex();
    if (idx === null) return null;
    const xs = this.pointXPositions();
    return idx >= 0 && idx < xs.length ? roundFloat(xs[idx]) : null;
  });

  readonly activeTooltipData = computed(() => {
    const idx = this.activeIndex();
    const pts = this.points();
    if (idx === null || idx < 0 || idx >= pts.length) return null;
    const pt = pts[idx];
    const xs = this.pointXPositions();
    const geom = this.geometry();
    const xPct = (xs[idx] / geom.width) * 100;
    const vis = this.visibleSeries();

    const rows = vis
      .map((s) => {
        const val = pt.values[s.id];
        if (typeof val !== 'number' || !Number.isFinite(val)) return null;
        return {
          id: s.id,
          label: s.label,
          color: s.color,
          formatted: this.formatSeriesValue(s, val),
        };
      })
      .filter(
        (
          r,
        ): r is {
          id: string;
          label: string;
          color: string;
          formatted: string;
        } => r !== null,
      );

    return {
      point: pt,
      index: idx,
      leftPct: roundFloat(xPct),
      flipLeft: xPct > 56,
      rows,
    };
  });

  isSeriesVisible(s: KitChartSeries): boolean {
    return this.resolveVisibility(s, this.visibilityOverrides());
  }

  toggleSeries(seriesId: string): void {
    const target = this.series().find((s) => s.id === seriesId);
    if (!target || target.disabled) return;

    const currentVisible = this.visibleSeries();
    const isCurrentlyVisible = currentVisible.some((s) => s.id === seriesId);
    if (isCurrentlyVisible && currentVisible.length <= 1) {
      return;
    }

    this.visibilityOverrides.update((prev) => ({
      ...prev,
      [seriesId]: !isCurrentlyVisible,
    }));

    this.visibleSeriesChange.emit(this.visibleSeries().map((s) => s.id));
  }

  setActiveIndex(index: number | null): void {
    if (index === this.activeIndex()) return;
    this.activeIndex.set(index);
    const pts = this.points();
    const pt =
      index !== null && index >= 0 && index < pts.length ? pts[index] : null;
    this.activePointChange.emit(pt);
  }

  onStageMouseLeave(): void {
    this.setActiveIndex(null);
  }

  onHitBlur(_event: FocusEvent): void {
    this.setActiveIndex(null);
  }

  onHitClick(index: number): void {
    const pts = this.points();
    if (!this.interactive() || index < 0 || index >= pts.length) return;
    this.pointClick.emit(pts[index]);
  }

  onHitKeydown(event: KeyboardEvent, index: number): void {
    const n = this.points().length;
    if (n === 0) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.setActiveIndex(Math.min(n - 1, index + 1));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.setActiveIndex(Math.max(0, index - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setActiveIndex(n - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (this.interactive()) {
        event.preventDefault();
        this.onHitClick(index);
      }
    } else if (event.key === 'Escape') {
      this.setActiveIndex(null);
    }
  }

  getGradientId(seriesId: string): string {
    const safe = seriesId.replace(/[^a-zA-Z0-9_-]/g, '_');
    return `kit-ts-grad-${this.chartUid}-${safe}`;
  }

  private resolveVisibility(
    s: KitChartSeries,
    overrides: Record<string, boolean>,
  ): boolean {
    if (s.disabled) return false;
    if (Object.prototype.hasOwnProperty.call(overrides, s.id)) {
      return overrides[s.id];
    }
    return !s.hiddenByDefault;
  }

  private formatSeriesValue(s: KitChartSeries, val: number): string {
    if (s.formatValue) return s.formatValue(val);
    return s.axis === 'right'
      ? this.rightAxisFormatter()(val)
      : this.leftAxisFormatter()(val);
  }
}
