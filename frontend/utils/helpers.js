// Calculate estimated fee
export function calculateFeeAndValidate(form) {
  const RATE_TABLE = { 
    "Bulky Waste": 50, 
    "E-waste": 70, 
    "Garden Waste": 30, 
    "Other": 40 
  };

  const rate = RATE_TABLE[form.wasteType] || 0;
  const qty = Number(form.quantity) || 0; 
  const fee = +(rate * qty).toFixed(2);

  return { fee };
}

export const COLOMBO_AREAS = [
  { label: "Colombo 01 (Fort)", value: "Colombo 01 (Fort)" },
  { label: "Colombo 02 (Slave Island)", value: "Colombo 02 (Slave Island)" },
  { label: "Colombo 03 (Kollupitiya)", value: "Colombo 03 (Kollupitiya)" },
  { label: "Colombo 04 (Bambalapitiya)", value: "Colombo 04 (Bambalapitiya)" },
  { label: "Colombo 05 (Havelock Town)", value: "Colombo 05 (Havelock Town)" },
  { label: "Colombo 06 (Wellawatte)", value: "Colombo 06 (Wellawatte)" },
  { label: "Colombo 07 (Cinnamon Gardens)", value: "Colombo 07 (Cinnamon Gardens)" },
  { label: "Colombo 08 (Borella)", value: "Colombo 08 (Borella)" },
  { label: "Colombo 09 (Dematagoda)", value: "Colombo 09 (Dematagoda)" },
  { label: "Colombo 10 (Maradana)", value: "Colombo 10 (Maradana)" },
  { label: "Colombo 11 (Pettah)", value: "Colombo 11 (Pettah)" },
  { label: "Colombo 12 (Hulftsdorp)", value: "Colombo 12 (Hulftsdorp)" },
  { label: "Colombo 13 (Kotahena)", value: "Colombo 13 (Kotahena)" },
  { label: "Colombo 14 (Grandpass)", value: "Colombo 14 (Grandpass)" },
  { label: "Colombo 15 (Mutwal)", value: "Colombo 15 (Mutwal)" },
];

export const toLocalYMD = (val) => {
  if (!val) return "";
  const d = new Date(val);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

