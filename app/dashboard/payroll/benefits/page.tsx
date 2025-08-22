import DashboardComponent from "@/components/dashboard";
import { BenefitPayrollCards } from "@/utils/constants";

export default function PayrollBenefit() {
  return <DashboardComponent cardArray={BenefitPayrollCards} />;
}
