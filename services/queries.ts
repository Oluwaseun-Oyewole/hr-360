import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./dashboard";
import { EmployeeInterface } from "./types";

export const useGetEmployees = (params: EmployeeInterface) => {
  const {
    data: employees,
    isLoading: employeesIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-employees", params],
    queryFn: () => getEmployees(params),
    retry: 1,
    // enabled: !!params,
    refetchOnWindowFocus: false,
  });
  return { employees, employeesIsLoading, refetch };
};
