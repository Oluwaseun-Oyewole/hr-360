type IStatus = "Present" | "Absent" | "Late";

export const renderStatus = (text: IStatus) => {
  let className;
  if (text === "Present") {
    return (className =
      "text-[#069855] bg-[#E6F5EE] border-[#069855] !w-[80px]");
  } else if (text === "Absent") {
    return (className =
      "text-[#ED544E] bg-[#FDF4F4] border-[#ED544E] !w-[80px]");
  } else if ((text = "Late")) {
    return (className =
      "text-[#D39C1D] bg-[#FBF5E8] border-[#D39C1D] !w-[80px]");
  }
  return className;
};

type IEmploymentType = "Full-Time" | "Part-Time";

export const renderEmployment = (text: IEmploymentType) => {
  let className;
  if (text === "Full-Time") {
    return (className =
      "text-[#534FEB] bg-[#F6F6FE] border-[#534FEB] !w-[80px]");
  } else if (text === "Part-Time") {
    return (className = "text-[#1C6CE5] bg-blue-50 border-[#1C6CE5] !w-[80px]");
  }
  return className;
};
