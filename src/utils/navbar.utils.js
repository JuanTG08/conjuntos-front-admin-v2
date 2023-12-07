import { CONST_NAVBAR_USERS, CONST_USER_UA } from "@/constants/user.constant";

export class NavbarUtils {
  static getNavbarUser(idRoleUser = CONST_USER_UA.id) {
    try {
      idRoleUser = idRoleUser || CONST_USER_UA.id;
      const navbarUser = CONST_NAVBAR_USERS.find(({ idRole }) =>
        idRole.find((id) => id === idRoleUser)
      );
      if (!navbarUser)
        return CONST_NAVBAR_USERS.find(({ idRole }) =>
          idRole.find((id) => id === CONST_USER_UA.id)
        );
      return navbarUser;
    } catch (error) {
      return CONST_NAVBAR_USERS.find(({ idRole }) =>
        idRole.find((id) => id === CONST_USER_UA.id)
      );
    }
  }
}