export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  roleId?: number;
  positionId?: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    gender,
    address,
    phoneNumber,
    roleId,
    positionId,
    image,
    createdAt,
    updatedAt,
  }) {
    if (id !== null) this.id = id;
    if (firstName !== null) this.firstName = firstName;
    if (lastName !== null) this.lastName = lastName;
    if (email !== null) this.email = email;
    if (password !== null) this.password = password;
    if (gender !== null) this.gender = gender;
    if (address !== null) this.address = address;
    if (phoneNumber !== null) this.phoneNumber = phoneNumber;
    if (roleId !== null) this.roleId = roleId;
    if (positionId !== null) this.positionId = positionId;
    if (image !== null) this.image = image;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
