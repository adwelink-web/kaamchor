import { Home, ShoppingCart, Wrench, Sprout, Car } from "lucide-react";

export const TASK_CATEGORIES = [
  { value: "home", label: "Ghar Ke Kaam", icon: Home },
  { value: "shopping", label: "Shopping", icon: ShoppingCart },
  { value: "repair", label: "Marammat", icon: Wrench },
  { value: "gardening", label: "Bagwani", icon: Sprout },
  { value: "transport", label: "Transport", icon: Car },
];

export const TASK_STATUSES = ["Posted", "Accepted", "In Progress", "Completed"] as const;
