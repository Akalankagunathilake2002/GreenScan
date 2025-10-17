import axios from "axios";

const BASE_URL = "http://localhost:5002/api/reports";

export const fetchReportData = async (params) => {
  const { startDate, endDate, area, wasteType } = params;
  const url = `${BASE_URL}/generate?startDate=${startDate}&endDate=${endDate}&area=${area}&wasteType=${wasteType}`;
  const res = await axios.get(url);
  return Object.entries(res.data.statsByDay).map(([date, qty]) => ({ date, qty }));
};

export const fetchCSVExport = async (params) => {
  const { startDate, endDate, area, wasteType } = params;
  const url = `${BASE_URL}/export/csv?startDate=${startDate}&endDate=${endDate}&area=${area}&wasteType=${wasteType}`;
  const res = await axios.get(url);
  window.open(`http://localhost:5002${res.data.downloadLink}`, "_blank");
};
