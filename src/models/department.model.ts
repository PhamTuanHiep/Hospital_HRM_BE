export class Department {
  departmentId?: string;
  departmentName?: string;

  constructor({ departmentId, departmentName }) {
    if (departmentId !== null) this.departmentId = departmentId;
    if (departmentName !== null) this.departmentName = departmentName;
  }
}
