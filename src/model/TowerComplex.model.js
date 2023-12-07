import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class TowerComplexModel extends Model {
  VAR_ID_TOWER = "id_tower";
  VAR_ID_COMPLEX = "id_complex";
  VAR_TOWER_NAME = "tower_name";
  VAR_TOWER_NUMBER_FLOORS = "number_floors";
  VAR_TOWER_NUMBER_APARTMENTS = "number_apartments";
  VAR_TOWER_CONSTRUCTION_DATE = "construction_date";
  VAR_TOWER_STATUS = "id_status_tower";

  id_tower;
  id_complex;
  tower_name;
  number_floors;
  number_apartments;
  construction_date;
  id_status_tower;

  constructor(tower) {
    super();
    this.id_tower = parseInt(tower.id_tower);
    this.id_complex = parseInt(tower.id_complex );
    this.tower_name = Utils._length(tower.tower_name, 64, 1);
    this.number_floors = parseInt(tower.number_floors);
    this.number_apartments = parseInt(tower.number_apartments);
    this.construction_date = Utils.isDate(tower.construction_date);
    this.id_status_tower = parseInt(tower.id_status_tower);
  }

  get getAll() {
    return {
      id_tower: this.id_tower,
      id_complex: this.id_complex,
      tower_name: this.tower_name,
      number_floors: this.number_floors,
      number_apartments: this.number_apartments,
      construction_date: this.construction_date,
      id_status_tower: this.id_status_tower,
    };
  }

  get getAllDataForm() {
    return {
      id_tower: this.id_tower ? this.id_tower : "",
      id_complex: this.id_complex ? this.id_complex : "",
      tower_name: this.tower_name ? this.tower_name : "",
      number_floors: this.number_floors ? this.number_floors : "",
      number_apartments: this.number_apartments ? this.number_apartments : "",
      construction_date: this.construction_date ? this.construction_date : "",
      id_status_tower: this.id_status_tower ? this.id_status_tower : "",
    };
  }
}
