import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // Importa la localización en español
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export class DateUtils {
  static formatDate(date) {
    const _date = new Date(date);
    const providedDate = dayjs(_date);
    const now = dayjs();

    if (now.isSame(providedDate, "day")) {
      return "Hoy";
    } else if (now.subtract(1, "day").isSame(providedDate, "day")) {
      return "Ayer";
    } else {
      return `${now.diff(providedDate, "day")} días atras`;
    }
  }

  static formatDateToDB(date, separator = "/") {
    const _date = new Date(date).setHours(new Date(date).getHours() + 5);
    return dayjs(_date).format(`YYYY${separator}MM${separator}DD`);
  }

  static formatDateToDBHour(date) {
    const _date = dayjs(date).tz("America/Bogota");
    return _date.format("YYYY-MM-DDTHH:mm:ss");
  }

  static validDate(fecha) {
    // Intenta crear un objeto Date con la fecha proporcionada.
    const fechaObj = new Date(fecha);
    // Verifica si el objeto Date es válido y si la fecha es igual a la fecha original.
    // Esto ayuda a manejar casos como '2022-02-30', que JavaScript ajusta al 2022-03-02.
    return !isNaN(fechaObj) ? fecha : undefined;
  }

  static getDateInLettersSpanish(date) {
    dayjs.locale("es"); // Configura la localización en español
    const _date = dayjs(date);
    const dateFormated = _date.format("dddd, D [de] MMMM [del] YYYY");
    return dateFormated;
  }

  static getHourInLettersSpanish(date) {
    dayjs.locale("es"); // Configura la localización en español
    const _date = dayjs(date);
    const dateFormated = _date.format("hh:mm A");
    return dateFormated;
  }

  static getDateDependMyUTC(fechaDB) {
    const zonaHorariaCliente = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zonaHorariaCliente) {
      // Calcular la diferencia de horas entre la zona horaria del cliente y UTC
      const diferenciaHoras = -dayjs().tz(zonaHorariaCliente).utcOffset() / 60;
      // Convertir la fecha de la base de datos a la zona horaria del cliente y aplicar ajuste dinámico
      const fechaAjustada = dayjs(fechaDB).add(diferenciaHoras, "hour");
      return fechaAjustada.format(); // Puedes devolver la fecha formateada como desees
    }

    // Si no se puede obtener la zona horaria del cliente, devolver la fecha sin ajustes
    return fechaDB;
  }

  static compareDatesToDate(date) {
    const today = dayjs();

    const dateToCompare = dayjs(date).utc();
    if (dateToCompare.isSame(today) || dateToCompare.isAfter(today)) {
      return true;
    }
    return false;
  }

  static compareDatesToYesterday(date) {
    const yesterday = dayjs().subtract(1, "day"); // Obtenemos la fecha de ayer
    const dateToCompare = dayjs(date).utc();
    return dateToCompare.isAfter(yesterday);
  }
}
