export const API_BASE_URL = "http://localhost:8085/v1";
export const WEBHOOK_BASE_URL = "http://localhost:9095";

export const API_ENDPOINTS = [
  {
    name: "Send Invoice",
    path: `${API_BASE_URL}/sendInvoice`,
    description: "Trigger invoice sending process",
  },
  {
    name: "Check Business Status",
    path: `${API_BASE_URL}/checkBusinessStatus`,
    description: "Verify the current business status",
  },
  {
    name: "Register New Business",
    path: `${API_BASE_URL}/registerBusiness`,
    // description: "Register a new business entity",
  },
];
