import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const items = [
  { label: "Choose department", value: null },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "support" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
];

export const checkboxOptions = [
  {
    id: "hard-disks",
    value: "hard-disks",
    label: "Hard disks",
  },
  {
    id: "external-disks",
    value: "external-disks",
    label: "External disks",
  },
  {
    id: "cds-dvds",
    value: "cds-dvds",
    label: "CDs, DVDs, and iPods",
  },
  {
    id: "connected-servers",
    value: "connected-servers",
    label: "Connected servers",
  },
];

export const radioOptions = [
  {
    id: "plan-monthly",
    value: "monthly",
    label: "Monthly ($9.99/month)",
  },
  {
    id: "plan-yearly",
    value: "yearly",
    label: "Yearly ($99.99/year)",
  },
  {
    id: "plan-lifetime",
    value: "lifetime",
    label: "Lifetime ($299.99)",
  },
];

export type UserDetails = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  about: string;
  department: string;
  checkedOptions: string[];
  radioOption: string;
};
