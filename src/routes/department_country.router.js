import { DepartmentCountryController } from "@/controller/department_country.controller";
import { RoutingClass } from "@/lib/Routing";

export class DepartmentCountryRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: DepartmentCountryController.apiListAllDepartment,
    });
  }
}