export function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDaterange(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export function formatNumber(number) {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + " billion";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + " million";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + " thousand";
  } else {
    return number.toString();
  }
}
