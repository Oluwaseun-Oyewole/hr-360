import DashboardComponent from "@/components/dashboard";
import { BenefitPayrollCards } from "@/utils/constants";

export default function Dashboard() {
  return <DashboardComponent cardArray={BenefitPayrollCards} />;
}
