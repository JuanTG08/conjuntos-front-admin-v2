import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class MovingModel extends Model {
  VAR_ID_MOVING = "id_moving";
  VAR_ID_APARTMENT = "id_apartment";
  VAR_ID_USER_ROLE = "id_user_role";
  VAR_DESCRIPTION = "description";
  VAR_MOVING_DATE = "moving_date";
  VAR_ID_STATUS = "id_status";
  VAR_CREATED_AT = "created_at";
  VAR_UPDATED_AT = "updated_at";

  id_moving;
  id_apartment;
  id_user_role;
  description;
  moving_date;
  id_status;
  created_at;
  updated_at;

  constructor(moving) {
    super();
    this.id_moving = Utils.isNumeric(parseInt(moving.id_moving));
    this.id_apartment = Utils.isNumeric(parseInt(moving.id_apartment));
    this.id_user_role = Utils.isNumeric(parseInt(moving.id_user_role));
    this.description = Utils._length(moving.description, 300, 1);
    this.moving_date = Utils.isDate(moving.moving_date);
    this.id_status = Utils.isNumeric(parseInt(moving.id_status));
    this.created_at = Utils.isDate(moving.created_at);
    this.updated_at = Utils.isDate(moving.updated_at);
  }

  get getAll() {
    return {
      id_moving: this.id_moving,
      id_apartment: this.id_apartment,
      id_user_role: this.id_user_role,
      description: this.description,
      moving_date: this.moving_date,
      id_status: this.id_status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
