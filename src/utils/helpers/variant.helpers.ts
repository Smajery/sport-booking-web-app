export const getBookingStatusVariant = (status) => {
  switch (status) {
    case "pending":
      return "primary";
    case "paid":
      return "success";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};
