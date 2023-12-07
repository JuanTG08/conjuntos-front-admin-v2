import { DepartmentCountryRouter } from "@/routes/department_country.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new DepartmentCountryRouter(req, res);
}
