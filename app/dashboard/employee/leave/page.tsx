import TrainingComponent from "@/components/training";
import { LeaveCards } from "@/utils/constants";

export default function Home() {
  return <TrainingComponent cardArray={LeaveCards} />;
}
