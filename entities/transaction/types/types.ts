export type TransactionStatus =
  | "pending" // payment initiated
  | "in_escrow" // funds held until delivery
  | "completed" // buyer confirmed delivery
  | "cancelled" // cancelled before fulfillment
  | "refunded" // money returned to buyer
  | "disputed"; // conflict raised

export type PaymentMethod =
  | "card"
  | "wallet"
| "bank_transfer"
  | "paystack"
  | "flutterwave";

export interface Transaction {
  id: string;
  buyerId: string;
  vendorId: string;
  requestId: string; // the request this transaction belongs to
  bidId: string; // the winning bid
  amount: number; // total transaction amount
  serviceFee: number; // platform fee (e.g., 10–15%)
  vendorEarnings: number; // amount vendor will receive after fee
  paymentMethod: PaymentMethod;
  reference: string; // payment reference from gateway
  status: TransactionStatus;
  currency: string; // e.g., "NGN"
  createdAt: string; // ISO string or Date
  updatedAt: string;
  completedAt?: string;
  refundedAt?: string;
  // Optional fields
  notes?: string;
  disputeReason?: string;
  deliveryId?: string; // if linked to a delivery entity
}
export interface CreateTransactionPayload {
  buyerId: string;
  vendorId: string;
  requestId: string;
  bidId?: string;
  amount: number;
  serviceFee: number;
  vendorEarnings: number;
  paymentMethod: string;
  reference: string;
  currency: string;
  notes?: string;
}
