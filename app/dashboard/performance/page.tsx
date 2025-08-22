"use client";
import DashboardComponent from "@/components/dashboard";
import { BenefitPayrollCards } from "@/utils/constants";

export default function Performance() {
  return <DashboardComponent cardArray={BenefitPayrollCards} />;
}
