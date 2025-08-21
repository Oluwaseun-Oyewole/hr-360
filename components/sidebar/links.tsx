import Book from "@/assets/book-02.svg";
import { default as Schedule } from "@/assets/calendar-01.svg";
import Payroll from "@/assets/cash-01.svg";
import Metric from "@/assets/chart-evaluation.svg";
import DashboardIcon from "@/assets/dashboard-square-01.svg";
import Recruit from "@/assets/elements.svg";
import Training from "@/assets/file-01.svg";
import Help from "@/assets/information-circle.svg";
import Employee from "@/assets/user-group.svg";
import { IconType } from "react-icons";
import { CiCalendarDate } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiNotebookThin } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbReport } from "react-icons/tb";
import { Routes } from "./routes";

export interface IRoutesType {
  id: number;
  path?: string;
  icon: HTMLImageElement;
  ActiveIcon: IconType;
  title: string;
  subRoutes?: {
    id: number;
    title?: string;
    url: string;
  }[];
  disabled?: boolean;
}
[];

export const routes: IRoutesType[] = [
  {
    id: 0,
    path: Routes.dashboard,
    icon: DashboardIcon,
    title: "Dashboard",
    ActiveIcon: RxDashboard,
  },

  {
    id: 1,
    icon: Employee,
    title: "Employee",
    ActiveIcon: FaUsers,
    subRoutes: [
      {
        id: 1,
        title: "Attendance",
        url: "/dashboard/employee/attendance",
      },

      {
        id: 2,
        title: "Leave Request",
        url: "/dashboard/employee/leave",
      },

      {
        id: 3,
        title: "Absence Trends",
        url: "/dashboard/employee/absence",
      },
    ],
  },
  {
    id: 2,
    icon: Recruit,
    title: "Recruitment",
    subRoutes: [
      { title: "Stage One", id: 1, url: "/dashboard/recruitment/stage-one" },
      { title: "Stage Two", id: 2, url: "/dashboard/recruitment/stage-two" },
    ],
    ActiveIcon: FaUserPlus,
    disabled: true,
  },

  {
    id: 3,
    path: Routes.performance,
    icon: Metric,
    title: "Performance Metrics",
    ActiveIcon: TbReport,
  },

  {
    id: 4,
    icon: Payroll,
    title: "Payroll",
    ActiveIcon: PiNotebookThin,
    subRoutes: [
      {
        id: 1,
        title: "Payroll Information",
        url: "/dashboard/payroll/information",
      },

      {
        id: 2,
        title: "Benefits Overall",
        url: "/dashboard/payroll/benefits",
      },

      {
        id: 3,
        title: "Compensation Analysis",
        url: "/dashboard/payroll/compensation",
      },
    ],
  },

  {
    id: 5,
    path: Routes.schedule,
    icon: Schedule,
    title: "Schedule",
    disabled: true,
    ActiveIcon: CiCalendarDate,
  },

  {
    id: 6,
    path: Routes.training,
    icon: Book,
    title: "Training and Development",
    ActiveIcon: PiNotebookThin,
  },

  {
    id: 7,
    path: Routes.report,
    icon: Training,
    title: "Report and Analytics",
    disabled: true,
    ActiveIcon: TbReport,
  },
];

export const bottomRoutes: IRoutesType[] = [
  {
    id: 1,
    path: Routes.help,
    icon: Help,
    title: "Help",
    ActiveIcon: IoIosHelpCircleOutline,
    disabled: true,
  },
];
