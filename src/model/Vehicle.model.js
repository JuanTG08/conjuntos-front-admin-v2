import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class VehicleModel extends Model {
  VAR_ID_APARTMENT = "id_apartment";
  VAR_ID_USER_ROLE = "id_user_role";
  VAR_PLATE = "plate";
  VAR_ID_TYPE_VEHICLE = "id_type_vehicle";
  VAR_BRAND = "brand";
  VAR_MODEL_CAR = "model_car";
  VAR_DESCRIPTION = "description";
  VAR_ID_STATUS = "id_status";

  id_apartment;
  id_user_role;
  plate;
  id_type_vehicle;
  brand;
  model_car;
  description;
  id_status;

  constructor(vehicle) {
    super();
    this.id_apartment = Utils.isNumeric(parseInt(vehicle?.id_apartment));
    this.id_user_role = Utils.isNumeric(parseInt(vehicle?.id_user_role));
    this.plate = Utils._length(vehicle?.plate, 15, 1);
    this.id_type_vehicle = Utils.isNumeric(parseInt(vehicle?.id_type_vehicle));
    this.brand = Utils._length(vehicle?.brand, 60, 1);
    this.model_car = Utils._length(vehicle?.model_car, 100, 1);
    this.description = Utils._length(vehicle?.description, 255, 1);
    this.id_status = Utils.isNumeric(parseInt(vehicle?.id_status));
  }

  get getAll() {
    return {
      id_apartment: this.id_apartment,
      id_user_role: this.id_user_role,
      plate: this.plate,
      id_type_vehicle: this.id_type_vehicle,
      brand: this.brand,
      model_car: this.model_car,
      description: this.description,
      id_status: this.id_status,
    };
  }
}
