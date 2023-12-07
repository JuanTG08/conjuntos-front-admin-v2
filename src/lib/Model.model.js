import Utils from "@/helpers/helpers";
export default class Model {
  constructor() {}

  verifyData(exception) {
    return Utils.verifyDataObject(this.getAll, exception);
  }
}
