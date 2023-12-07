import Utils from "@/helpers/helpers";
import Model from "@/lib/Model.model";

export class PetModel extends Model {
  VAR_ID_PET = "id_pet";
  VAR_NAME = "name";
  VAR_TYPE_PET = "type_pet";
  VAR_BREED = "breed";
  VAR_AGE = "age";
  VAR_GENDER = "gender";
  VAR_COLOR = "color";
  VAR_BIRTH_DAY = "birth_day";
  VAR_LAST_VACCINE = "last_vaccine";
  VAR_PHOTOGRAPHY = "photography";
  VAR_BEHAVIOR = "behavior";
  VAR_CREATEDAT = "createdAt";
  VAR_UPDATEDAT = "updatedAt";

  id_pet;
  name;
  type_pet;
  breed;
  age;
  gender;
  color;
  birth_day;
  last_vaccine;
  photography;
  behavior;
  createdAt;
  updatedAt;
  constructor(pet) {
    super();

    this.id_pet = parseInt(pet.id_pet);
    this.name = Utils._length(pet.name, 100, 1);
    this.type_pet = parseInt(pet.type_pet);
    this.breed = parseInt(pet.breed);
    this.age = parseInt(pet.age);
    this.gender = parseInt(pet.gender);
    this.color = parseInt(pet.color);
    this.birth_day = Utils.isDate(pet.birth_day);
    this.last_vaccine = Utils.isDate(pet.last_vaccine);
    this.photography = parseInt(pet.photography);
    this.behavior = parseInt(pet.behavior);
    this.createdAt = Utils.isDate(pet.createdAt);
    this.updatedAt = Utils.isDate(pet.updatedAt);
  }

  get getAll() {
    return {
      id_pet: this.id_pet,
      name: this.name,
      type_pet: this.type_pet,
      breed: this.breed,
      age: this.age,
      gender: this.gender,
      color: this.color,
      birth_day: this.birth_day,
      last_vaccine: this.last_vaccine,
      photography: this.photography,
      behavior: this.behavior,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  get getAllDataForm() {
    return {
      id_pet: this.id_pet || "",
      name: this.name || "",
      type_pet: this.type_pet || "",
      breed: this.breed || "",
      age: this.age || "",
      gender: this.gender || "",
      color: this.color || "",
      birth_day: this.birth_day || "",
      last_vaccine: this.last_vaccine || "",
      photography: this.photography || "",
      behavior: this.behavior || "",
      createdAt: this.createdAt || "",
      updatedAt: this.updatedAt || "",
    };
  }
}
