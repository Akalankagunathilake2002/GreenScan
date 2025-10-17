import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const FILE_PREFIX = "Waste_Report_";
const DATE_FORMAT_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

// --- PDF Export ---
export const exportToPDF = (chartData = []) => {
  if (!chartData.length) return alert("⚠️ No data to export!");

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("GreenScan Waste Analytics Report", 14, 20);
  doc.setFontSize(10);
  doc.text(new Date().toLocaleDateString(undefined, DATE_FORMAT_OPTIONS), 14, 28);

  const tableData = chartData.map((r) => [r.date, `${r.qty} kg`]);
  autoTable(doc, {
    head: [["Date", "Quantity (kg)"]],
    body: tableData,
    startY: 35,
  });

  doc.save(`${FILE_PREFIX}${Date.now()}.pdf`);
};

// --- Excel Export ---
export const exportToExcel = (chartData = []) => {
  if (!chartData.length) return alert("⚠️ No data to export!");

  const worksheet = XLSX.utils.json_to_sheet(chartData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Waste Report");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${FILE_PREFIX}${Date.now()}.xlsx`);
};
