import { DefaultOrderSort } from 'src/common/common.type';
import { FilterAllowanceDto } from 'src/dto/common.filter.dto';

const SELECT_POSITION_RELATIONSHIP = [
  'allowance.allowanceId',
  'allowance.allowanceType',
  'allowance.allowanceNameVI',
  'allowance.allowanceNameEN',
  'allowance.allowanceRate',
  'allowance.allowanceFee',
  'allowance.createdAt',
  'allowance.updatedAt',

  'allowanceRelationships.id',
  'allowanceRelationships.position',
  'allowanceRelationships.department',

  'department.departmentId',
  'department.departmentName',

  'position.positionId',
  'position.positionName',
];
interface filterGetAllowancesProps {
  query: FilterAllowanceDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetAllowances = async ({
  query,
  repository,
  sortField = 'allowance.allowanceId',
  sortOrder = 'ASC',
}: filterGetAllowancesProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('allowance');
  if (Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect(
        'allowance.allowanceRelationships',
        'allowanceRelationships',
      )
      .leftJoinAndSelect('allowanceRelationships.department', 'department')
      .leftJoinAndSelect('allowanceRelationships.position', 'position')
      .orderBy(sortField, sortOrder)
      .select(SELECT_POSITION_RELATIONSHIP);
    if (items_per_page) {
      queryBuilder.take(items_per_page).skip(skip);
    }
    const [res, total] = await queryBuilder.getManyAndCount();

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = !lastPage || page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currentPage: page,
      perPage: items_per_page,
      nextPage,
      prevPage,
      lastPage,
    };
  } else {
    const [res, total] = await queryBuilder
      .leftJoinAndSelect(
        'allowance.allowanceRelationships',
        'allowanceRelationships',
      )
      .leftJoinAndSelect('allowanceRelationships.department', 'department')
      .leftJoinAndSelect('allowanceRelationships.position', 'position')
      .orderBy(sortField, sortOrder)
      .select(SELECT_POSITION_RELATIONSHIP)
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
