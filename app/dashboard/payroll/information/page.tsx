import DashboardComponent from "@/components/dashboard";
import { PayrollCards } from "@/utils/constants";

export default function PayrollInformation() {
  return <DashboardComponent cardArray={PayrollCards} />;
}
