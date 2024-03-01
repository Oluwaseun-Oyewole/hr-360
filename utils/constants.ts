import Alarm from "@/assets/alarm-clock.svg";
import Alert from "@/assets/alert-diamond.svg";
import Space from "@/assets/beach.svg";
import Briefcase from "@/assets/briefcase-06.svg";
import Office from "@/assets/office-chair.svg";

type PageTitle = {
  [key: string]: string;
};

export const PageTitle: PageTitle = {
  dashboard: "Dashboard",
  directory: "Employee Directory",
  attendance: "Employee Attendance",
  leave: "Employee Leave Request",
  "stage-one": "Recruitment stage One",
  "stage-two": "Recruitment stage Two",
  "stage-three": "Recruitment Stage three",
  information: "Payroll Information",
  benefits: "Payroll Benefits Overall",
  compensation: "Payroll Compensation and Analysis",
  absence: "Employee Absence Trends",
  recruitment: "Recruitment",
  performance: "Performance Metrics",
  training: "Training and Development",
  schedule: "Schedule",
  reports: "Report and Analysis",
  help: "Help",
  settings: "Settings",
  messages: "Messages",
};

export type ICardTypes = {
  id: number;
  title: string;
  total: string;
  percentage: string;
  date: string;
  image: string;
};
export const EmployeeCards: ICardTypes[] = [
  {
    id: 1,
    title: "Total Workforce",
    total: "150",
    percentage: "10%",
    date: "last month",
    image: Briefcase,
  },
  {
    id: 2,
    title: "Present Workforce",
    total: "125",
    percentage: "10%",
    date: "last month",
    image: Office,
  },
  {
    id: 3,
    title: "Absent Workforce",
    percentage: "10%",
    date: "last month",

    total: "15",
    image: Alert,
  },
  {
    id: 4,
    title: "Late Arrivals",
    total: "5",
    percentage: "10%",
    date: "last month",
    image: Alarm,
  },

  {
    id: 5,
    title: "On Leave",
    total: "5",
    percentage: "10%",
    date: "last month",
    image: Space,
  },
];
