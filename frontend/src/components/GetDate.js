export const dateCheck = (param) => {
  if (!param) return null; // Safety check

  // Extract year, month, and day
  const year = param.slice(0, 4);
  const month = parseInt(param.slice(5, 7), 10); // Convert to number
  const day = param.slice(8, 10);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${day} ${months[month - 1]} ${year}`;
};
