import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";
export class ResidencialComplex extends Model {
  VAR_ID_COMPLEX = "id_complex";
  VAR_COMPLEX_NAME = "complex_name";
  VAR_COMPLEX_NIT = "complex_nit";
  VAR_COMPLEX_ADDRESS = "complex_address";
  VAR_ID_COMPLEX_CITY = "id_complex_city";
  VAR_COMPLEX_NEIGHBORHOOD = "complex_neighborhood";
  VAR_WEB_SITE = "web_site";
  VAR_COMPLEX_ZIP = "complex_zip";
  VAR_NUMBER_BUILDINGS = "number_buildings";
  VAR_NUMBER_UNITS = "number_units";
  VAR_CONSTRUCTION_DATE = "construction_date";
  VAR_TOTAL_AREA = "total_area";
  VAR_ID_COMPLEX_STATUS = "id_complex_status";
  VAR_ADMIN_PHONE = "admin_phone";
  VAR_PORTER_PHONE = "porter_phone";

  _id_complex;
  _complex_name;
  _complex_nit;
  _complex_address;
  _id_complex_city;
  _complex_neighborhood;
  _web_site = "";
  _complex_zip = "";
  _number_buildings;
  _number_units;
  _construction_date;
  _total_area;
  _id_complex_status;
  admin_phone;
  porter_phone;

  constructor(complex) {
    super();
    this._id_complex = complex.id_complex;
    this._complex_name = Utils._length(complex.complex_name, 120, 5);
    this._complex_nit = Utils._length(complex.complex_nit, 64, 1);
    this._complex_address = Utils._length(complex.complex_address, 64, 1);
    this._id_complex_city = parseInt(complex.id_complex_city);
    this._complex_neighborhood = Utils._length(
      complex.complex_neighborhood,
      64,
      1
    );
    this._web_site = Utils._length(complex.web_site, 120, 0);
    this._complex_zip = Utils._length(complex.complex_zip, 32, 0);
    this._number_buildings = parseInt(complex.number_buildings);
    this._number_units = parseInt(complex.number_units);
    this._construction_date = Utils.isDate(complex.construction_date);
    this._total_area = parseInt(complex.total_area);
    this._id_complex_status = parseInt(complex.id_complex_status);
    this.admin_phone = Utils._length(complex?.admin_phone, 20, 1);
    this.porter_phone = Utils._length(complex?.porter_phone, 20, 1);
  }

  get getAll() {
    return {
      id_complex: this._id_complex,
      complex_name: this._complex_name,
      complex_nit: this._complex_nit,
      complex_address: this._complex_address,
      id_complex_city: this._id_complex_city,
      complex_neighborhood: this._complex_neighborhood,
      web_site: this._web_site,
      complex_zip: this._complex_zip,
      number_buildings: this._number_buildings,
      number_units: this._number_units,
      construction_date: this._construction_date,
      total_area: this._total_area,
      id_complex_status: this._id_complex_status,
      admin_phone: this.admin_phone,
      porter_phone: this.porter_phone,
    };
  }

  get getAllDataForm() {
    return {
      id_complex: this._id_complex ? this._id_complex : "",
      complex_name: this._complex_name ? this._complex_name : "",
      complex_nit: this._complex_nit ? this._complex_nit : "",
      complex_address: this._complex_address ? this._complex_address : "",
      id_complex_city: this._id_complex_city ? this._id_complex_city : "",
      complex_neighborhood: this._complex_neighborhood
        ? this._complex_neighborhood
        : "",
      web_site: this._web_site ? this._web_site : "",
      complex_zip: this._complex_zip ? this._complex_zip : "",
      number_buildings: this._number_buildings ? this._number_buildings : "",
      number_units: this._number_units ? this._number_units : "",
      construction_date: this._construction_date ? this._construction_date : "",
      total_area: this._total_area ? this._total_area : "",
      id_complex_status: this._id_complex_status ? this._id_complex_status : "",
      admin_phone: this.admin_phone ? this.admin_phone : "",
      porter_phone: this.porter_phone ? this.porter_phone : "",
    };
  }
}
