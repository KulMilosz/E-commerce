export function getRandomDeliveryDateRange(): string {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 7) + 1;

  const startDate = new Date(today);
  startDate.setDate(today.getDate() + randomDays);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const startStr = startDate.toLocaleDateString("en-US", options);
  const endStr = endDate.toLocaleDateString("en-US", options);

  return `${startStr} – ${endStr}`;
}
