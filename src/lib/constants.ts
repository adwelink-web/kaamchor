import { Home, ShoppingCart, Wrench, Sprout, Car, Package } from "lucide-react";

export const TASK_CATEGORIES = [
  { value: "home", label: "Home Tasks", icon: Home },
  { value: "shopping", label: "Shopping", icon: ShoppingCart },
  { value: "repair", label: "Repair", icon: Wrench },
  { value: "gardening", label: "Gardening", icon: Sprout },
  { value: "transport", label: "Transport", icon: Car },
  { value: "other", label: "Other", icon: Package },
];

export const TASK_STATUSES = ["Posted", "Accepted", "In Progress", "Completed"] as const;
