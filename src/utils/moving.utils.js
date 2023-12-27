import { CONST_MOVING_STATUS } from "@/constants/moving.constant";

export class MovingUtils {
  static getColorBadgeStatus(idStatus) {
    switch (idStatus) {
      case CONST_MOVING_STATUS.PENDING.id:
        return CONST_MOVING_STATUS.PENDING.color;
      case CONST_MOVING_STATUS.APPROVED_OWNER.id:
        return CONST_MOVING_STATUS.APPROVED_OWNER.color;
      case CONST_MOVING_STATUS.DISAPPROVED.id:
        return CONST_MOVING_STATUS.DISAPPROVED.color;
      case CONST_MOVING_STATUS.FINISHED.id:
        return CONST_MOVING_STATUS.FINISHED.color;
        case CONST_MOVING_STATUS.APPROVED_ADMIN.id:
          return CONST_MOVING_STATUS.APPROVED_ADMIN.color;
      default:
        return CONST_MOVING_STATUS.PENDING.color;
    }
  }
}
