import type { jsPDF as JsPdfDocument } from "jspdf";
import type { Language } from "@/i18n/translations";
import { getFeature, getPackage, PROJECT_TYPE_OPTIONS, TIMELINE_OPTIONS } from "./config";
import { projectRequestCopy } from "./copy";
import { formatMoneyRange } from "./services";
import type { ProjectRequest } from "./types";

const ARABIC_FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosansarabic/NotoSansArabic%5Bwdth%2Cwght%5D.ttf";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

async function addArabicFont(doc: JsPdfDocument) {
  try {
    const response = await fetch(ARABIC_FONT_URL, { cache: "force-cache" });
    if (!response.ok) return false;
    const font = arrayBufferToBase64(await response.arrayBuffer());
    doc.addFileToVFS("NotoSansArabic.ttf", font);
    doc.addFont("NotoSansArabic.ttf", "NotoSansArabic", "normal");
    doc.setFont("NotoSansArabic", "normal");
    return true;
  } catch {
    return false;
  }
}

async function addLogo(doc: JsPdfDocument) {
  try {
    const response = await fetch("/favicon-48.png");
    if (!response.ok) return;
    const base64 = arrayBufferToBase64(await response.arrayBuffer());
    doc.addImage(`data:image/png;base64,${base64}`, "PNG", 18, 12, 18, 18, undefined, "FAST");
  } catch {
    // The vector brand header remains usable when the optional image cannot load.
  }
}

export async function generateProjectRequestPdf(request: ProjectRequest, language: Language) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const copy = projectRequestCopy[language];
  const isRtl = language === "ar";
  if (isRtl) await addArabicFont(doc);
  await addLogo(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const align: "right" | "left" = isRtl ? "right" : "left";
  const textX = isRtl ? pageWidth - margin : margin;
  const bidiOptions = isRtl
    ? {
        isInputVisual: false,
        isInputRtl: true,
        isOutputVisual: true,
        isOutputRtl: false,
        isSymmetricSwapping: true,
      }
    : {};
  const textOptions = <Options extends object>(value: string | string[], options: Options) => {
    const logicalText = Array.isArray(value) ? value.join(" ") : value;
    return {
      ...options,
      ...(isRtl && /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/.test(logicalText)
        ? bidiOptions
        : {}),
    };
  };
  let y = 18;

  const setText = (
    size: number,
    color: [number, number, number],
    style: "normal" | "bold" = "normal",
  ) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    if (!isRtl) doc.setFont("helvetica", style);
  };

  const drawPageChrome = () => {
    doc.setFillColor(5, 12, 31);
    doc.rect(0, 0, pageWidth, 38, "F");
    doc.setFillColor(30, 203, 225);
    doc.rect(0, 0, pageWidth, 2.2, "F");
    setText(8, [116, 135, 164]);
    const footerText = "NextAura AI · info@next-aura-ai.com · +962 79 919 5498";
    doc.text(footerText, textX, pageHeight - 9, textOptions(footerText, { align }));
    doc.setDrawColor(220, 226, 238);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
  };

  const ensureSpace = (height: number) => {
    if (y + height <= pageHeight - 20) return;
    doc.addPage();
    drawPageChrome();
    y = 48;
  };

  const addWrapped = (
    value: string,
    size = 9,
    color: [number, number, number] = [49, 61, 82],
    maxWidth = contentWidth,
  ) => {
    setText(size, color);
    const lines = doc.splitTextToSize(value || copy.review.notProvided, maxWidth) as string[];
    ensureSpace(lines.length * 5 + 2);
    doc.text(lines, textX, y, textOptions(lines, { align, lineHeightFactor: 1.45 }));
    y += lines.length * 5 + 2;
  };

  const section = (title: string) => {
    ensureSpace(14);
    y += 3;
    doc.setFillColor(240, 244, 252);
    doc.roundedRect(margin, y - 5, contentWidth, 10, 2, 2, "F");
    setText(10, [21, 37, 66], "bold");
    doc.text(title, textX, y + 1.5, textOptions(title, { align }));
    y += 10;
  };

  const field = (label: string, value?: string) => {
    ensureSpace(13);
    setText(7.5, [91, 107, 134], "bold");
    doc.text(label, textX, y, textOptions(label, { align }));
    y += 4.5;
    addWrapped(value || copy.review.notProvided, 9, [25, 35, 54]);
  };

  drawPageChrome();
  setText(8, [126, 226, 240], "bold");
  doc.text("NEXTAURA AI", isRtl ? pageWidth - 42 : 42, 19, textOptions("NEXTAURA AI", { align }));
  setText(18, [255, 255, 255], "bold");
  const pdfTitle =
    language === "ar"
      ? "ملخص طلب المشروع"
      : language === "es"
        ? "Resumen de solicitud"
        : "Project Request Summary";
  doc.text(pdfTitle, textX, 31, textOptions(pdfTitle, { align }));
  y = 48;

  doc.setFillColor(234, 240, 255);
  doc.roundedRect(margin, y - 5, contentWidth, 19, 3, 3, "F");
  setText(8, [82, 96, 126], "bold");
  doc.text(copy.success.requestId, textX, y + 1, textOptions(copy.success.requestId, { align }));
  setText(12, [37, 55, 91], "bold");
  doc.text(request.id, textX, y + 8, textOptions(request.id, { align }));
  y += 21;

  const projectPackage = getPackage(request.packageId);
  const projectType = PROJECT_TYPE_OPTIONS.find((item) => item.id === request.projectType);
  const timeline = TIMELINE_OPTIONS.find((item) => item.id === request.timeline.option);
  const includedNames = request.includedFeatureIds
    .map((id) => getFeature(id)?.title[language])
    .filter(Boolean)
    .join(" · ");
  const selectedNames = request.selectedFeatureIds
    .map((id) => getFeature(id)?.title[language])
    .filter(Boolean)
    .join(" · ");

  section(copy.review.customer);
  field(copy.review.fullName, request.customer.fullName);
  field(copy.review.phone, request.customer.phone);
  field(copy.review.email, request.customer.email);
  field(copy.review.businessName, request.customer.businessName);

  section(copy.review.project);
  field(copy.review.projectType, projectType?.label[language]);
  field(copy.review.projectIdea, request.projectIdea);

  section(copy.review.scope);
  field(copy.review.package, projectPackage.title[language]);
  field(copy.review.includedFeatures, includedNames);
  field(copy.review.selectedFeatures, selectedNames);
  field(copy.review.customFeature, request.customFeature);
  field(copy.review.languages, String(request.languageCount));

  section(copy.review.timeline);
  field(copy.review.requestedTimeline, request.timeline.requestedDate || timeline?.label[language]);
  field(copy.review.deliveryMode, request.timeline.isRush ? copy.review.rush : copy.review.normal);
  field(
    copy.review.contactMethod,
    request.contactMethod ? copy.timeline.contactOptions[request.contactMethod] : undefined,
  );
  field(copy.review.notes, request.notes);

  section(copy.review.estimate);
  field(
    copy.review.originalEstimate,
    formatMoneyRange(
      request.estimate.estimatedMinJod,
      request.estimate.estimatedMaxJod,
      "JOD",
      language,
    ),
  );
  if (request.estimate.convertedMin != null && request.estimate.convertedMax != null) {
    field(
      copy.review.convertedEstimate,
      formatMoneyRange(
        request.estimate.convertedMin,
        request.estimate.convertedMax,
        request.estimate.selectedCurrency,
        language,
      ),
    );
  }
  field(copy.review.explanation, request.estimate.explanation);
  field(
    copy.review.submittedAt,
    new Intl.DateTimeFormat(language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-GB", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(request.submittedAt)),
  );

  ensureSpace(42);
  const maintenanceTop = y + 2;
  doc.setFillColor(229, 250, 247);
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(margin, maintenanceTop, contentWidth, 34, 3, 3, "FD");
  y += 10;
  addWrapped(copy.maintenance.title, 11, [15, 94, 81], contentWidth - 10);
  addWrapped(copy.maintenance.body, 8, [42, 87, 78], contentWidth - 10);
  y = Math.max(y + 5, maintenanceTop + 39);
  addWrapped(copy.disclaimer, 8, [91, 107, 134]);

  return doc.output("blob");
}

export function downloadProjectPdf(blob: Blob, requestId: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${requestId}-project-request.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
