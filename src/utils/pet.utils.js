import {
  CONST_GENDER_FEMALE,
  CONST_GENDER_MALE,
  CONST_TYPES_PETS,
} from "@/constants/pets.constant";

export class PetUtils {
  static defineUrlImagePet(typePet, url) {
    const typePetGet = CONST_TYPES_PETS.find((type) => type.id === typePet);
    if (!url) {
      if (typePetGet) return typePetGet.defaultImage;
      return "/svg/pets.svg";
    }
    return url;
  }

  static getGender(gender) {
    return gender === CONST_GENDER_FEMALE.id
      ? CONST_GENDER_FEMALE.value
      : CONST_GENDER_MALE.value;
  }
}
