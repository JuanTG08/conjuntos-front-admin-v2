import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";
import { DateUtils } from "@/utils/date.utils";

export class AccessPersonModel extends Model {
  VAR_ID_ACCESS_PEOPLE = "id_access_people";
  VAR_ID_OWNER = "id_owner";
  VAR_NAME_PERSON = "name_person";
  VAR_EMAIL = "email";
  VAR_DNI_PERSON = "dni_person";
  VAR_COMMENTS = "comments";
  VAR_ID_CATEGORY_ACCESS = "id_category_access";
  VAR_PARKING = "parking";
  VAR_START_DAY_ALLOWED = "start_day_allowed";
  VAR_END_DAY_ALLOWED = "end_day_allowed";
  VAR_START_HOUR_DAY = "start_hour_day";
  VAR_END_HOUR_DAY = "end_hour_day";
  VAR_ID_STATUS_ACCESS_PEOPLE = "id_status_access_people";

  id_access_people;
  id_owner;
  name_person;
  email;
  dni_person;
  comments;
  id_category_access;
  parking;
  start_day_allowed;
  end_day_allowed;
  start_hour_day;
  end_hour_day;
  id_status_access_people;
  constructor(access_person) {
    super();
    this.id_access_people = Utils.isNumeric(access_person?.id_access_people);
    this.id_owner = Utils.isNumeric(access_person?.id_owner);
    this.name_person = Utils._length(access_person?.name_person, 64, 1);
    this.email = Utils.isMail(access_person?.email);
    this.dni_person = Utils._length(access_person?.dni_person, 20, 1);
    this.comments = Utils._length(access_person?.comments, 264, 1);
    this.id_category_access = Utils.isNumeric(
      access_person?.id_category_access
    );
    this.parking = Utils.isBoolean(access_person?.parking)
      ? access_person?.parking
      : undefined;
    this.start_day_allowed = Utils.isDate(access_person?.start_day_allowed);
    this.end_day_allowed = Utils.isDate(access_person?.end_day_allowed);
    this.start_hour_day = DateUtils.validDate(access_person?.start_hour_day);
    this.end_hour_day = DateUtils.validDate(access_person?.end_hour_day);
    this.id_status_access_people = Utils.isNumeric(
      access_person?.id_status_access_people
    );
  }

  get getAll() {
    return {
      id_access_people: this?.id_access_people,
      id_owner: this?.id_owner,
      name_person: this?.name_person,
      email: this?.email,
      dni_person: this?.dni_person,
      comments: this?.comments,
      id_category_access: this?.id_category_access,
      parking: this?.parking,
      start_day_allowed: this?.start_day_allowed,
      end_day_allowed: this?.end_day_allowed,
      start_hour_day: this?.start_hour_day,
      end_hour_day: this?.end_hour_day,
      id_status_access_people: this?.id_status_access_people,
    };
  }

  get getAllDataForm() {
    return {
      id_access_people: this?.id_access_people ? this?.id_access_people : "",
      id_owner: this?.id_owner ? this?.id_owner : "",
      email: this?.email ? this.email : "",
      name_person: this?.name_person ? this?.name_person : "",
      dni_person: this?.dni_person ? this?.dni_person : "",
      comments: this?.comments ? this?.comments : "",
      id_category_access: this?.id_category_access
        ? this?.id_category_access
        : "",
      parking: this?.parking ? this?.parking : false,
      start_day_allowed: this?.start_day_allowed ? this?.start_day_allowed : "",
      end_day_allowed: this?.end_day_allowed ? this?.end_day_allowed : "",
      start_hour_day: this?.start_hour_day ? this?.start_hour_day : "",
      end_hour_day: this?.end_hour_day ? this?.end_hour_day : "",
      id_status_access_people: this?.id_status_access_people
        ? this?.id_status_access_people
        : "",
    };
  }
}
