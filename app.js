const storageKey = "dental-estimate-state";

const treatmentGroups = groupTreatments(dentalTreatmentMaster);
const treatmentCategories = Object.keys(treatmentGroups);
const bundleGroups = groupBundles(dentalTreatmentBundles);
const bundleCategories = Object.keys(bundleGroups);

const toothDefinitions = [
  ...buildArch("upper", "right", [8, 7, 6, 5, 4, 3, 2, 1]),
  ...buildArch("upper", "left", [1, 2, 3, 4, 5, 6, 7, 8]),
  ...buildArch("lower", "right", [8, 7, 6, 5, 4, 3, 2, 1]),
  ...buildArch("lower", "left", [1, 2, 3, 4, 5, 6, 7, 8]),
];

const defaultState = {
  documentType: "estimate",
  quoteNumber: `DEN-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
  issueDate: new Date().toISOString().slice(0, 10),
  expiryDate: addOneMonth(new Date().toISOString().slice(0, 10)),
  planName: "プラン①",
  pageLabel: "①-1",
  patientNumber: "",
  clientName: "",
  projectTitle: "治療計画に基づくお見積り（有効期限1ヶ月）",
  companyName: "永田歯科医院",
  senderName: "永田智大",
  companyAddress: "東京都〇〇区〇〇 1-2-3",
  companyPhone: "03-1234-5678",
  companyEmail: "clinic@example.com",
  taxRate: 10,
  paymentTerms: "お支払いは現金・クレジットカード・デンタルローンをご利用いただけます。詳細はスタッフへご相談ください。",
  notes: "本お見積りは作成時点の内容に基づいています。材料費や関連費用のやむを得ない改定、ならびに診療内容の変更が生じた場合には、治療費が変更となることがあります。\n\n追加の可能性がある項目は、診療中の状態確認後に必要な場合のみご案内します。",
  agreementText: "上記の治療内容、費用、ならびに追加の可能性がある項目について説明を受け、その内容に同意のうえ治療を依頼します。",
  masterCategory: treatmentCategories[0] || "",
  masterTreatment: "",
  masterQuantity: 1,
  masterNote: "",
  itemType: "standard",
  bundleCategory: bundleCategories[0] || "",
  bundleSet: "",
  bundleQuantity: 1,
  bundleType: "standard",
  selectedTeeth: [],
  items: [],
};

const state = loadState();

const fields = {
  documentType: document.getElementById("documentType"),
  quoteNumber: document.getElementById("quoteNumber"),
  issueDate: document.getElementById("issueDate"),
  expiryDate: document.getElementById("expiryDate"),
  planName: document.getElementById("planName"),
  pageLabel: document.getElementById("pageLabel"),
  patientNumber: document.getElementById("patientNumber"),
  clientName: document.getElementById("clientName"),
  projectTitle: document.getElementById("projectTitle"),
  companyName: document.getElementById("companyName"),
  senderName: document.getElementById("senderName"),
  companyAddress: document.getElementById("companyAddress"),
  companyPhone: document.getElementById("companyPhone"),
  companyEmail: document.getElementById("companyEmail"),
  taxRate: document.getElementById("taxRate"),
  paymentTerms: document.getElementById("paymentTerms"),
  notes: document.getElementById("notes"),
  agreementText: document.getElementById("agreementText"),
  masterCategory: document.getElementById("masterCategory"),
  masterTreatment: document.getElementById("masterTreatment"),
  masterQuantity: document.getElementById("masterQuantity"),
  masterNote: document.getElementById("masterNote"),
  itemType: document.getElementById("itemType"),
  bundleCategory: document.getElementById("bundleCategory"),
  bundleSet: document.getElementById("bundleSet"),
  bundleQuantity: document.getElementById("bundleQuantity"),
  bundleType: document.getElementById("bundleType"),
};

const preview = {
  documentLabel: document.getElementById("previewDocumentLabel"),
  documentTitle: document.getElementById("previewDocumentTitle"),
  quoteNumber: document.getElementById("previewQuoteNumber"),
  issueDate: document.getElementById("previewIssueDate"),
  planName: document.getElementById("previewPlanName"),
  patientNumber: document.getElementById("previewPatientNumber"),
  clientName: document.getElementById("previewClientName"),
  projectTitle: document.getElementById("previewProjectTitle"),
  companyName: document.getElementById("previewCompanyName"),
  senderName: document.getElementById("previewSenderName"),
  companyAddress: document.getElementById("previewCompanyAddress"),
  companyPhone: document.getElementById("previewCompanyPhone"),
  companyEmail: document.getElementById("previewCompanyEmail"),
  paymentTerms: document.getElementById("previewPaymentTerms"),
  notes: document.getElementById("previewNotes"),
  agreementText: document.getElementById("previewAgreementText"),
  contractSection: document.getElementById("previewContractSection"),
  itemsBody: document.getElementById("previewItemsBody"),
  total: document.getElementById("previewTotal"),
  grandTotal: document.getElementById("previewGrandTotal"),
  conditionalTotal: document.getElementById("previewConditionalTotal"),
  overallTotal: document.getElementById("previewOverallTotal"),
};

const itemsList = document.getElementById("itemsList");
const itemTemplate = document.getElementById("itemTemplate");
const masterPreview = document.getElementById("masterPreview");
const bundlePreview = document.getElementById("bundlePreview");
const selectedTeethSummary = document.getElementById("selectedTeethSummary");
const toothChartPreview = document.getElementById("toothChartPreview");
const toothPicker = document.getElementById("toothPicker");
const agreementTextField = document.getElementById("agreementTextField");

initialize();

function initialize() {
  populateCategorySelect();
  populateBundleCategorySelect();
  if (!state.masterTreatment) {
    state.masterTreatment = getTreatments(state.masterCategory)[0]?.label || "";
  }
  if (!state.bundleSet) {
    state.bundleSet = getBundleSetNames(state.bundleCategory)[0] || "";
  }

  Object.entries(fields).forEach(([key, element]) => {
    element.value = state[key] ?? "";
    const update = () => {
      state[key] = isNumericField(key) ? sanitizeNumber(element.value) : element.value;
      if (key === "masterCategory") {
        state.masterTreatment = getTreatments(state.masterCategory)[0]?.label || "";
      }
      if (key === "bundleCategory") {
        state.bundleSet = getBundleSetNames(state.bundleCategory)[0] || "";
      }
      if (key === "issueDate") {
        state.expiryDate = addOneMonth(state.issueDate);
      }
      render();
    };
    element.addEventListener("input", update);
    element.addEventListener("change", update);
  });

  document.getElementById("addTreatmentButton").addEventListener("click", addSelectedTreatment);
  document.getElementById("addBundleButton").addEventListener("click", addSelectedBundle);
  document.getElementById("addItemButton").addEventListener("click", addBlankItem);
  document.getElementById("saveButton").addEventListener("click", saveState);
  document.getElementById("printButton").addEventListener("click", () => window.print());
  document.getElementById("resetButton").addEventListener("click", resetState);
  document.getElementById("clearTeethButton").addEventListener("click", clearSelectedTeeth);

  render();
}

function render() {
  syncFields();
  syncTreatmentSelects();
  syncBundleSelects();
  agreementTextField.hidden = state.documentType !== "contract";
  renderToothChart(toothChartPreview, false);
  renderToothPicker();
  renderSelectedTeethSummary();
  renderItemsEditor();
  renderMasterPreview();
  renderBundlePreview();
  renderPreview();
}

function syncFields() {
  Object.entries(fields).forEach(([key, element]) => {
    const nextValue = state[key] ?? "";
    if (element.value !== String(nextValue)) {
      element.value = nextValue;
    }
  });
}

function populateCategorySelect() {
  fields.masterCategory.innerHTML = "";
  treatmentCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    fields.masterCategory.appendChild(option);
  });
}

function populateBundleCategorySelect() {
  fields.bundleCategory.innerHTML = "";
  bundleCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    fields.bundleCategory.appendChild(option);
  });
}

function syncTreatmentSelects() {
  const treatments = getTreatments(state.masterCategory);
  if (!treatments.some((item) => item.label === state.masterTreatment)) {
    state.masterTreatment = treatments[0]?.label || "";
  }

  fields.masterTreatment.innerHTML = "";
  treatments.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.label;
    option.textContent = `${item.label} / ${formatCurrency(item.unitPrice)}`;
    fields.masterTreatment.appendChild(option);
  });
  fields.masterTreatment.value = state.masterTreatment;
}

function syncBundleSelects() {
  const setNames = getBundleSetNames(state.bundleCategory);
  if (!setNames.includes(state.bundleSet)) {
    state.bundleSet = setNames[0] || "";
  }

  fields.bundleSet.innerHTML = "";
  setNames.forEach((setName) => {
    const option = document.createElement("option");
    option.value = setName;
    option.textContent = setName;
    fields.bundleSet.appendChild(option);
  });
  fields.bundleSet.value = state.bundleSet;
}

function renderToothChart(container, editable) {
  const selected = new Set(getAllSelectedTeeth());
  container.innerHTML = `
    <div class="tooth-chart-image-wrap ${editable ? "editable" : "readonly"}">
      <img src="tooth-chart.png?v=5" alt="歯式" class="tooth-chart-base" />
    </div>
  `;
}

function renderToothPicker() {
  const upperRight = toothDefinitions.filter((tooth) => tooth.arch === "upper" && tooth.side === "right");
  const upperLeft = toothDefinitions.filter((tooth) => tooth.arch === "upper" && tooth.side === "left");
  const lowerRight = toothDefinitions.filter((tooth) => tooth.arch === "lower" && tooth.side === "right");
  const lowerLeft = toothDefinitions.filter((tooth) => tooth.arch === "lower" && tooth.side === "left");

  toothPicker.innerHTML = `
    <div class="tooth-picker-row">${upperRight.map(renderToothButton).join("")}${upperLeft.map(renderToothButton).join("")}</div>
    <div class="tooth-picker-divider"></div>
    <div class="tooth-picker-row">${lowerRight.map(renderToothButton).join("")}${lowerLeft.map(renderToothButton).join("")}</div>
  `;

  toothPicker.querySelectorAll("[data-tooth]").forEach((button) => {
    button.addEventListener("click", () => toggleTooth(button.dataset.tooth));
  });
}

function renderToothButton(tooth) {
  const selected = state.selectedTeeth.includes(tooth.id);
  return `
    <button type="button" class="tooth-chip ${selected ? "selected" : ""}" data-tooth="${tooth.id}">
      ${escapeHtml(toothIdToLabel(tooth.id))}
    </button>
  `;
}

function renderSelectedTeethSummary() {
  const labels = state.selectedTeeth.map(toothIdToLabel);
  selectedTeethSummary.textContent = labels.length > 0 ? `現在選択中: ${labels.join(" / ")}` : "現在選択中の歯はありません。";
}

function renderMasterPreview() {
  const treatment = getTreatments(state.masterCategory).find((item) => item.label === state.masterTreatment);
  if (!treatment) {
    masterPreview.textContent = "治療項目を選択してください。";
    return;
  }

  const quantity = Math.max(1, sanitizeNumber(state.masterQuantity));
  const selectedTeethText = state.selectedTeeth.length > 0 ? state.selectedTeeth.map(toothIdToLabel).join(" / ") : "対象歯未選択";
  const kindLabel = state.itemType === "conditional" ? "追加の可能性あり" : "通常見積";

  masterPreview.innerHTML = `
    <strong>${escapeHtml(treatment.label)}</strong><br>
    単価（税抜）: ${formatCurrency(treatment.unitPrice)}<br>
    数量: ${formatNumber(quantity)}<br>
    対象歯: ${escapeHtml(selectedTeethText)}<br>
    区分: ${escapeHtml(kindLabel)}<br>
    見込小計（税抜）: <strong>${formatCurrency(treatment.unitPrice * quantity)}</strong>
  `;
}

function renderBundlePreview() {
  const bundle = getBundle(state.bundleCategory, state.bundleSet);
  if (!bundle) {
    bundlePreview.textContent = "セットを選択してください。";
    return;
  }

  const quantity = Math.max(1, sanitizeNumber(state.bundleQuantity));
  const itemTypeLabel = state.bundleType === "conditional" ? "追加の可能性あり" : "通常見積";
  const total = bundle.items.reduce((sum, item) => sum + item.unitPrice, 0) * quantity;

  bundlePreview.innerHTML = `
    <strong>${escapeHtml(bundle.setName)}</strong><br>
    ${bundle.items
      .map((item) => `${escapeHtml(item.label)} / ${formatCurrency(item.unitPrice)}${item.note ? ` / ${escapeHtml(item.note)}` : ""}`)
      .join("<br>")}
    <br><br>
    区分: ${escapeHtml(itemTypeLabel)}<br>
    見込小計（税抜）: <strong>${formatCurrency(total)}</strong>
  `;
}

function renderItemsEditor() {
  itemsList.innerHTML = "";

  state.items.forEach((item) => {
    const currentIndex = state.items.findIndex((entry) => entry.id === item.id);
    const fragment = itemTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".item-row");
    row.querySelector('[data-role="lineTotal"]').textContent = formatCurrency(item.quantity * item.unitPrice);

    row.querySelectorAll("input, select").forEach((input) => {
      const field = input.dataset.field;
      input.value = item[field] ?? "";
      const update = () => {
        item[field] = field === "quantity" || field === "unitPrice" ? sanitizeNumber(input.value) : input.value;
        render();
      };
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    row.querySelector('[data-action="moveUp"]').addEventListener("click", () => moveItem(currentIndex, -1));
    row.querySelector('[data-action="moveDown"]').addEventListener("click", () => moveItem(currentIndex, 1));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteItem(currentIndex));

    itemsList.appendChild(fragment);
  });
}

function renderPreview() {
  const isContract = state.documentType === "contract";
  preview.documentLabel.textContent = isContract ? "Contract" : "Quotation";
  preview.documentTitle.textContent = isContract ? "契約書" : "御見積書";
  preview.quoteNumber.textContent = state.quoteNumber || "-";
  preview.issueDate.textContent = formatDate(state.issueDate);
  preview.planName.textContent = formatPlanDisplay(state.planName, state.pageLabel);
  preview.patientNumber.textContent = state.patientNumber ? `患者番号：${state.patientNumber}` : "患者番号：";
  preview.clientName.textContent = state.clientName || "\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000";
  preview.projectTitle.textContent = state.projectTitle || "";
  preview.companyName.textContent = state.companyName || "";
  preview.senderName.textContent = state.senderName ? `担当歯科医師：${state.senderName}` : "担当歯科医師：";
  preview.paymentTerms.textContent = state.paymentTerms || "";
  preview.notes.textContent = state.notes || "";
  preview.agreementText.textContent = state.agreementText || "";
  preview.contractSection.hidden = !isContract;

  const standardItems = state.items.filter((item) => item.type !== "conditional");
  const conditionalItems = state.items.filter((item) => item.type === "conditional");

  preview.itemsBody.innerHTML = state.items.map(renderPreviewRow).join("");

  const total = sumItems(standardItems);
  const conditionalTotal = sumItems(conditionalItems);
  const overallTotal = total + conditionalTotal;
  preview.total.textContent = formatCurrency(total);
  preview.grandTotal.textContent = formatCurrency(total);
  preview.conditionalTotal.textContent = formatCurrency(conditionalTotal);
  preview.overallTotal.textContent = formatCurrency(overallTotal);
}

function renderPreviewRow(item) {
  const hasConditionalNote = item.note && item.note.includes("追加の可能性あり");
  const conditionalLabel = item.type === "conditional" && !hasConditionalNote ? `<br><small>追加の可能性あり</small>` : "";
  return `
    <tr>
      <td>${escapeHtml(item.description || "項目未入力")}${conditionalLabel}${item.note ? `<br><small>${escapeHtml(item.note)}</small>` : ""}</td>
      <td>${escapeHtml(item.teeth || "-")}</td>
      <td>${formatNumber(item.quantity)}</td>
      <td>${formatCurrency(item.unitPrice)}</td>
      <td>${formatCurrency(item.quantity * item.unitPrice)}</td>
    </tr>
  `;
}

function addSelectedTreatment() {
  const treatment = getTreatments(state.masterCategory).find((item) => item.label === state.masterTreatment);
  if (!treatment) {
    return;
  }

  const isConditional = state.itemType === "conditional";
  const defaultNote = isConditional
    ? "診療中の状態確認後に必要な場合のみ追加"
    : "";

  state.items.push({
    id: crypto.randomUUID(),
    description: treatment.label,
    teeth: state.selectedTeeth.map(toothIdToLabel).join("、"),
    quantity: Math.max(1, sanitizeNumber(state.masterQuantity)),
    unitPrice: treatment.unitPrice,
    type: state.itemType,
    note: state.masterNote || defaultNote,
    toothIds: [...state.selectedTeeth],
  });

  state.masterNote = "";
  state.selectedTeeth = [];
  render();
}

function addSelectedBundle() {
  const bundle = getBundle(state.bundleCategory, state.bundleSet);
  if (!bundle) {
    return;
  }

  const quantity = Math.max(1, sanitizeNumber(state.bundleQuantity));
  const teethLabel = state.selectedTeeth.map(toothIdToLabel).join("、");
  const defaultNote = state.bundleType === "conditional" ? "診療中の状態確認後に必要な場合のみ追加" : "";

  bundle.items.forEach((item) => {
    const effectiveType = state.bundleType === "conditional" || item.note ? "conditional" : "standard";
    state.items.push({
      id: crypto.randomUUID(),
      description: item.label,
      teeth: teethLabel,
      quantity,
      unitPrice: item.unitPrice,
      type: effectiveType,
      note: item.note || defaultNote,
      toothIds: [...state.selectedTeeth],
    });
  });

  state.selectedTeeth = [];
  render();
}

function addBlankItem() {
  state.items.push({
    id: crypto.randomUUID(),
    description: "新しい項目",
    teeth: "",
    quantity: 1,
    unitPrice: 0,
    type: "standard",
    note: "",
    toothIds: [],
  });
  render();
}

function deleteItem(index) {
  if (index < 0 || index >= state.items.length) {
    return;
  }
  state.items.splice(index, 1);
  render();
}

function moveItem(index, direction) {
  const target = index + direction;
  if (index < 0 || target < 0 || target >= state.items.length) {
    return;
  }
  const [item] = state.items.splice(index, 1);
  state.items.splice(target, 0, item);
  render();
}


function saveState() {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
  window.alert("見積データをブラウザに保存しました。");
}

function resetState() {
  Object.assign(state, structuredClone(defaultState));
  window.localStorage.removeItem(storageKey);
  render();
}

function loadState() {
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      items: Array.isArray(parsed.items) ? parsed.items.map(normalizeItem) : [],
      selectedTeeth: Array.isArray(parsed.selectedTeeth) ? parsed.selectedTeeth : [],
      expiryDate: parsed.expiryDate || addOneMonth(parsed.issueDate || defaultState.issueDate),
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeItem(item) {
  return {
    id: item.id || crypto.randomUUID(),
    description: item.description || "",
    teeth: item.teeth || "",
    quantity: sanitizeNumber(item.quantity) || 1,
    unitPrice: sanitizeNumber(item.unitPrice),
    type: item.type === "conditional" ? "conditional" : "standard",
    note: item.note || "",
    toothIds: Array.isArray(item.toothIds) ? item.toothIds : [],
  };
}

function clearSelectedTeeth() {
  state.selectedTeeth = [];
  render();
}

function toggleTooth(toothId) {
  const next = new Set(state.selectedTeeth);
  if (next.has(toothId)) {
    next.delete(toothId);
  } else {
    next.add(toothId);
  }
  state.selectedTeeth = toothDefinitions.filter((tooth) => next.has(tooth.id)).map((tooth) => tooth.id);
  render();
}

function getAllSelectedTeeth() {
  const ids = new Set(state.selectedTeeth);
  state.items.forEach((item) => {
    if (Array.isArray(item.toothIds)) {
      item.toothIds.forEach((id) => ids.add(id));
    }
  });
  return [...ids];
}

function formatSelectedTeethForPreview() {
  const ids = getAllSelectedTeeth();
  return ids.length > 0 ? ids.map(toothIdToLabel).join(" / ") : "対象歯未設定";
}

function groupTreatments(entries) {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = [];
    }
    acc[entry.category].push(entry);
    return acc;
  }, {});
}

function groupBundles(entries) {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = {};
    }
    acc[entry.category][entry.setName] = entry;
    return acc;
  }, {});
}

function getTreatments(category) {
  return treatmentGroups[category] || [];
}

function getBundleSetNames(category) {
  return Object.keys(bundleGroups[category] || {});
}

function getBundle(category, setName) {
  return bundleGroups[category]?.[setName] || null;
}

function sumItems(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function isNumericField(key) {
  return key === "taxRate" || key === "masterQuantity" || key === "bundleQuantity";
}

function sanitizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(value || 0);
}

function formatDate(value) {
  if (!value) {
    return "-";
  }
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function formatPlanDisplay(planName, pageLabel) {
  const plan = (planName || "").trim();
  const page = (pageLabel || "").trim();

  if (!plan && !page) {
    return "-";
  }
  if (!page) {
    return plan || "-";
  }
  if (!plan) {
    return page;
  }
  if (page.startsWith(plan)) {
    return page;
  }

  const tokenMatch = plan.match(/[①-⑳0-9]+$/);
  const token = tokenMatch ? tokenMatch[0] : "";
  if (token && page.startsWith(token)) {
    const suffix = page.slice(token.length).replace(/^[\-ーｰ]/, "");
    return suffix ? `${plan}-${suffix}` : plan;
  }

  return `${plan}-${page}`;
}

function addOneMonth(dateString) {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildArch(arch, side, numbers) {
  return numbers.map((number, index) => ({
    id: `${arch}-${side}-${number}`,
    arch,
    side,
    number,
    kind: inferToothKind(index),
    shortLabel: side === "right" ? `右${number}` : `左${number}`,
  }));
}

function inferToothKind(index) {
  if (index <= 1 || index >= 6) {
    return "molar";
  }
  if (index === 2 || index === 5) {
    return "premolar";
  }
  if (index === 3) {
    return "canine";
  }
  return "incisor";
}

function toothIdToLabel(toothId) {
  const tooth = toothDefinitions.find((entry) => entry.id === toothId);
  if (!tooth) {
    return toothId;
  }
  const jaw = tooth.arch === "upper" ? "上" : "下";
  const side = tooth.side === "right" ? "右" : "左";
  return `${side}${jaw}${tooth.number}`;
}
