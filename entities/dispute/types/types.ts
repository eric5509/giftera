export type DisputeStatus = "OPEN" | "RESOLVED" | "REJECTED";

export type Dispute = {
  id: string;
  transactionId: string;
  requestId: string;
  complainantId: string; // the user who filed the dispute
  reason: string;
  status: DisputeStatus;
  createdAt: string;
  updatedAt?: string;
};

export type CreateDisputeInput = {
  transactionId: string;
  requestId: string;
  complainantId: string; // user raising the dispute
  reason: string;
};

export type UpdateDisputeInput = {
  reason?: string;
  status?: DisputeStatus;
};

export type GetAllDisputesParams = {
  page?: number;
  limit?: number;
  sortBy?: keyof Dispute;
  sortOrder?: "asc" | "desc";
  filters?: {
    status?: string;
    complainantId?: string;
    transactionId?: string;
  };
};

export type DisputeDataStore = {
  disputes: Dispute[];
  page: number;
  limit: number;
  total?: number;
  isLoading: boolean;

  // Filters & sorting
  status?: DisputeStatus;
  complainantId?: string;
  transactionId?: string;
  sortBy?: keyof Dispute;
  sortOrder?: "asc" | "desc";

  // Actions
  setDisputes: (disputes: Dispute[]) => void;
  addDispute: (dispute: Dispute) => void;
  updateDispute: (dispute: Dispute) => void;
  removeDispute: (id: string) => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setLoading: (loading: boolean) => void;

  setFilters: (filters: {
    status?: DisputeStatus;
    complainantId?: string;
    transactionId?: string;
  }) => void;

  setSorting: (sort: { sortBy?: keyof Dispute; sortOrder?: "asc" | "desc" }) => void;

  clearDisputes: () => void;
}
