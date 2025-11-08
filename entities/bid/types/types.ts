export type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type Bid = {
  id: string;
  requestId: string;        // Request being bid on
  vendorId: string;         // Vendor making the bid
  price: number;
  deliveryTime: string;     // Estimated delivery date/time (ISO string)
  samplePhotoUrls?: string[]; // Optional sample images
  status: BidStatus;
  createdAt: string;
  updatedAt?: string;
};

export type CreateBidInput = {
  requestId: string;
  vendorId: string;
  price: number;
  deliveryTime: string;
  samplePhotos?: File[]; // 👈 this replaces photoUrls

};

export type UpdateBidInput = {
  id: string;
  price?: number;
  deliveryTime?: string;
  samplePhotoUrls?: string[];
  status?: BidStatus;
};

export type GetBidsParams = {
  requestId?: string;
  vendorId?: string;
  status?: BidStatus;
  sortBy?: keyof Bid;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};



export type BidDataStore =  {
  bids: Bid[];
  filters: {
    requestId?: string;
    vendorId?: string;
    status?: BidStatus;
  };
  sorting: {
    sortBy: keyof Bid;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // Actions
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  updateBid: (bid: Bid) => void;
  removeBid: (id: string) => void;
  setFilter: (filter: Partial<BidDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<BidDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<BidDataStore["pagination"]>) => void;
  reset: () => void;

  // Fetch bids using current store state
  fetchBids: () => Promise<void>;
}
