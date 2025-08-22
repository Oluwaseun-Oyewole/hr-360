import TrainingComponent from "@/components/training";
import { EmployeeCards } from "@/utils/constants";

export default function Attendance() {
  return <TrainingComponent cardArray={EmployeeCards} />;
}
