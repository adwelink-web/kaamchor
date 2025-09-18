import { Home, ShoppingCart, Wrench, Sprout, Car } from "lucide-react";

export const TASK_CATEGORIES = [
  { value: "home", label: "Home Services", icon: Home },
  { value: "shopping", label: "Shopping", icon: ShoppingCart },
  { value: "repair", label: "Repair", icon: Wrench },
  { value: "gardening", label: "Gardening", icon: Sprout },
  { value: "transport", label: "Transport", icon: Car },
];

export const TASK_STATUSES = ["Posted", "Accepted", "In Progress", "Completed"] as const;
