import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";
export class AccessPageModel extends Model {
  VAR_ACCESS_PAGE_ID = "id";
  VAR_ACCESS_PAGE_NAME = "name";
  VAR_ACCESS_PAGE_DESCRIPTION = "description";
  VAR_ACCESS_PAGE_PATH = "path";
  VAR_ACCESS_PAGE_METHOD = "method";
  VAR_ACCESS_PAGE_FROMTO = "fromTo";
  VAR_ACCESS_PAGE_STATUS = "status";

  id;
  name;
  description;
  path;
  method;
  fromTo;
  status;

  constructor(access_page) {
    super();
    this.id = access_page?.id;
    this.name = Utils._length(access_page?.name, 64, 4);
    this.description = Utils._length(access_page?.description, 250, 4);
    this.path = Utils._length(access_page?.path, 128, 1);
    this.method = parseInt(access_page?.method);
    this.fromTo = parseInt(access_page?.fromTo);
    this.status = parseInt(access_page?.status);
  }

  get getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      path: this.path,
      method: this.method,
      fromTo: this.fromTo,
      status: this.status,
    };
  }

  get getAllDataForm() {
    return {
      id: this.id ? this.id : "",
      name: this.name ? this.name : "",
      description: this.description ? this.description : "",
      path: this.path ? this.path : "",
      method: this.method ? this.method : "",
      fromTo: this.fromTo ? this.fromTo : "",
      status: this.status ? this.status : "",
    };
  }
}
