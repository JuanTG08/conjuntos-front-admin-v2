import { CONST_ADVERTISEMENT_VALID_DATE } from "@/constants/advertisement.constant";
import { CONST_COLOR_LIST } from "@/constants/color.constant";
import {
  CONST_PATH_SEPARATOR_METHOD_TO_PATH,
  CONST_PATH_SEPARATOR_PATHS,
} from "@/constants/path.constant";

export default class Utils {
  static Message(error, statusCode, message, payload = false) {
    return {
      error,
      statusCode,
      message,
      payload,
    };
  }
  /* Realizamos todas las funciones relacionadas a la encriptación */
  static encryptPassword(password) {
    return bcryptjs.hashSync(password, 8);
  }

  static verifyHash(encrypt, value) {
    return bcryptjs.compareSync(value, encrypt);
  }

  static encrypt(value, key) {
    bcryptjs.hash();
    const encrypt = CryptoJS.AES.encrypt(value, key);
    return encrypt.toString();
  }

  static decrypt(encrypt, key) {
    try {
      const decrypt = CryptoJS.AES.decrypt(encrypt, key).toString();
      return decrypt;
    } catch (error) {
      return false;
    }
  }

  /* Realizamos todo lo relacionado al tiempo */
  static getStimationTimeMins(timeNow, expiration_time_min) {
    const estimateTimeExpirationMin = expiration_time_min * 1000 * 60; // Calculamos los minutos pasados por el argurmento, lo transformamos a minutos
    return timeNow + estimateTimeExpirationMin; // Le establecemos esos minutos al tiempo actual
  }

  /* Verificamos el rol correspondiente */
  static isVerRol(req, rolArray) {
    const role = req.body.sessionID.role || "";
    return rolArray.filter((rol) => role === rol).length > 0;
  }

  /* Verificacion de las variables */
  static isNumeric(value) {
    if (typeof value == "string") value = parseInt(value);
    if (Number.isNaN(value)) return undefined;
    return typeof value === "number" ? parseInt(value.toString()) : undefined;
  }
  static isString(value) {
    return typeof value === "string" ? value : undefined;
  }
  static isBoolean(value) {
    return typeof value === "boolean" ? value : undefined;
  }
  static isDate(value) {
    return isNaN(Date.parse(value)) ? undefined : new Date(value);
  }
  static isObject(value) {
    return typeof value === "object";
  }

  /* Verificamos la longitud del campo dado */
  static _length(value, max, min, return_string = true) {
    if (value == undefined || value == null) return undefined;
    if (typeof value == "object")
      return value.length <= max && value.length >= min ? value : undefined;
    const value_ = value.toString();
    if (value_.length <= max && value_.length >= min)
      return return_string ? value_ : value;
    return undefined;
  }

  static isMail(email) {
    const expresionMail =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return expresionMail.test(email) ? email : undefined;
  }

  /* Verificamos las laves de los objetos */
  static verifyObjectKey(obj, keys, keyLength = 1) {
    if (!obj) return undefined;
    let response = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (keys.filter((_key) => _key === key)) response[key] = value;
    });
    return Object.entries(response).length >= keyLength ? response : undefined;
  }

  /* Validamos si lo que nos pasan por un array son numeros */
  static verifyArrayNumber(array) {
    try {
      if (!Array.isArray(array)) {
        return false;
      }
      const valid = array.every((value) => typeof value === "number");
      return valid;
    } catch (error) {
      return false;
    }
  }

  /* Estructuramos los datos de un objeto */
  static structureObject(obj) {
    let response = {};
    Object.entries(obj).forEach(([key, val]) => {
      if (val !== undefined && !Number.isNaN(val)) response[key] = val;
      if (val === "") response[key] = val;
    });
    return Object.entries(response).length > 0 ? response : undefined;
  }

  /* Verificacion del total de datos en un Array */
  static verifyDataObject = (obj, exception = []) => {
    let error = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (!exception.includes(key)) {
        if (val === undefined || val === null || Number.isNaN(val))
          error.push(key);
      }
    });
    return error.length === 0 ? true : error;
  };

  // Verificacion del ID
  static verifyId(id) {
    return !(!id || id === undefined || id === null || id.length <= 0);
  }

  static undefinedValue(value, valueDefault) {
    return value === undefined || Number.isNaN(value) ? valueDefault : value;
  }

  /* Obtenemos el tiempo deseado */
  static getTime = (min = 0) => {
    const miliseconds = 60000 * min;
    return new Date(new Date().getTime() + miliseconds).getTime();
  };

  // Obtenemos el tipo de aplicacion
  static getTypeApplication(application_type) {
    return TypesApplications.filter(({ type }) => application_type === type)[0];
  }

  // Establecemos los datos para la generacion
  // Cuando estemos en el UPDATE VALIDAMOS
  static setDataForm(template, data = null) {
    if (data && typeof data === "object") {
      Object.entries(obj).forEach(([key, value]) => {
        template.find((val, ind) =>
          val.inputName == key ? (data[ind] = value) : data[ind]
        );
      });
    }
    return template;
  }

  // Desestructaremos los datos tipo DataForm
  static destrucDataForm(dataForm) {
    let initialValues = {};
    let validationSchema = {};
    dataForm.map((val, ind) => {
      initialValues = {
        ...initialValues,
        [val.inputName]: val.value,
      };
      validationSchema = {
        ...validationSchema,
        [val.inputName]: val.valid,
      };
    });
    return { initialValues, validationSchema };
  }

  // Obtenemos la ruta que desea acceder, su metodo y el listado de rutas validas para su acceso
  static validPaths(path, method, pathsValid) {
    try {
      // Obtenemos el listado de rutas validas y las separamos convirtiendola en un array
      pathsValid = pathsValid.split(CONST_PATH_SEPARATOR_PATHS);
      // Recorremos el listado de rutas validas para ver si existe la ruta que desea acceder
      return pathsValid.some((ruta) => {
        // Destructuramos la ruta y obtenemos el path y el metodo separandolo por el caracter
        const [pathValid, pathMethod] = ruta.split(
          CONST_PATH_SEPARATOR_METHOD_TO_PATH
        );
        // Creamos una expresion regular para validar la ruta
        const rutaRegExp = new RegExp(
          "^" + pathValid.replace(/\[.*?\]/g, "[\\w-]+") + "(\\.jpeg)?$"
        );
        // Validamos que la ruta sea igual a la que desea acceder y que el metodo sea igual al que desea accede
        return pathMethod === method && rutaRegExp.test(path);
      });
    } catch (error) {
      return false;
    }
  }

  static validPathsToRedirectDashboard(pathsTo) {
    try {
      const listToRedirect = [
        "/",
        "/service-and-pricing",
        "/blog",
        "/about-us",
        "/contact-us",
        "/policy-and-privacy",
        "/support",
        "/faq",
      ];
      return listToRedirect.includes(pathsTo);
    } catch (error) {
      return false;
    }
  }

  static validOkMessages(...args) {
    try {
      return args.every(
        (msg) => msg.error === false && msg.statusCode === 200 && msg.payload
      );
    } catch (error) {
      return false;
    }
  }

  static extractNumberToObjectAndConvertToArray(obj, flag) {
    try {
      return Object.keys(obj)
        .filter((key) => obj[key] === true)
        .map((key) => {
          const id = parseInt(key.replace(flag, ""), 10);
          return isNaN(id) ? null : id;
        })
        .filter((id) => id !== null);
    } catch (error) {
      return false;
    }
  }

  static getStatusAdvertisementByDate(dateStart, dateEnd) {
    try {
      const dateToday = new Date();
      if (dateToday.getTime() < dateStart.getTime())
        return CONST_ADVERTISEMENT_VALID_DATE.LOADING;
      else if (
        dateToday.getTime() > dateStart.getTime() &&
        dateToday.getTime() < dateEnd.getTime()
      )
        return CONST_ADVERTISEMENT_VALID_DATE.PROGRESS;
      else if (dateToday.getTime() > dateEnd.getTime())
        return CONST_ADVERTISEMENT_VALID_DATE.FINALIZED;
      else return CONST_ADVERTISEMENT_VALID_DATE.ERROR;
    } catch (error) {
      console.log(error);
      return CONST_ADVERTISEMENT_VALID_DATE.ERROR;
    }
  }

  static getToColorList = (ind) => {
    return CONST_COLOR_LIST[ind % CONST_COLOR_LIST.length];
  };

  /**
   * Checks if the given value is valid as phone number
   * @param {Number|String} number
   * @return {Boolean}
   */
  static isAValidPhoneNumber = (number) => {
    return /^[\d\+\-\(\) ]+$/.test(number);
  };
}
