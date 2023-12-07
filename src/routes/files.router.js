import { FilesController } from "@/controller/files.controller";
import { RoutingClass } from "@/lib/Routing";

export class FilesImagesRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: FilesController.apiFileImageSave,
    });
  }
}
export class FilesGetImagesRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: FilesController.apiGetFileImage,
    });
  }
}
