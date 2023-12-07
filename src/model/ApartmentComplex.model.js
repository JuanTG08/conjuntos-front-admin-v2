import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class ApartmentComplexModel extends Model {
  VAR_ID_APARTMENT = "id_apartment";
  VAR_ID_TOWER = "id_tower";
  VAR_APARTMENT_IDENTIFIER_TOWER = "apartment_identifier_tower";
  VAR_LEVEL_FLOOR = "level_floor";
  VAR_NUMBER_BEDROOMS = "number_bedrooms";
  VAR_NUMBER_BATHROOMS = "number_bathrooms";
  VAR_TOTAL_AREA = "total_area";
  VAR_NUMBER_RESIDENTS = "number_residents";
  VAR_CONSTRUCTION_DATE = "construction_date";
  VAR_START_DATE = "start_date";
  VAR_ID_STATUS_APARTMENT = "id_status_apartment";

  id_apartment;
  id_tower;
  apartment_identifier_tower;
  level_floor;
  number_bedrooms;
  number_bathrooms;
  total_area;
  number_residents;
  construction_date;
  start_date;
  id_status_apartment;

  constructor(apartment) {
    super();
    this.id_apartment = parseInt(apartment.id_apartment);
    this.id_tower = parseInt(apartment.id_tower);
    this.apartment_identifier_tower = Utils._length(
      apartment.apartment_identifier_tower,
      64,
      1
    );
    this.level_floor = parseInt(apartment.level_floor);
    this.number_bedrooms = parseInt(apartment.number_bedrooms);
    this.number_bathrooms = parseInt(apartment.number_bathrooms);
    this.total_area = parseInt(apartment.total_area);
    this.number_residents = parseInt(apartment.number_residents);
    this.construction_date = Utils.isDate(apartment.construction_date);
    this.start_date = Utils.isDate(apartment.start_date);
    this.id_status_apartment = parseInt(apartment.id_status_apartment);
  }

  get getAll() {
    return {
      id_apartment: this.id_apartment,
      id_tower: this.id_tower,
      apartment_identifier_tower: this.apartment_identifier_tower,
      level_floor: this.level_floor,
      number_bedrooms: this.number_bedrooms,
      number_bathrooms: this.number_bathrooms,
      total_area: this.total_area,
      number_residents: this.number_residents,
      construction_date: this.construction_date,
      start_date: this.start_date,
      id_status_apartment: this.id_status_apartment,
    };
  }

  get getAllDataForm() {
    return {
      id_apartment: this.id_apartment ? this.id_apartment : "",
      id_tower: this.id_tower ? this.id_tower : "",
      apartment_identifier_tower: this.apartment_identifier_tower
        ? this.apartment_identifier_tower
        : "",
      level_floor: this.level_floor ? this.level_floor : "",
      number_bedrooms: this.number_bedrooms ? this.number_bedrooms : "",
      number_bathrooms: this.number_bathrooms ? this.number_bathrooms : "",
      total_area: this.total_area ? this.total_area : "",
      number_residents: this.number_residents ? this.number_residents : "",
      construction_date: this.construction_date ? this.construction_date : "",
      start_date: this.start_date ? this.start_date : "",
      id_status_apartment: this.id_status_apartment
        ? this.id_status_apartment
        : "",
    };
  }
}
