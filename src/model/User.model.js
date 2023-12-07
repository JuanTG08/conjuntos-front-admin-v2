import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class UserModel extends Model {
  VAR_USER_ID = "id";
  VAR_USER_EMAIL = "email";
  VAR_USER_NAME = "name";
  VAR_USER_LAST_NAME = "last_name";
  VAR_USER_PARENT_USER = "parent_user";
  VAR_USER_STATUS = "status";
  VAR_USER_ID_PROFILE_PICTURE = "id_profile_picture";
  VAR_USER_ID_TYPE_IDENTIFICATION = "id_type_identification";
  VAR_USER_NUMBER_IDENTIFICATION = "number_identification";
  VAR_USER_MOBILE_PHONE = "mobile_phone";
  VAR_USER_HOME_PHONE = "home_phone";
  VAR_USER_RESIDENCE_ADDRESS = "residence_address";
  VAR_USER_ID_CITY = "id_city";
  VAR_USER_ID_GENDER = "id_gender";
  VAR_USER_BIRTHDATE = "birthdate";

  id;
  email;
  name;
  last_name;
  parent_user;
  status;
  id_profile_picture;
  id_type_identification;
  number_identification;
  mobile_phone;
  home_phone;
  residence_address;
  id_city;
  id_gender;
  birthdate;

  constructor(user) {
    super();
    this.id = parseInt(user?.id);
    this.email = Utils.isMail(user?.email);
    this.name = Utils._length(user.name, 100, 1);
    this.last_name = Utils._length(user.last_name, 100, 1);
    this.parent_user = parseInt(user.parent_user);
    this.status = parseInt(user.status);
    this.id_profile_picture = parseInt(user.id_profile_picture);
    this.id_type_identification = parseInt(user.id_type_identification);
    this.number_identification = parseInt(user.number_identification);
    this.mobile_phone = parseInt(user.mobile_phone);
    this.home_phone = parseInt(user.home_phone);
    this.residence_address = Utils._length(user.residence_address, 64, 1);
    this.id_city = parseInt(user.id_city);
    this.id_gender = parseInt(user.id_gender);
    this.birthdate = Utils.isDate(user.birthdate);
  }

  get getAll() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      last_name: this.last_name,
      parent_user: this.parent_user,
      status: this.status,
      id_profile_picture: this.id_profile_picture,
      id_type_identification: this.id_type_identification,
      number_identification: this.number_identification,
      mobile_phone: this.mobile_phone,
      home_phone: this.home_phone,
      residence_address: this.residence_address,
      id_city: this.id_city,
      id_gender: this.id_gender,
      birthdate: this.birthdate,
    };
  }

  get getAllDataForm() {
    return {
      id: this.id ? this.id : "",
      email: this.email ? this.email : "",
      name: this.name ? this.name : "",
      last_name: this.last_name ? this.last_name : "",
      parent_user: this.parent_user ? this.parent_user : "",
      status: this.status ? this.status : "",
      id_profile_picture: this.id_profile_picture ? this.id_profile_picture : "",
      id_type_identification: this.id_type_identification ? this.id_type_identification : "",
      number_identification: this.number_identification ? this.number_identification : "",
      mobile_phone: this.mobile_phone ? this.mobile_phone : "",
      home_phone: this.home_phone ? this.home_phone : "",
      residence_address: this.residence_address ? this.residence_address : "",
      id_city: this.id_city ? this.id_city : "",
      id_gender: this.id_gender ? this.id_gender : "",
      birthdate: this.birthdate ? this.birthdate : "",
    };
  }
}
