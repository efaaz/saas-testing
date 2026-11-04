import {
  LayoutDashboard,
  Package,
  ReceiptText,
  ShoppingCart,
} from "lucide-react";
import type { OrderStatus, PageKey } from "@/types";

export const STORAGE_KEY = "sellerdesk-data";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const NAV_ITEMS: Array<{
  id: PageKey;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "slips", label: "Order slips", icon: ReceiptText },
];
export const ACTIVE_PAGE_STORAGE_KEY = "sellerdesk-active-page";
