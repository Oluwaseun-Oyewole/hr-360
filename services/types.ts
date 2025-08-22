export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface EmployeeInterface {
  resultsPerPage: number;
  page: number;
  query?: string;
  role?: string;
}
