// Design reminder: technical editorial, ivory paper, ink navy and signal orange.
// Keep the layout asymmetric and make every distance, unit and uncertainty visible.
import { useMemo, useRef, useState, type ReactNode } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Database,
  ExternalLink,
  FileDown,
  Lightbulb,
  Maximize2,
  Projector,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { BRANDS, PROJECTORS, type Aspect, type ProjectorModel } from "@/lib/projectorData";

type ScreenPreset = {
  id: string;
  label: string;
  diagonal: number;
  widthInches: number;
  heightInches: number;
  widthMeters: number;
  heightMeters: number;
};

const screenAspectRatio = (width: number, height: number) => {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.03) return "1:1";
  if (Math.abs(ratio - 4 / 3) < 0.03) return "4:3";
  if (Math.abs(ratio - 16 / 10) < 0.03) return "16:10";
  if (Math.abs(ratio - 16 / 9) < 0.03) return "16:9";
  return `${ratio.toFixed(2).replace(".", ",")}:1`;
};

const SCREEN_PRESETS: ScreenPreset[] = [
  { id: "screen-100-70x70", label: '100" (1,78 m × 1,78 m)', diagonal: 100, widthInches: 70, heightInches: 70, widthMeters: 1.78, heightMeters: 1.78 },
  { id: "screen-120-84x84", label: '120" (2,13 m × 2,13 m)', diagonal: 120, widthInches: 84, heightInches: 84, widthMeters: 2.13, heightMeters: 2.13 },
  { id: "screen-135-96x96", label: '135" (2,44 m × 2,44 m)', diagonal: 135, widthInches: 96, heightInches: 96, widthMeters: 2.44, heightMeters: 2.44 },
  { id: "screen-150-120x90", label: '150" (3,05 m × 2,3 m)', diagonal: 150, widthInches: 120, heightInches: 90, widthMeters: 3.05, heightMeters: 2.3 },
  { id: "screen-170-120x120", label: '170" (3,05 m × 3,05 m)', diagonal: 170, widthInches: 120, heightInches: 120, widthMeters: 3.05, heightMeters: 3.05 },
  { id: "screen-200-140x140", label: '200" (3,66 m × 3,66 m)', diagonal: 200, widthInches: 140, heightInches: 140, widthMeters: 3.66, heightMeters: 3.66 },
  { id: "screen-200-160x120", label: '200" (4,07 m × 3,05 m)', diagonal: 200, widthInches: 160, heightInches: 120, widthMeters: 4.07, heightMeters: 3.05 },
  { id: "screen-250-197x147", label: '250" (5,03 m × 3,8 m)', diagonal: 250, widthInches: 197, heightInches: 147, widthMeters: 5.03, heightMeters: 3.8 },
  { id: "screen-300-236x177", label: '300" (6,1 m × 4,6 m)', diagonal: 300, widthInches: 236, heightInches: 177, widthMeters: 6.1, heightMeters: 4.6 },
];

const screenDimensions = (preset: ScreenPreset) => ({ width: preset.widthMeters, height: preset.heightMeters });
const formatScreenNumber = (value: number) => value.toFixed(1).replace(/\.0$/, "").replace(".", ",");
const formatScreenMeters = (value: number) => value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
const screenShortLabel = (preset: ScreenPreset) => `MÀN ${formatScreenNumber(preset.diagonal)}" (${formatScreenMeters(preset.widthMeters)} m × ${formatScreenMeters(preset.heightMeters)} m)`;
const screenOptionLabel = (preset: ScreenPreset) => screenShortLabel(preset);
const screenAdviceLabel = (preset: ScreenPreset) => `${screenShortLabel(preset)} · tỷ lệ ${screenAspectRatio(preset.widthMeters, preset.heightMeters)}`;

const formatMeters = (value: number) => `${value.toFixed(2).replace(".", ",")} m`;
const formatThrowRange = (min: number | null, max: number | null) => min === null || max === null ? "Chưa có throw ratio" : `${min.toFixed(2).replace(".", ",")} – ${max.toFixed(2).replace(".", ",")}:1`;
const compareModelPrices = (left: number | null, right: number | null) => left === null && right === null ? 0 : left === null ? 1 : right === null ? -1 : left - right;

type GuideIllustrationType = "flow" | "room" | "screen" | "distance" | "compare" | "pdf" | "add-model";
type GuideStep = { number: string; title: string; description: ReactNode; action: string; illustration: GuideIllustrationType };

const GUIDE_STEPS: GuideStep[] = [
  { number: "01", title: "Chọn luồng tính", description: <>Chọn <strong>Tính theo phòng</strong> nếu chưa biết máy. Chọn <strong>Tính theo model</strong> nếu đã có hãng, model và muốn kiểm tra vị trí lắp.</>, action: "Bấm một trong hai thẻ ở thanh chuyển chế độ phía trên khu vực nhập liệu.", illustration: "flow" },
  { number: "02", title: "Nhập kích thước phòng", description: <>Điền <strong>Chiều rộng</strong> và <strong>Chiều dài</strong> phòng bằng mét. Hai ô để trống mặc định để tránh dùng nhầm số mẫu.</>, action: "Nhập số đo thực tế vào hai ô có đơn vị m, sau đó kiểm tra diện tích sàn.", illustration: "room" },
  { number: "03", title: "Chọn màn và model", description: <>Chọn một preset màn chiếu hoặc <strong>Màn tùy chỉnh</strong>. Ở luồng theo model, chọn hãng và model có dữ liệu throw ratio.</>, action: "Mở bộ chọn màn, hãng hoặc model ở cột thông tin phòng bên trái.", illustration: "screen" },
  { number: "04", title: "Đọc kết quả và vùng lắp đặt", description: <>Kết quả gồm <strong>Màn chiếu</strong>, <strong>Khoảng lắp khuyến nghị</strong> và <strong>Máy chiếu</strong>. Dải min – max là vùng đặt máy từ thấu kính đến mặt màn.</>, action: "Đọc ba ô kết quả, sau đó đặt thấu kính trong dải khoảng cách màu xanh.", illustration: "distance" },
  { number: "05", title: "So sánh model", description: <>Mở tab <strong>So sánh</strong> để đặt hai model cạnh nhau theo độ sáng, độ phân giải, aspect ratio, throw ratio và nguồn dữ liệu.</>, action: "Chọn Model A và Model B, sau đó đọc bảng đối chiếu thông số.", illustration: "compare" },
  { number: "06", title: "Xuất báo cáo PDF", description: <>Khi đã nhập đủ phòng, bấm <strong>Xuất PDF</strong> trong thẻ kết quả để lưu phương án, vùng lắp, sơ đồ và cảnh báo kỹ thuật.</>, action: "Bấm nút Xuất PDF ở góc phải thẻ kết quả để chia sẻ phương án.", illustration: "pdf" },
  { number: "07", title: "Thêm model mới", description: <>Nếu model chưa có trong catalog, chọn <strong>Thêm model</strong> rồi nhập tên model và thông số lấy từ datasheet chính thức.</>, action: "Chuẩn bị hãng, tên model, độ sáng, độ phân giải, tỷ lệ khung hình và throw ratio min/max trước khi nhập.", illustration: "add-model" },
];

function GuideIllustration({ type }: { type: GuideIllustrationType }) {
  if (type === "flow") return <div className="guide-illustration guide-illustration-flow" role="img" aria-label="Minh họa chọn luồng tính theo phòng hoặc theo model"><span className="guide-illus-label">CHỌN LUỒNG</span><div className="guide-flow-card active"><Sparkles size={17} /><strong>Tính theo phòng</strong><small>Nhập phòng → gợi ý</small></div><div className="guide-flow-card"><Projector size={17} /><strong>Tính theo model</strong><small>Chọn máy → khoảng cách</small></div></div>;
  if (type === "room") return <div className="guide-illustration guide-illustration-room" role="img" aria-label="Minh họa nhập chiều rộng và chiều dài phòng"><span className="guide-illus-label">THÔNG TIN PHÒNG</span><div className="guide-field-row"><div><small>CHIỀU RỘNG</small><strong>____</strong><em>m</em></div><div><small>CHIỀU DÀI</small><strong>____</strong><em>m</em></div></div><span className="guide-measure-line"><i />kích thước thực tế<i /></span><div className="guide-area-note">Diện tích sàn <b>— m²</b></div></div>;
  if (type === "screen") return <div className="guide-illustration guide-illustration-screen" role="img" aria-label="Minh họa chọn màn chiếu và model"><span className="guide-illus-label">MÀN CHIẾU / MODEL</span><div className="guide-select"><small>KÍCH THƯỚC MÀN</small><strong>MÀN 150" (3,05 m × 2,3 m)</strong><ChevronDown size={15} /></div><div className="guide-select"><small>MODEL MÁY CHIẾU</small><strong>Panasonic PT-LB306</strong><ChevronDown size={15} /></div></div>;
  if (type === "distance") return <div className="guide-illustration guide-illustration-distance guide-result-mock" role="img" aria-label="Minh họa ba ô kết quả và vùng khoảng cách lắp đặt"><span className="guide-illus-label">KẾT QUẢ / MODEL GỢI Ý</span><div className="guide-result-kpis"><div><small>MÀN CHIẾU</small><strong>MÀN 150&quot;</strong><em>3,05 m × 2,3 m</em></div><div className="focus"><small>KHOẢNG LẮP</small><strong>5,54 m</strong><em>Vùng: 4,44 – 7,20 m</em></div><div><small>MÁY CHIẾU</small><strong>PT-LMZ460</strong><em>4.600 ANSI lm</em></div></div><div className="guide-result-axis"><span className="guide-result-projector"><Projector size={15} /></span><i /><b>4,44 m – 7,20 m</b><span className="guide-result-screen">MÀN</span></div><span className="guide-result-caption">Đặt thấu kính trong dải màu xanh</span></div>;
  if (type === "compare") return <div className="guide-illustration guide-illustration-compare" role="img" aria-label="Minh họa bảng so sánh hai model"><span className="guide-illus-label">ĐỐI CHIẾU THIẾT BỊ</span><div className="guide-compare-head"><span>Thông số</span><strong>Model A</strong><strong>Model B</strong></div>{["Độ sáng", "Độ phân giải", "Throw ratio"].map((row) => <div className="guide-compare-row" key={row}><span>{row}</span><b>—</b><b>—</b></div>)}</div>;
  if (type === "add-model") return <div className="guide-illustration guide-illustration-add-model" role="img" aria-label="Minh họa nhập model mới từ datasheet"><span className="guide-illus-label">THÊM MODEL / DATASHEET</span><div className="guide-add-field"><small>TÊN MODEL</small><strong>PT-NEW-001</strong></div><div className="guide-add-grid"><div><small>THROW MIN</small><strong>1,20 : 1</strong></div><div><small>THROW MAX</small><strong>1,80 : 1</strong></div><div><small>ĐỘ SÁNG</small><strong>4.000 lm</strong></div><div><small>ĐỘ PHÂN GIẢI</small><strong>WUXGA</strong></div></div><div className="guide-add-note"><Database size={15} />Chỉ nhập số liệu có trong datasheet chính thức</div></div>;
  return <div className="guide-illustration guide-illustration-pdf" role="img" aria-label="Minh họa xuất báo cáo PDF"><span className="guide-illus-label">BÁO CÁO TÍNH TOÁN</span><div className="guide-pdf-page"><div className="guide-pdf-title">Bố trí máy chiếu</div><div className="guide-pdf-line wide" /><div className="guide-pdf-line" /><div className="guide-pdf-line short" /><div className="guide-pdf-schematic"><span /><span /><span /></div></div><div className="guide-pdf-action"><FileDown size={18} />XUẤT PDF</div></div>;
}
const formatPrice = (price: number | null) => price === null ? "Giá liên hệ" : `${new Intl.NumberFormat("vi-VN").format(price)} đ`;

function Field({ label, hint, hintId, children }: { label: string; hint?: string; hintId?: string; children: ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span id={hintId} className="field-hint">{hint}</span>}
    </label>
  );
}

function SelectField({ value, onChange, children, ariaLabel }: { value: string; onChange: (value: string) => void; children: ReactNode; ariaLabel: string }) {
  return (
    <div className="select-wrap">
      <select aria-label={ariaLabel} value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
      <ChevronDown size={16} aria-hidden="true" />
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, tone = "navy" }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: "navy" | "orange" | "teal" }) {
  return (
    <div className={`metric metric-${tone}`}>
      <div className="metric-icon"><Icon size={17} strokeWidth={1.8} /></div>
      <div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div></div>
    </div>
  );
}

function ComparePanel({ modelA, modelB, onChangeA, onChangeB }: { modelA: ProjectorModel; modelB: ProjectorModel; onChangeA: (id: string) => void; onChangeB: (id: string) => void }) {
  const brightnessDelta = modelA.brightness - modelB.brightness;
  const comparisonRows = [
    { label: "Hãng / model", left: `${modelA.brand} / ${modelA.model}`, right: `${modelB.brand} / ${modelB.model}`, kind: "identity" },
    { label: "Độ sáng", left: `${modelA.brightness.toLocaleString("vi-VN")} ANSI lm`, right: `${modelB.brightness.toLocaleString("vi-VN")} ANSI lm`, kind: "numeric", winner: brightnessDelta > 0 ? "left" : brightnessDelta < 0 ? "right" : "same" },
    { label: "Độ phân giải", left: modelA.resolution, right: modelB.resolution, kind: "text" },
    { label: "Tỷ lệ khung hình", left: modelA.aspect, right: modelB.aspect, kind: "text" },
    { label: "Throw ratio", left: formatThrowRange(modelA.throwMin, modelA.throwMax), right: formatThrowRange(modelB.throwMin, modelB.throwMax), kind: "data" },
    { label: "Kích thước màn hỗ trợ", left: `${modelA.screenMin} – ${modelA.screenMax} inch`, right: `${modelB.screenMin} – ${modelB.screenMax} inch`, kind: "data" },
    { label: "Nguồn sáng", left: modelA.lightSource, right: modelB.lightSource, kind: "text" },
    { label: "Nhóm sử dụng", left: modelA.category, right: modelB.category, kind: "text" },
    { label: "Giá trong catalog", left: formatPrice(modelA.price), right: formatPrice(modelB.price), kind: "data" },
    { label: "Nguồn dữ liệu", left: modelA.dataOrigin, right: modelB.dataOrigin, kind: "source" },
  ];

  return (
    <section className="compare-section" aria-label="So sánh hai model máy chiếu">
      <div className="compare-heading"><div><div className="section-kicker">ĐỐI CHIẾU THIẾT BỊ / 06</div><h2>Đặt hai model lên cùng một mặt bàn.</h2><p>So sánh nhanh thông số quan trọng trước khi đưa model vào bài toán phòng và màn chiếu.</p></div><div className="compare-count"><span>{PROJECTORS.length}</span> model trong catalog</div></div>
      <div className="compare-select-grid"><div className="compare-select-card"><span className="compare-tag tag-a">A</span><div><span className="field-label">Model A</span><SelectField ariaLabel="Model A để so sánh" value={modelA.id} onChange={onChangeA}>{PROJECTORS.map((item) => <option key={item.id} value={item.id}>{item.brand} / {item.model}</option>)}</SelectField></div></div><div className="compare-vs">VS</div><div className="compare-select-card"><span className="compare-tag tag-b">B</span><div><span className="field-label">Model B</span><SelectField ariaLabel="Model B để so sánh" value={modelB.id} onChange={onChangeB}>{PROJECTORS.map((item) => <option key={item.id} value={item.id}>{item.brand} / {item.model}</option>)}</SelectField></div></div></div>
      <div className="compare-insights"><div><Ruler size={16} /><span>Throw ratio</span><strong>{modelA.throwMin !== null && modelB.throwMin !== null ? "Cả hai model đều có thể tính khoảng cách" : "Một model đang thiếu throw ratio"}</strong></div><div><Lightbulb size={16} /><span>Độ sáng</span><strong>{brightnessDelta === 0 ? "Hai model cùng độ sáng" : `${Math.abs(brightnessDelta).toLocaleString("vi-VN")} lm chênh lệch · ${brightnessDelta > 0 ? modelA.model : modelB.model} sáng hơn`}</strong></div><div><Database size={16} /><span>Độ tin cậy</span><strong>Giữ nguyên trạng thái “chưa có dữ liệu”, không suy đoán</strong></div></div>
      <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Thông số</th><th><span className="table-badge tag-a">A</span>{modelA.brand} / {modelA.model}</th><th><span className="table-badge tag-b">B</span>{modelB.brand} / {modelB.model}</th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.label}><th>{row.label}</th><td className={row.winner === "left" ? "winner" : row.kind === "source" ? "muted-cell" : ""}>{row.left}{row.winner === "left" && <CheckCircle2 size={14} />}</td><td className={row.winner === "right" ? "winner" : row.kind === "source" ? "muted-cell" : ""}>{row.right}{row.winner === "right" && <CheckCircle2 size={14} />}</td></tr>)}</tbody></table></div>
      <div className="compare-footnote"><CircleHelp size={15} /><span>Throw ratio là điều kiện bắt buộc để tính khoảng cách lắp đặt. Model thiếu trường này vẫn có thể so sánh thông số, nhưng cần bổ sung từ datasheet hoặc công cụ tính chính thức trước khi thi công.</span></div>
    </section>
  );
}

export default function Home() {
  const [brand, setBrand] = useState("");
  const [modelId, setModelId] = useState("");
  const [roomWidthByRoom, setRoomWidthByRoom] = useState<number | "">("");
  const [roomDepthByRoom, setRoomDepthByRoom] = useState<number | "">("");
  const [roomWidthByProjector, setRoomWidthByProjector] = useState<number | "">("");
  const [roomDepthByProjector, setRoomDepthByProjector] = useState<number | "">("");
  const [roomWidthInputByRoom, setRoomWidthInputByRoom] = useState("");
  const [roomDepthInputByRoom, setRoomDepthInputByRoom] = useState("");
  const [roomWidthInputByProjector, setRoomWidthInputByProjector] = useState("");
  const [roomDepthInputByProjector, setRoomDepthInputByProjector] = useState("");
  const [roomValidationErrorByRoom, setRoomValidationErrorByRoom] = useState("");
  const [roomValidationErrorByProjector, setRoomValidationErrorByProjector] = useState("");
  const [screenPresetId, setScreenPresetId] = useState("");
  const [customScreenWidth, setCustomScreenWidth] = useState(3.05);
  const [customScreenHeight, setCustomScreenHeight] = useState(2.3);
  const [customScreenUnit, setCustomScreenUnit] = useState<"m" | "in">("m");
  const [unknownMode, setUnknownMode] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customBrightness, setCustomBrightness] = useState(4000);
  const [customResolution, setCustomResolution] = useState("FHD · 1920 × 1080");
  const [customAspect, setCustomAspect] = useState<Aspect>("16:9");
  const [customThrowMin, setCustomThrowMin] = useState(1.2);
  const [customThrowMax, setCustomThrowMax] = useState(1.8);
  const [activeSection, setActiveSection] = useState<"calculator" | "compare" | "guide">("calculator");
  const [activeGuideStep, setActiveGuideStep] = useState("01");
    const [calcMode, setCalcMode] = useState<"by-projector" | "by-room">("by-room");
  const [compareAId, setCompareAId] = useState("panasonic-pt-vmz51");
  const [compareBId, setCompareBId] = useState("acer-x1128h");
  const resultRef = useRef<HTMLElement | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const isRoomMode = calcMode === "by-room";
  const roomWidth = isRoomMode ? roomWidthByRoom : roomWidthByProjector;
  const roomDepth = isRoomMode ? roomDepthByRoom : roomDepthByProjector;
  const roomWidthInput = isRoomMode ? roomWidthInputByRoom : roomWidthInputByProjector;
  const roomDepthInput = isRoomMode ? roomDepthInputByRoom : roomDepthInputByProjector;
  const roomValidationError = isRoomMode ? roomValidationErrorByRoom : roomValidationErrorByProjector;
  const setRoomWidth = isRoomMode ? setRoomWidthByRoom : setRoomWidthByProjector;
  const setRoomDepth = isRoomMode ? setRoomDepthByRoom : setRoomDepthByProjector;
  const setRoomWidthInput = isRoomMode ? setRoomWidthInputByRoom : setRoomWidthInputByProjector;
  const setRoomDepthInput = isRoomMode ? setRoomDepthInputByRoom : setRoomDepthInputByProjector;
  const setRoomValidationError = isRoomMode ? setRoomValidationErrorByRoom : setRoomValidationErrorByProjector;

  const customScreenPreset = useMemo<ScreenPreset>(() => {
    const widthMeters = Math.max(0.1, Number(customScreenWidth) || 0.1) * (customScreenUnit === "in" ? 0.0254 : 1);
    const heightMeters = Math.max(0.1, Number(customScreenHeight) || 0.1) * (customScreenUnit === "in" ? 0.0254 : 1);
    const widthInches = widthMeters / 0.0254;
    const heightInches = heightMeters / 0.0254;
    const diagonal = Math.sqrt(widthInches ** 2 + heightInches ** 2);
    const formatValue = (value: number) => value.toFixed(2).replace(/\.00$/, "").replace(".", ",");
    return {
      id: "custom-screen",
      label: `Tùy chỉnh · ${formatValue(widthMeters)} m × ${formatValue(heightMeters)} m`,
      diagonal,
      widthInches,
      heightInches,
      widthMeters,
      heightMeters,
    };
  }, [customScreenHeight, customScreenUnit, customScreenWidth]);

  const screenChoiceOptions = [...SCREEN_PRESETS, customScreenPreset];

  const brandModels = useMemo(() => PROJECTORS.filter((projector) => projector.brand === brand), [brand]);

  const hasRoomDimensions = roomWidth !== "" && roomDepth !== "";
  const safeRoomWidth = roomWidth === "" ? 0 : roomWidth;
  const safeRoomDepth = roomDepth === "" ? 0 : roomDepth;
  const roomArea = hasRoomDimensions ? safeRoomWidth * safeRoomDepth : 0;
  const brightnessTarget = !hasRoomDimensions ? 0 : roomArea < 20 ? 3000 : roomArea < 40 ? 4000 : roomArea < 70 ? 5000 : 6500;
  const roomPackages = useMemo(() => PROJECTORS.map((candidate) => {
    const options = SCREEN_PRESETS.map((preset) => {
      const candidateScreen = screenDimensions(preset);
      const hasThrowRatio = candidate.throwMin !== null && candidate.throwMax !== null;
      const candidateMin = hasThrowRatio ? candidateScreen.width * candidate.throwMin! : 0;
      const candidateMax = hasThrowRatio ? candidateScreen.width * candidate.throwMax! : 0;
      const wallFit = candidateScreen.width <= safeRoomWidth * 0.85;
      const depthFit = hasThrowRatio && candidateMin <= safeRoomDepth && candidateMax <= safeRoomDepth;
      const brightnessFit = candidate.brightness >= brightnessTarget;
      const distanceGap = hasThrowRatio ? Math.abs(safeRoomDepth - (candidateMin + candidateMax) / 2) / Math.max(safeRoomDepth, 1) : 4;
      const fitPenalty = (wallFit ? 0 : 2) + (depthFit ? 0 : 2) + (brightnessFit ? 0 : 0.8) + (hasThrowRatio ? 0 : 4);
      return { screenPreset: preset, candidateMin, candidateMax, wallFit, depthFit, brightnessFit, fitsDistance: depthFit, fits: wallFit && depthFit && brightnessFit, score: fitPenalty + distanceGap * 0.45 - preset.diagonal / 1000 };
    }).sort((a, b) => a.score - b.score)[0];
    return { candidate, ...options };
  }).sort((a, b) => a.score - b.score), [brightnessTarget, safeRoomDepth, safeRoomWidth]);

  const selectedModel = PROJECTORS.find((projector) => projector.id === modelId) ?? PROJECTORS[0];
  const compareA = PROJECTORS.find((projector) => projector.id === compareAId) ?? PROJECTORS[0];
  const compareB = PROJECTORS.find((projector) => projector.id === compareBId) ?? PROJECTORS[1] ?? PROJECTORS[0];
  const roomRecommendation = roomPackages[0] ?? { candidate: PROJECTORS[0], screenPreset: SCREEN_PRESETS[0], candidateMin: 0, candidateMax: 0, wallFit: false, depthFit: false, brightnessFit: false, fitsDistance: false, fits: false, score: 99 };
  const projector: ProjectorModel = calcMode === "by-room" ? roomRecommendation.candidate : unknownMode
    ? { ...selectedModel, id: "custom", model: customName || "Model tự nhập", brightness: Number(customBrightness) || 0, resolution: customResolution, aspect: customAspect, throwMin: Number(customThrowMin) || 0, throwMax: Number(customThrowMax) || 0, source: "", price: null, dataOrigin: "Thông số do người dùng nhập" }
    : selectedModel;
  const selectedScreenPreset = screenChoiceOptions.find((preset) => preset.id === screenPresetId) ?? SCREEN_PRESETS[0];
  const suggestedScreen = roomRecommendation.screenPreset;
  const calculationScreenPreset = calcMode === "by-room" ? roomRecommendation.screenPreset : selectedScreenPreset;
  const hasSelectedProjector = calcMode === "by-room" || (unknownMode ? customName.trim().length > 0 : Boolean(brand && modelId));
  const hasSelectedScreen = calcMode === "by-room" || Boolean(screenPresetId);
  const hasCalculationInputs = calcMode === "by-room" ? hasRoomDimensions : hasSelectedProjector && hasSelectedScreen;
  const screen = screenDimensions(calculationScreenPreset);
  const hasThrowRatio = projector.throwMin !== null && projector.throwMax !== null;
  const minDistance = hasThrowRatio ? screen.width * projector.throwMin! : null;
  const maxDistance = hasThrowRatio ? screen.width * projector.throwMax! : null;
  const idealDistance = minDistance !== null && maxDistance !== null ? (minDistance + maxDistance) / 2 : null;
  const screenFitsWall = !hasRoomDimensions || screen.width <= safeRoomWidth * 0.85;
  const distanceFitsRoom = !hasRoomDimensions || (maxDistance !== null && maxDistance <= safeRoomDepth);
  const overallReady = hasThrowRatio && projector.throwMin! > 0 && projector.throwMax! > projector.throwMin! && (calcMode === "by-projector" || (screenFitsWall && distanceFitsRoom));
  const idealDistanceLabel = idealDistance === null ? "Chưa đủ data" : formatMeters(idealDistance);
  const distanceRangeLabel = minDistance === null || maxDistance === null ? "Chưa có throw ratio" : `${formatMeters(minDistance)} – ${formatMeters(maxDistance)}`;

  const suggestions = useMemo(() => {
    if (!hasRoomDimensions) return [];
    if (calcMode === "by-room") {
      return roomPackages.filter(({ candidate }) => candidate.id !== projector.id).sort((a, b) => Number(b.fits) - Number(a.fits) || compareModelPrices(a.candidate.price, b.candidate.price) || a.score - b.score).slice(0, 3);
    }
    const candidateScreen = screenDimensions(selectedScreenPreset);
    return PROJECTORS.filter((candidate) => candidate.id !== projector.id).map((candidate) => {
      const hasCandidateThrow = candidate.throwMin !== null && candidate.throwMax !== null;
      const candidateMin = hasCandidateThrow ? candidateScreen.width * candidate.throwMin! : 0;
      const candidateMax = hasCandidateThrow ? candidateScreen.width * candidate.throwMax! : 0;
      const fitsDistance = hasCandidateThrow && safeRoomDepth >= candidateMin && safeRoomDepth <= candidateMax + 1.25;
      const brightnessGap = Math.abs(candidate.brightness - brightnessTarget) / Math.max(brightnessTarget, 1);
      const distanceGap = hasCandidateThrow ? Math.abs(safeRoomDepth - (candidateMin + candidateMax) / 2) / Math.max(safeRoomDepth, 1) : 4;
      return { candidate, screenPreset: selectedScreenPreset, candidateMin, candidateMax, fitsDistance, score: distanceGap * 0.56 + brightnessGap * 0.44 };
    }).sort((a, b) => Number(b.fitsDistance) - Number(a.fitsDistance) || compareModelPrices(a.candidate.price, b.candidate.price) || a.score - b.score).slice(0, 3);
  }, [brightnessTarget, calcMode, hasRoomDimensions, projector.id, roomPackages, safeRoomDepth, selectedScreenPreset]);

  const exportPdf = async () => {
    if (!resultRef.current || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true, backgroundColor: "#f8f5ef", logging: false, onclone: (clonedDocument) => {
        clonedDocument.querySelectorAll(".pdf-no-print, .pdf-secondary").forEach((element) => { (element as HTMLElement).style.display = "none"; });
        const schematic = clonedDocument.querySelector(".room-schematic") as HTMLElement | null;
        if (schematic) { schematic.style.height = "auto"; schematic.style.aspectRatio = "4 / 3"; }
      } });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const imageHeight = (canvas.height * contentWidth) / canvas.width;
      const imageData = canvas.toDataURL("image/jpeg", 0.92);
      let remainingHeight = imageHeight;
      pdf.addImage(imageData, "JPEG", margin, margin, contentWidth, imageHeight);
      remainingHeight -= pageHeight - margin * 2;
      while (remainingHeight > 0) {
        pdf.addPage();
        const imageOffset = margin - (imageHeight - remainingHeight);
        pdf.addImage(imageData, "JPEG", margin, imageOffset, contentWidth, imageHeight);
        remainingHeight -= pageHeight - margin * 2;
      }
      const safeModel = projector.model.replace(/[^a-z0-9-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
      const stamp = new Date().toISOString().slice(0, 10);
      pdf.save(`bo-tri-may-chieu-${safeModel || "bao-cao"}-${stamp}.pdf`);
    } catch (error) {
      console.error("Không thể xuất PDF", error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const setRoomValue = (setter: (value: number | "") => void, rawSetter: (value: string) => void, label: string, value: string) => {
    rawSetter(value);
    const normalized = value.trim();
    if (normalized === "") {
      setter("");
      setRoomValidationError((current) => current.startsWith(label) ? "" : current);
      return;
    }
    const parsed = Number(normalized);
    if (!Number.isFinite(parsed) || parsed < 0.5 || parsed > 100) {
      setter("");
      setRoomValidationError(`${label} phải từ 0,5 đến 100 m.`);
      return;
    }
    setter(parsed);
    setRoomValidationError((current) => current.startsWith(label) ? "" : current);
  };

  const openCalculator = (mode: "by-projector" | "by-room") => { if (activeSection === "calculator" && calcMode === mode) { window.location.reload(); return; } setActiveSection("calculator"); setCalcMode(mode); };

  const inputPanel = (
    <aside className="dashboard-card dashboard-form-card">
      <div className="dashboard-cardhead"><div><h2>Thông tin phòng</h2><span className="step-label">01 / INPUT</span></div><SlidersHorizontal size={18} /></div>
      <div className="dashboard-form">
        <div className="field-grid"><Field label="Chiều rộng" hintId="room-width-hint" hint={calcMode === "by-projector" ? "Tùy chọn · mặt tường đặt màn" : "Mặt tường đặt màn"}><div className="unit-input"><input id="room-width" type="number" min="0.5" max="100" step="0.1" placeholder="Nhập kích thước" aria-label="Chiều rộng phòng" aria-describedby="room-width-hint room-validation" value={roomWidthInput} onChange={(event) => setRoomValue(setRoomWidth, setRoomWidthInput, "Chiều rộng phòng", event.target.value)} /><span>m</span></div></Field><Field label="Chiều dài" hintId="room-depth-hint" hint={calcMode === "by-projector" ? "Tùy chọn · từ màn đến tường sau" : "Từ màn đến tường sau"}><div className="unit-input"><input id="room-depth" type="number" min="0.5" max="100" step="0.1" placeholder="Nhập kích thước" aria-label="Chiều dài phòng" aria-describedby="room-depth-hint room-validation" value={roomDepthInput} onChange={(event) => setRoomValue(setRoomDepth, setRoomDepthInput, "Chiều dài phòng", event.target.value)} /><span>m</span></div></Field></div>{roomValidationError && <p id="room-validation" className="field-error" role="alert">{roomValidationError}</p>}
        <div className="field"><Field label="Loại không gian"><SelectField ariaLabel="Loại không gian" value={roomArea > 60 ? "Hội trường / không gian lớn" : roomArea > 30 ? "Phòng họp / văn phòng" : "Phòng nhỏ / lớp học"} onChange={() => undefined}><option>Phòng họp / văn phòng</option><option>Phòng nhỏ / lớp học</option><option>Hội trường / không gian lớn</option></SelectField></Field></div>
        <div className="room-summary"><span>Diện tích sàn</span><strong>{hasRoomDimensions ? `${roomArea.toFixed(1).replace(".", ",")} m²` : "—"}</strong><span className="room-type">{hasRoomDimensions ? roomArea > 60 ? "Hội trường / không gian lớn" : roomArea > 30 ? "Phòng họp tiêu chuẩn" : "Phòng nhỏ / lớp học" : "Chưa nhập kích thước phòng"}</span></div>
        {calcMode === "by-room" ? <div className="room-mode-card"><div className="custom-title"><Sparkles size={15} />Đề xuất tự động từ phòng</div><p>{hasRoomDimensions ? "Chọn màn trong phạm vi bề ngang tường rồi xếp model theo vùng throw và độ sáng." : "Nhập rộng và dài phòng để hệ thống bắt đầu chọn màn chiếu và model phù hợp."}</p>{hasRoomDimensions && <><div className="auto-screen-line"><span>Màn dự kiến</span><strong>{screenAdviceLabel(suggestedScreen)}</strong></div><div className="auto-model-line"><span>Model đứng đầu</span><strong>{roomRecommendation.candidate.brand} / {roomRecommendation.candidate.model}</strong></div></>}</div> : <>
          <div className="divider-label"><span>02 / MÀN CHIẾU</span><span className="label-rule" /></div>
          <Field label="Kích thước màn đang tính" hint={`Gợi ý theo tường: ${suggestedScreen.diagonal.toFixed(0)}"`}><SelectField ariaLabel="Kích thước màn chiếu" value={selectedScreenPreset.id === SCREEN_PRESETS[0].id && !screenPresetId ? "" : selectedScreenPreset.id} onChange={setScreenPresetId}><option value="" disabled>Chọn kích thước màn</option>{screenChoiceOptions.map((preset) => <option key={preset.id} value={preset.id}>{screenOptionLabel(preset)}</option>)}</SelectField></Field>
          {selectedScreenPreset.id === "custom-screen" && <div className="custom-screen-box"><div className="custom-title"><Maximize2 size={15} />Nhập màn chiếu thực tế</div><div className="field-grid compact"><Field label="Chiều ngang"><div className="unit-input"><input type="number" min="0.1" step="0.01" value={customScreenWidth} onChange={(event) => setCustomScreenWidth(Math.max(0.1, Number(event.target.value) || 0.1))} /><span>{customScreenUnit}</span></div></Field><Field label="Chiều cao"><div className="unit-input"><input type="number" min="0.1" step="0.01" value={customScreenHeight} onChange={(event) => setCustomScreenHeight(Math.max(0.1, Number(event.target.value) || 0.1))} /><span>{customScreenUnit}</span></div></Field></div><Field label="Đơn vị nhập"><SelectField ariaLabel="Đơn vị màn tùy chỉnh" value={customScreenUnit} onChange={(value) => setCustomScreenUnit(value as "m" | "in")}><option value="m">Mét (m)</option><option value="in">Inch (&quot;)</option></SelectField></Field><div className="custom-screen-summary">Đường chéo tham khảo: <strong>≈ {customScreenPreset.diagonal.toFixed(1).replace(".", ",")}&quot;</strong></div></div>}
          <div className="divider-label"><span>03 / MÁY CHIẾU</span><span className="label-rule" /></div>
          <Field label="Hãng máy chiếu"><SelectField ariaLabel="Hãng máy chiếu" value={brand} onChange={(value) => { setBrand(value); setModelId(""); }}><option value="" disabled>Chọn hãng máy chiếu</option>{BRANDS.map((item) => <option key={item} value={item}>{item}</option>)}</SelectField></Field>
          <Field label="Model máy"><SelectField ariaLabel="Model máy chiếu" value={modelId} onChange={setModelId}><option value="" disabled>{brand ? "Chọn model máy chiếu" : "Chọn hãng trước"}</option>{brandModels.map((item) => <option key={item.id} value={item.id}>{item.model}</option>)}</SelectField></Field>
          <div className="catalog-note" aria-live="polite"><Database size={14} /><span>{brand ? `${brandModels.length} model ${brand} · ${brandModels.filter((item) => item.throwMin !== null && item.throwMax !== null).length} model có throw ratio` : "Chọn hãng để xem danh sách model"}</span></div>
          <button className={unknownMode ? "data-toggle selected" : "data-toggle"} onClick={() => setUnknownMode((value) => !value)}><span className="toggle-check">{unknownMode && <Check size={13} />}</span><span>Model chưa có trong dữ liệu?</span><ArrowRight size={15} /></button>
          {unknownMode && <div className="custom-data-box"><div className="custom-title"><Database size={15} />Nhập thông số từ datasheet</div><Field label="Tên model"><input className="text-input" value={customName} onChange={(event) => setCustomName(event.target.value)} /></Field><div className="field-grid compact"><Field label="Throw min"><div className="unit-input"><input type="number" min="0.1" step="0.01" value={customThrowMin} onChange={(event) => setCustomThrowMin(Number(event.target.value))} /><span>:1</span></div></Field><Field label="Throw max"><div className="unit-input"><input type="number" min="0.1" step="0.01" value={customThrowMax} onChange={(event) => setCustomThrowMax(Number(event.target.value))} /><span>:1</span></div></Field></div><div className="field-grid compact"><Field label="Độ sáng"><div className="unit-input"><input type="number" min="0" step="100" value={customBrightness} onChange={(event) => setCustomBrightness(Number(event.target.value))} /><span>lm</span></div></Field><Field label="Tỷ lệ khung"><SelectField ariaLabel="Tỷ lệ khung hình model tự nhập" value={customAspect} onChange={(value) => setCustomAspect(value as Aspect)}><option value="16:9">16:9</option><option value="16:10">16:10</option></SelectField></Field></div><Field label="Độ phân giải"><input className="text-input" value={customResolution} onChange={(event) => setCustomResolution(event.target.value)} /></Field><div className="custom-warning"><AlertTriangle size={15} />Kết quả từ dữ liệu tự nhập chỉ mang tính tham khảo.</div></div>}
        </>}
      </div>
      <div className="criteria-box"><span>Tiêu chí đang áp dụng</span><div className="criteria-pills"><span>Lens → màn</span><span>{hasSelectedProjector ? projector.aspect : "—"}</span><span>Throw ratio</span></div></div>
    </aside>
  );

  const resultPanel = hasCalculationInputs ? (
    <section ref={resultRef} className="dashboard-card dashboard-result-card" aria-live="polite">
      <div className="dashboard-cardhead"><div><h2>{calcMode === "by-room" ? "Kết quả & model gợi ý" : "Vị trí lắp đặt đề xuất"}</h2><span className="step-label">02 / RESULT</span></div><div className="result-heading-actions"><button type="button" className="pdf-export-button pdf-no-print" onClick={exportPdf} disabled={isExportingPdf}><FileDown size={15} />{isExportingPdf ? "Đang tạo PDF…" : "Xuất PDF"}</button><div className={overallReady ? "ready-chip" : "ready-chip warning"}>{overallReady ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}{overallReady ? "Phù hợp" : "Cần kiểm tra"}</div></div></div>
      <div className="overview-grid"><div className="overview-kpi"><span>Màn chiếu</span><strong>{screenAdviceLabel(calculationScreenPreset)}</strong><small>Chiều ngang dùng để tính: {screen.width.toFixed(2).replace(".", ",")} m · tỷ lệ {screenAspectRatio(screen.width, screen.height)}</small></div><div className="overview-kpi highlight"><span>Khoảng lắp khuyến nghị</span><strong>{idealDistanceLabel}</strong><small>Vùng lắp: {distanceRangeLabel}</small></div><div className="overview-kpi"><span>Máy chiếu</span><strong>{projector.brand} {projector.model}</strong><small>{projector.brightness.toLocaleString("vi-VN")} ANSI lm · {projector.aspect}</small></div></div>
      <div className="recommend-strip"><div><small>ƯU TIÊN</small><strong>{projector.brand} {projector.model}</strong><small>{projector.resolution} · {projector.lightSource}</small></div><div><small>KHOẢNG LẮP</small><strong>{distanceRangeLabel}</strong></div><div><small>THROW RATIO</small><strong>{formatThrowRange(projector.throwMin, projector.throwMax)}</strong></div><div className={overallReady ? "compatible" : "needs-check"}>{overallReady ? "● PHÙ HỢP" : "● CẦN KIỂM TRA"}</div></div>
      <div className="report-meta"><span><b>Phòng</b>{hasRoomDimensions ? `${roomWidth.toFixed(2).replace(".", ",")} m × ${roomDepth.toFixed(2).replace(".", ",")} m · ${roomArea.toFixed(1).replace(".", ",")} m²` : "Chưa nhập kích thước phòng"}</span><span className="pdf-secondary"><b>Màn</b>{screenAdviceLabel(calculationScreenPreset)}</span><span className="pdf-secondary"><b>Nguồn</b>{projector.dataOrigin}</span></div>
      <div className="schematic-card"><div className="schematic-header"><div><span className="model-label">SƠ ĐỒ MẶT CẮT / KHÔNG THEO TỶ LỆ</span><strong>Thấu kính → màn chiếu</strong></div><div className="dimension-pill"><span className="dimension-dot" />Khoảng cách lý tưởng: {idealDistanceLabel}</div></div><div className="room-schematic"><img src="https://projplanvn-7k49qncz.manus.space/manus-storage/projector-room-modern_ecc77659.png" alt="Sơ đồ phòng sáng hiện đại với máy chiếu treo trong vùng lắp đặt và màn chiếu" /><div className="schematic-overlay"><span className="screen-marker">{screenAdviceLabel(calculationScreenPreset)}</span><span className="distance-marker"><i />{distanceRangeLabel}<b>vùng lắp đặt</b></span><span className="projector-marker" style={{ left: `${hasRoomDimensions && idealDistance !== null ? Math.max(25, Math.min(60, 24 + (idealDistance / Math.max(safeRoomDepth, 1)) * 30)) : 28}%`, right: "auto" }}>MÁY CHIẾU<br /><strong>{projector.model}</strong></span></div></div></div>
      <div className="check-row"><div className="check-title"><Sparkles size={17} />Đọc nhanh điều kiện phòng</div>{hasRoomDimensions ? <><div className={screenFitsWall ? "check-item pass" : "check-item fail"}>{screenFitsWall ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}<span><strong>{screenFitsWall ? "Màn vừa tường" : "Màn rộng hơn tường"}</strong><small>{screen.width.toFixed(2).replace(".", ",")} m ngang / tối đa {(roomWidth * 0.85).toFixed(2).replace(".", ",")} m</small></span></div><div className={distanceFitsRoom ? "check-item pass" : "check-item fail"}>{distanceFitsRoom ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}<span><strong>{distanceFitsRoom ? "Khoảng cách đủ" : hasThrowRatio ? "Phòng thiếu chiều sâu" : "Thiếu throw ratio"}</strong><small>{formatMeters(roomDepth)} chiều sâu / {maxDistance === null ? "chưa có dữ liệu khoảng cách" : `cần tối đa ${formatMeters(maxDistance)}`}</small></span></div><div className={projector.brightness >= brightnessTarget ? "check-item pass" : "check-item warn"}>{projector.brightness >= brightnessTarget ? <CheckCircle2 size={16} /> : <Lightbulb size={16} />}<span><strong>{projector.brightness >= brightnessTarget ? "Độ sáng phù hợp" : "Nên tăng độ sáng"}</strong><small>{projector.brightness.toLocaleString("vi-VN")} lm / khuyến nghị từ {brightnessTarget.toLocaleString("vi-VN")} lm</small></span></div></> : <><div className="check-item"><CircleHelp size={16} /><span><strong>Chưa kiểm tra theo phòng</strong><small>Nhập chiều rộng để kiểm tra màn có vừa tường.</small></span></div><div className="check-item"><CircleHelp size={16} /><span><strong>Chưa kiểm tra chiều sâu</strong><small>Nhập chiều dài để đối chiếu vùng khoảng cách.</small></span></div><div className="check-item"><CircleHelp size={16} /><span><strong>Chưa kiểm tra độ sáng</strong><small>Độ sáng sẽ được đánh giá theo diện tích phòng.</small></span></div></>}</div>
      <div className="suggestions pdf-no-print"><div className="suggestions-heading"><div><div className="section-kicker">GỢI Ý MODEL / 03</div><h2>Danh sách đáng xem thêm</h2></div><span>Top 3 · vừa vùng trước · giá thấp → cao</span></div><div className="suggestion-list">{suggestions.map(({ candidate, screenPreset: itemScreenPreset, fitsDistance }, index) => <button className="suggestion-item" key={candidate.id} onClick={() => { setBrand(candidate.brand); setModelId(candidate.id); setUnknownMode(false); }}><span className="suggestion-rank">0{index + 1}</span><span className="suggestion-main"><strong>{candidate.brand} <em>{candidate.model}</em></strong><small>{candidate.resolution} · {candidate.brightness.toLocaleString("vi-VN")} ANSI lm · màn {screenAdviceLabel(itemScreenPreset)} · throw {formatThrowRange(candidate.throwMin, candidate.throwMax)}</small></span><span className={fitsDistance ? "fit-badge" : "fit-badge neutral"}>{fitsDistance ? "Vừa vùng" : candidate.throwMin === null ? "Thiếu data" : "Cần kiểm tra"}</span><ArrowRight size={17} /></button>)}</div></div>
      <div className="result-footnote pdf-no-print"><CircleHelp size={15} />Khoảng cách tính từ thấu kính đến bề mặt màn. Offset, lens shift và giá treo cần được kiểm tra trên manual trước khi thi công.</div>
    </section>
  ) : (
    <section className="dashboard-card dashboard-result-card dashboard-empty-card" aria-live="polite">
      <div className="dashboard-cardhead"><div><h2>Chưa có kết quả</h2><span className="step-label">02 / RESULT</span></div><CircleHelp size={18} /></div>
      <div className="empty-result-state"><div className="empty-result-icon"><Ruler size={25} /></div><h3>{calcMode === "by-projector" ? "Chọn màn, hãng và model để bắt đầu tính" : "Nhập kích thước phòng để bắt đầu tính"}</h3><p>{calcMode === "by-projector" ? <>Chọn <strong>màn chiếu</strong>, <strong>hãng</strong> và <strong>model</strong> ở khung bên trái. Không cần nhập kích thước phòng để tính khoảng cách từ máy đến màn.</> : <>Điền <strong>Chiều rộng</strong> và <strong>Chiều dài</strong> ở khung bên trái. Các ô này được để trống mặc định để nhập kích thước thực tế.</>}</p><span className="empty-result-note">Sau khi đủ dữ liệu, hệ thống sẽ hiện khoảng cách lắp, model phù hợp và sơ đồ mặt cắt.</span></div>
    </section>
  );

  const selectedGuide = GUIDE_STEPS.find((step) => step.number === activeGuideStep) ?? GUIDE_STEPS[0];
  const guidePanel = <section className="guide-section dashboard-guide"><div className="section-kicker">HƯỚNG DẪN SỬ DỤNG / 04</div><h2>Từ kích thước phòng đến phương án lắp.</h2><p className="guide-intro">Chọn từng bước ở cột trái. Phần minh họa bên phải sẽ chỉ rõ nơi cần chọn, cần nhập hoặc cần đọc.</p><div className="guide-workspace"><nav className="guide-index" aria-label="Các bước hướng dẫn">{GUIDE_STEPS.map((step) => <button type="button" key={step.number} className={step.number === selectedGuide.number ? "guide-index-item active" : "guide-index-item"} onClick={() => setActiveGuideStep(step.number)}><span>{step.number}</span><strong>{step.title}</strong><ArrowRight size={15} /></button>)}</nav><article className="guide-detail"><div className="guide-detail-copy"><span className="guide-number">{selectedGuide.number}</span><h3>{selectedGuide.title}</h3><p>{selectedGuide.description}</p><div className="guide-action"><span>CẦN LÀM</span><strong>{selectedGuide.action}</strong></div></div><GuideIllustration type={selectedGuide.illustration} /></article></div><div className="guide-note"><CircleHelp size={15} /><span>Throw ratio thiếu dữ liệu sẽ luôn hiển thị “Chưa có throw ratio”. Trước khi thi công, vẫn cần kiểm tra offset, lens shift, giá treo và manual chính thức của model.</span></div></section>;

  return (
    <div className="app-shell dashboard-shell">
      <a className="skip-link" href="#top">Bỏ qua thanh điều hướng, đến nội dung chính</a>
      <aside className="dashboard-sidebar"><button type="button" className="dashboard-logo" onClick={() => window.location.reload()} aria-label="Thiết bị Văn phòng Thanh Hà, tải lại trang"><img src="https://projplanvn-7k49qncz.manus.space/manus-storage/thanh-ha-office-machines-logo_3a44d862.png" alt="Logo Thiết bị Văn phòng Thanh Hà" /><span><strong>THIẾT BỊ VĂN PHÒNG</strong><b>THANH HÀ</b></span></button><div className="sidebar-label">TƯ VẤN</div><button className={activeSection === "calculator" && calcMode === "by-room" ? "sidebar-nav active" : "sidebar-nav"} onClick={() => openCalculator("by-room")}><span className="sidebar-dot" />Tính theo phòng</button><button className={activeSection === "calculator" && calcMode === "by-projector" ? "sidebar-nav active" : "sidebar-nav"} onClick={() => openCalculator("by-projector")}><Projector size={14} />Tính theo model</button><button className="sidebar-nav" onClick={() => { setUnknownMode(true); openCalculator("by-projector"); }}><Database size={14} />Thêm model</button><button className={activeSection === "guide" ? "sidebar-nav sidebar-guide-nav active" : "sidebar-nav sidebar-guide-nav"} onClick={() => setActiveSection("guide")}><CircleHelp size={14} />Hướng dẫn</button><div className="sidebar-foot">Dữ liệu local · {PROJECTORS.length} model<br />Không thay thế manual lắp đặt</div></aside>
      <div className="dashboard-main"><header className="dashboard-topbar"><div><h1>{activeSection === "compare" ? "Đối chiếu thiết bị" : activeSection === "guide" ? "Hướng dẫn sử dụng" : calcMode === "by-room" ? "Tư vấn theo không gian" : "Tính theo model"}</h1><p>{activeSection === "compare" ? "Đặt hai model lên cùng một mặt bàn trước khi chốt thiết bị." : activeSection === "guide" ? "Các bước nhập dữ liệu, đọc kết quả và xuất báo cáo." : "Chọn phương án thiết bị trước khi đi khảo sát khách hàng."}</p></div><div className="dashboard-top-actions"><button className={activeSection === "calculator" ? "top-tab active" : "top-tab"} onClick={() => openCalculator(calcMode)}>Máy tính</button><button className={activeSection === "compare" ? "top-tab active" : "top-tab"} onClick={() => setActiveSection("compare")}>So sánh</button><span className="local-badge"><span className="status-dot" />Offline / Local data</span></div></header><main id="top" className="dashboard-content">{activeSection === "compare" ? <ComparePanel modelA={compareA} modelB={compareB} onChangeA={setCompareAId} onChangeB={setCompareBId} /> : activeSection === "guide" ? guidePanel : <><div className="dashboard-modebar"><button className={calcMode === "by-room" ? "dashboard-mode active" : "dashboard-mode"} onClick={() => setCalcMode("by-room")}><Sparkles size={15} /><span><strong>Tính theo phòng</strong><small>Nhập rộng/dài → gợi ý model + màn</small></span></button><button className={calcMode === "by-projector" ? "dashboard-mode active" : "dashboard-mode"} onClick={() => setCalcMode("by-projector")}><Projector size={15} /><span><strong>Tính theo model</strong><small>Chọn máy + màn → ra khoảng cách</small></span></button></div><div className="dashboard-grid">{inputPanel}{resultPanel}</div></>}</main></div>
    </div>
  );
}
