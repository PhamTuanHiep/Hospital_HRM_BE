import { DefaultOrderSort } from 'src/common/common.type';
import { FilterDepartmentsDto } from 'src/dto/common.filter.dto';

const SELECT_DEPARTMENT_RELATIONSHIP = [
  'department.departmentId',
  'department.departmentName',
  'department.location',
  'department.funcDescription',
  'department.createdAt',
  'department.updatedAt',

  'users.userId',
  'users.fullName',
  'users.gender',
  'users.address',

  'overtimeHistories.overtimeHistoryId',
  'overtimeHistories.startDay',
  'overtimeHistories.endDay',
  'overtimeHistories.note',

  'overtime.overtimeId',
  'overtime.overtimeName',
  'overtime.overtimePay',

  'user.userId',
  'user.fullName',

  'allowanceRelationship.id',

  'allowance.allowanceId',
  'allowance.allowanceType',
  'allowance.allowanceNameVI',
  'allowance.allowanceNameEN',
  'allowance.allowanceRate',
  'allowance.allowanceFee',
];
interface filterGetDepartmentsProps {
  query: FilterDepartmentsDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetDepartments = async ({
  query,
  repository,
  sortField = 'department.departmentId',
  sortOrder = 'ASC',
}: filterGetDepartmentsProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('department');
  if (Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect('department.users', 'users')
      .leftJoinAndSelect('department.overtimeHistories', 'overtimeHistories')
      .leftJoinAndSelect('overtimeHistories.overtime', 'overtime')
      .leftJoinAndSelect('overtimeHistories.user', 'user')

      .leftJoinAndSelect(
        'department.allowanceRelationship',
        'allowanceRelationship',
      )
      .leftJoinAndSelect('allowanceRelationship.allowance', 'allowance');
    if (query.departmentId) {
      queryBuilder.where('department.departmentId LIKE :departmentId', {
        departmentId: `%${query.departmentId}%`,
      });
    }
    queryBuilder
      .orderBy(sortField, sortOrder)
      .select(SELECT_DEPARTMENT_RELATIONSHIP);
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
      .leftJoinAndSelect('department.users', 'users')
      .leftJoinAndSelect('department.overtimeHistories', 'overtimeHistories')
      .leftJoinAndSelect('overtimeHistories.overtime', 'overtime')
      .leftJoinAndSelect('overtimeHistories.user', 'user')
      .leftJoinAndSelect(
        'department.allowanceRelationship',
        'allowanceRelationship',
      )
      .leftJoinAndSelect('allowanceRelationship.allowance', 'allowance')

      .orderBy(sortField, sortOrder)
      .select(SELECT_DEPARTMENT_RELATIONSHIP)
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
