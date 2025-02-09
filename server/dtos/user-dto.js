export default class UserDto {
  email;
  id;
  fullName;
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.fullName = model.fullName;
  }
}
