export const CONST_STATUS_CODE = {
  ok: {
    id: 1,
    code: 200,
    name: "Ok",
    description: "Éxito en la operación",
    error: false,
  },
  unauthorized: {
    id: 2,
    code: 401,
    name: "Unauthorized",
    description: "Acceso no autorizado",
    error: true,
  },
  notFound: {
    id: 3,
    code: 404,
    name: "NotFound",
    description: "Recurso no encontrado",
    error: true,
  },
  internalServerError: {
    id: 4,
    code: 500,
    name: "InternalServerError",
    description: "Error interno del servidor",
    error: true,
  },
  badRequest: {
    id: 5,
    code: 400,
    name: "BadRequest",
    description: "No se proporcionaron todos los campos requeridos",
    error: true,
  },
  preconditionFailed: {
    id: 6,
    code: 412,
    name: "PreconditionFailed",
    description: "La condición previa especificada no se cumplió",
    error: true,
  },
  unauthorizedUserOverdue: {
    id: 7,
    code: 512,
    name: "User Overdue",
    description:
      "El usuario se encuentra en estado moroso porque el conjunto no ha realizado el pago.",
    error: true,
  },
};

export const CONST_STATUS_CODE_ARRAY = Object.values(CONST_STATUS_CODE);

export const CONST_STATUS_CODE_DEFAULT = CONST_STATUS_CODE.internalServerError;
