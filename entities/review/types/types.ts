export type Review = {
  id: string;
  reviewerId: string;
  vendorId: string;
  requestId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateReviewInput = {
  id: string;
  reviewerId: string;
  vendorId: string;
  requestId: string;
  rating: number;
  comment?: string;
};

export type UpdateReviewInput = {
  id: string;
  rating?: number;
  comment?: string;
};
