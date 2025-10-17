// Required field check
export function isEmpty(value) {
  return value === undefined || value === null || value.toString().trim() === "";
}

// Clamp a numeric value within a range
export function clamp(num, min, max) {
  return Math.min(Math.max(Number(num) || 0, min), max);
}

export function validateCollectionForm(form) {
  const errors = {};

  if (isEmpty(form.name)) errors.name = "Full name is required.";
  if (isEmpty(form.address)) errors.address = "Pickup address is required.";
  if (isEmpty(form.userType)) errors.userType = "User type is required.";
  if (isEmpty(form.wasteType)) errors.wasteType = "Select a waste type.";

  // Ensure quantity is a number
  const qty = Number(form.quantity);
  if (isNaN(qty) || qty < 1 || qty > 200) {
    errors.quantity = "Enter a valid quantity between 1 and 200 kg.";
  }

  if (isEmpty(form.preferredDate))
    errors.preferredDate = "Preferred date is required.";
  if (isEmpty(form.slotId))
    errors.slotId = "Please select an available slot.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export const validatePaymentForm = (form) => {
  const errors = {};

  if (!form.cardName?.trim()) errors.cardName = "Cardholder name is required.";
  if (!/^\d{16}$/.test(form.cardNumber.replace(/\s+/g, "")))
    errors.cardNumber = "Card number must be 16 digits.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
    errors.expiry = "Expiry must be in MM/YY format.";
  if (!/^\d{3,4}$/.test(form.cvv))
    errors.cvv = "CVV must be 3–4 digits.";

  return { valid: Object.keys(errors).length === 0, errors };
};
