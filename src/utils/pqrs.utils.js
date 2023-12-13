import {
  CONST_PQRS_PRIORITY,
  CONST_PQRS_STATUS,
} from "@/constants/pqrs.constant";

export class PQRSUtils {
  static getColorBadgeStatus(idStatus) {
    if (idStatus === CONST_PQRS_STATUS.PENDING.id)
      return CONST_PQRS_STATUS.PENDING.color;
    else if (idStatus === CONST_PQRS_STATUS.RESOLVED.id)
      return CONST_PQRS_STATUS.RESOLVED.color;
    return CONST_PQRS_STATUS.PENDING.color;
  }

  static getColorBadgePriority(idPriority) {
    if (idPriority === CONST_PQRS_PRIORITY.LOW.id)
      return CONST_PQRS_PRIORITY.LOW.color;
    else if (idPriority === CONST_PQRS_PRIORITY.MEDIUM.id)
      return CONST_PQRS_PRIORITY.MEDIUM.color;
    return CONST_PQRS_PRIORITY.HIGH.color;
  }
}
