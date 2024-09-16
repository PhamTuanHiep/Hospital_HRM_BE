export class User {
  userId?: number;
  fullName?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  nation?: string;
  nationality?: string;
  hometown?: string;
  positionId?: string;
  birthday?: string;
  image?: string;
  fatherFullName?: string;
  fatherBirthday?: string;
  motherFullName?: string;
  motherBirthday?: string;
  departmentId?: string;
  insuranceId?: string;
  evaluateId?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;

  constructor({
    userId,
    fullName,
    gender,
    address,
    phoneNumber,
    nation,
    nationality,
    hometown,
    positionId,
    birthday,
    image,
    fatherFullName,
    fatherBirthday,
    motherFullName,
    motherBirthday,
    departmentId,
    insuranceId,
    evaluateId,
    description,
    createdAt,
    updatedAt,
    status,
  }) {
    if (userId !== null) this.userId = userId;
    if (fullName !== null) this.fullName = fullName;
    if (gender !== null) this.gender = gender;
    if (address !== null) this.address = address;
    if (phoneNumber !== null) this.phoneNumber = phoneNumber;
    if (nation !== null) this.nation = nation;
    if (nationality !== null) this.nationality = nationality;
    if (hometown !== null) this.hometown = hometown;
    if (positionId !== null) this.positionId = positionId;
    if (birthday !== null) this.birthday = birthday;
    if (image !== null) this.image = image;
    if (fatherFullName !== null) this.fatherFullName = fatherFullName;
    if (fatherBirthday !== null) this.fatherBirthday = fatherBirthday;
    if (motherFullName !== null) this.motherFullName = motherFullName;
    if (motherBirthday !== null) this.motherBirthday = motherBirthday;
    if (departmentId !== null) this.departmentId = departmentId;
    if (insuranceId !== null) this.insuranceId = insuranceId;
    if (evaluateId !== null) this.evaluateId = evaluateId;
    if (description !== null) this.description = description;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
    if (status !== null) this.status = status;
  }
}
