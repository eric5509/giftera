export type DeliveryStatus =
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export type Delivery = {
  id: string;
  requestId: string; // Link to the gift request
  vendorId: string; // Vendor fulfilling the request
  provider: string; // e.g., "GIG", "Sendbox", "Max"
  externalDeliveryId?: string; // ID from 3rd party API
  trackingUrl?: string; // Optional tracking link
  status: DeliveryStatus;
  createdAt: string;
  updatedAt?: string;
};

export type CreateDeliveryInput = {
  requestId: string; // Link to the gift request
  vendorId: string; // Vendor fulfilling the request
};

export type UpdateDeliveryInput = {
  id: string;
  vendorId?: string;
  riderId?: string;
  status?: DeliveryStatus;
  pickupTime?: string;
  deliveredTime?: string;
};

export type GetDeliveriesParams = {
  requestId?: string;
  vendorId?: string;
  riderId?: string;
  status?: DeliveryStatus;
  sortBy?: keyof Delivery;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type DeliveryDataStore = {
  deliveries: Delivery[];
  filters: {
    requestId?: string;
    vendorId?: string;
    riderId?: string;
    status?: DeliveryStatus;
  };
  sorting: {
    sortBy: keyof Delivery;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // Actions
  setDeliveries: (deliveries: Delivery[]) => void;
  addDelivery: (delivery: Delivery) => void;
  updateDelivery: (delivery: Delivery) => void;
  removeDelivery: (id: string) => void;
  setFilter: (filter: Partial<DeliveryDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<DeliveryDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<DeliveryDataStore["pagination"]>) => void;
  reset: () => void;

  // Fetch deliveries using current store state
  fetchDeliveries: () => Promise<void>;
};
