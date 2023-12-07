import { env } from "../../next.config";

export class FilesUtils {
  static formatGetImages(imagesName) {
    return (
      env.server.url_local +
      env.server.api.url +
      env.server.api.routes.files.url +
      env.server.api.routes.files.images +
      "/" +
      imagesName
    );
  }
}
