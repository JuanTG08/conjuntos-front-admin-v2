import { CONST_TYPES_VEHICLES } from "@/constants/vehicle.constant";

export class VehicleUtils {
  static defineUrlImageVehicle(typeVehicle, url) {
    const typeVehicleGet = CONST_TYPES_VEHICLES.find(
      (type) => type.id === typeVehicle
    );
    if (!url) {
      if (typeVehicle) return typeVehicleGet?.defaultImage;
      return "/svg/car.svg";
    }
    return url;
  }
}
