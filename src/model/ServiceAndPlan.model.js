import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class ServiceAndPlanModel extends Model {
  VAR_ID_PLAN_AND_SERVICE = "id_plan_and_service";
  VAR_NAME = "name";
  VAR_DESCRIPTION = "description";
  VAR_VISIBILITY = "visibility";
  VAR_ID_STATUS_PLAN_AND_SERVICE = "id_status_plan_and_service";
  VAR_CREATEDAT = "createdAt";

  id_plan_and_service;
  name;
  description;
  visibility;
  id_status_plan_and_service;
  createdAt;

  constructor(service_plan) {
    super();
    this.id_plan_and_service = parseInt(service_plan?.id_plan_and_service);
    this.name = Utils._length(service_plan?.name, 64, 1);
    this.description = Utils._length(service_plan?.description, 255, 1);
    this.visibility = Utils.isBoolean(service_plan?.visibility);
    this.id_status_plan_and_service = Utils.isNumeric(
      service_plan?.id_status_plan_and_service
    );
    this.createdAt = service_plan?.createdAt;
  }

  get getAll() {
    return {
      id_plan_and_service: this.id_plan_and_service,
      name: this.name,
      description: this.description,
      visibility: this.visibility,
      id_status_plan_and_service: this.id_status_plan_and_service,
      createdAt: this.createdAt,
    };
  }
}
