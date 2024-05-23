export const getBookingStatusVariant = (status: string) => {
  switch (status) {
    case "pending":
      return "primary";
    case "paid":
      return "success";
    case "completed":
      return "success";
    case "cancelled":
      return "danger";
    case "failed":
      return "danger";
    default:
      return "outline";
  }
};
