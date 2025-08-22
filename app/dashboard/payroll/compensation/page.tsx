import DashboardComponent from "@/components/dashboard";
import { PayrollCompensationCards } from "@/utils/constants";

export default function PayrollCompensation() {
  return <DashboardComponent cardArray={PayrollCompensationCards} />;
}
