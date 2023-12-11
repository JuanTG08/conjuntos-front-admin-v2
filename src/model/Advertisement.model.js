import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class AdvertisementModel extends Model {
  VAR_ID_ADVERTISEMENT = "id_advertisement";
  VAR_ID_COMPLEX = "id_complex";
  VAR_TITLE = "title";
  VAR_DESCRIPTION = "description";
  VAR_MINIATURE = "miniature";
  VAR_TRANSMITTER = "transmitter";
  VAR_STATUS_ADV = "status_adv";
  VAR_STATUS_TYPE = "status_type";
  VAR_CATEGORY_ADV = "category_adv";

  VAR_COMPLEX_IDS = "complex_ids";
  VAR_TOWERS_IDS = "towers_ids";
  VAR_APARTMENTS_IDS = "apartments_ids";
  VAR_USERS_IDS = "users_ids";
  VAR_ID_APARTMENT = "idApartment";

  id_advertisement;
  id_complex;
  title;
  description;
  miniature;
  transmitter;
  status_adv;
  status_type;
  category_adv;

  moreData = {};
  complex_ids = [];
  towers_ids = [];
  apartments_ids = [];
  users_ids = [];
  idApartment;

  constructor({
    id_advertisement,
    id_complex,
    title,
    description,
    miniature,
    status_type,
    transmitter,
    status_adv,
    complex_ids,
    towers_ids,
    apartments_ids,
    users_ids,
    idApartment,
    category_adv,
    ...moreData
  }) {
    super();
    this.id_advertisement = parseInt(id_advertisement);
    this.id_complex = parseInt(id_complex);
    this.title = Utils._length(title, 64, 4);
    this.description = Utils._length(description, 1000, 1);
    this.miniature = parseInt(miniature);
    this.status_type = parseInt(status_type);
    this.transmitter = parseInt(transmitter);
    this.status_adv = parseInt(status_adv);
    this.category_adv = parseInt(category_adv);

    this.moreData = moreData;

    this.complex_ids = complex_ids ? complex_ids : [];
    this.towers_ids = towers_ids ? towers_ids : [];
    this.apartments_ids = apartments_ids ? apartments_ids : [];
    this.users_ids = users_ids ? users_ids : [];
    this.idApartment = parseInt(idApartment);
  }

  get getAll() {
    return {
      id_advertisement: this.id_advertisement,
      id_complex: this.id_complex,
      title: this.title,
      description: this.description,
      miniature: this.miniature,
      status_type: this.status_type,
      transmitter: this.transmitter,
      status_adv: this.status_adv,
      moreData: this.moreData,
      complex_ids: this.complex_ids,
      towers_ids: this.towers_ids,
      apartments_ids: this.apartments_ids,
      users_ids: this.users_ids,
      idApartment: this.idApartment,
      category_adv: this.category_adv,
    };
  }

  get getAllDataForm() {
    return {
      id_advertisement: this.id_advertisement ? this.id_advertisement : null,
      id_complex: this.id_complex ? this.id_complex : null,
      title: this.title ? this.title : null,
      description: this.description ? this.description : null,
      miniature: this.miniature ? this.miniature : null,
      status_type: this.status_type ? this.status_type : null,
      transmitter: this.transmitter ? this.transmitter : null,
      status_adv: this.status_adv ? this.status_adv : null,
      moreData: this.moreData,
      complex_ids: this.complex_ids ? this.complex_ids : [],
      towers_ids: this.towers_ids ? this.towers_ids : [],
      apartments_ids: this.apartments_ids ? this.apartments_ids : [],
      users_ids: this.users_ids ? this.users_ids : [],
      idApartment: this.idApartment ? this.idApartment : null,
      category_adv: this.category_adv ? this.category_adv : null,
    };
  }
}
