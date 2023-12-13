import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class PQRSModel extends Model {
  VAR_ID_PQRS = "id_pqrs";
  VAR_ID_APARTMENT = "id_apartment";
  VAR_ID_USER_ROLE = "id_user_role";
  VAR_ID_TYPE_REQUEST = "id_type_request";
  VAR_ID_CATEGORY_REQUEST = "id_category_request";
  VAR_ID_PRIORITY = "id_priority";
  VAR_TRACKING_NUMBER = "tracking_number";
  VAR_TITLE = "title";
  VAR_DESCRIPTION = "description";
  VAR_ID_STATUS = "id_status";
  VAR_CREATED_AT = "created_at";
  VAR_UPDATED_AT = "updated_at";

  id_pqrs;
  id_apartment;
  id_user_role;
  id_type_request;
  id_category_request;
  id_priority;
  tracking_number;
  title;
  description;
  id_status;
  created_at;
  updated_at;

  constructor(pqrs) {
    super();
    this.id_pqrs = Utils.isNumeric(parseInt(pqrs?.id_pqrs));
    this.id_apartment = Utils.isNumeric(parseInt(pqrs?.id_apartment));
    this.id_user_role = Utils.isNumeric(parseInt(pqrs?.id_user_role));
    this.id_type_request = Utils.isNumeric(parseInt(pqrs?.id_type_request));
    this.id_category_request = Utils.isNumeric(
      parseInt(pqrs?.id_category_request)
    );
    this.id_priority = Utils.isNumeric(parseInt(pqrs?.id_priority));
    this.tracking_number = Utils._length(pqrs?.tracking_number, 64, 1);
    this.title = Utils._length(pqrs?.title, 64, 1);
    this.description = Utils._length(pqrs?.description, 500, 1);
    this.id_status = Utils.isNumeric(parseInt(pqrs?.id_status));
    this.created_at = Utils.isDate(pqrs?.created_at);
    this.updated_at = Utils.isDate(pqrs?.updated_at);
  }

  get getAll() {
    return {
      id_pqrs: this.id_pqrs,
      id_apartment: this.id_apartment,
      id_user_role: this.id_user_role,
      id_type_request: this.id_type_request,
      id_category_request: this.id_category_request,
      id_priority: this.id_priority,
      tracking_number: this.tracking_number,
      title: this.title,
      description: this.description,
      id_status: this.id_status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
