export type KYCStatus = "PENDING" | "APPROVED" | "REJECTED";

export type VendorKYC = {
  id: string;
  vendorId: string; // reference to vendor
  idType: string; // e.g., National ID, Driver’s License, Passport
  idNumber: string;
  idImageUrl?: string; // uploaded ID card
  businessCertificateUrl?: string; // CAC or business registration
  selfieUrl?: string; // selfie with ID
  status: KYCStatus;
  remarks?: string; // admin comments if rejected
  createdAt: string;
  updatedAt?: string;
};

export type CreateVendorKYCInput = {
  vendorId: string;
  idType: string;
  idNumber: string;
  idImage: File;
  businessCertificate: File;
  selfie: File;
};

export type UpdateVendorKYCInput = Partial<Omit<VendorKYC, "id" | "vendorId">> & {
  id: string;
};


type SortOption = {
  field: keyof VendorKYC;
  order: "asc" | "desc";
};

type FilterOption = {
  field: keyof VendorKYC;
  value: string | boolean;
};

export type VendorKYCDataStore = {
  vendorKYCs: VendorKYC[];
  filters: FilterOption[];
  sort: SortOption | null;
  currentPage: number;
  pageSize: number;

  setVendorKYCs: (data: VendorKYC[]) => void;
  addVendorKYC: (data: VendorKYC) => void;
  updateVendorKYC: (data: VendorKYC) => void;
  deleteVendorKYC: (id: string) => void;

  setFilters: (filters: FilterOption[]) => void;
  setSort: (sort: SortOption | null) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  reset: () => void;
};