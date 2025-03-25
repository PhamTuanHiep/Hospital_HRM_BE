export class FilterDto {
  page?: string;
  items_per_page?: string;
  search?: string;
  departmentId?: string;
}

export class FilterContractHistoriesDto extends FilterDto {
  contractStatus?: string;
  excludesStatus?: string;
}

export class FilterUsersDto extends FilterDto {
  roleId?: string;
  departmentId?: string;
  userStatus?: number;
}

export class FilterAccountsDto extends FilterDto {
  roleId?: string;
}

export class FilterPositionsDto extends FilterDto {}

export class FilterDepartmentsDto extends FilterDto {}

export class FilterAllowanceDto extends FilterDto {}
