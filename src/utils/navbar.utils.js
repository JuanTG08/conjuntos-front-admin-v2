import {
  CONST_NAVBAR_ICON_DEFAULT,
  CONST_NAVBAR_LIST_ICONS,
} from "@/constants/navbar.constant";

export class NavbarUtils {
  static getIcon(icon) {
    const findIcon = CONST_NAVBAR_LIST_ICONS.find(({ name }) => name === icon);
    if (findIcon) return findIcon.icon;
    return CONST_NAVBAR_ICON_DEFAULT.icon;
  }
}
