export class FilterDto {
  page?: string;
  items_per_page?: string;
  search?: string;
}

export class FilterContractHistoriesDto extends FilterDto {
  contractStatus?: string;
}

export class FilterUsersDto extends FilterDto {
  roleId?: string;
}
