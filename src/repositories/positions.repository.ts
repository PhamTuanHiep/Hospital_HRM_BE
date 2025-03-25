import { DefaultOrderSort } from 'src/common/common.type';
import { FilterPositionsDto } from 'src/dto/common.filter.dto';

const SELECT_POSITION_RELATIONSHIP = [
  'position.positionId',
  'position.positionName',
  'position.createdAt',
  'position.updatedAt',

  'users.userId',
  'users.fullName',
  'users.gender',
  'users.address',
  'users.phoneNumber',
  'users.nation',
  'users.nationality',
  'users.hometown',
  'users.birthday',
  'users.fatherFullName',
  'users.fatherBirthday',
  'users.motherFullName',
  'users.motherBirthday',
  'users.weeklySchedule',
  'users.jobDescription',
  'users.otherDescription',
  'users.status',
  'users.salaryCoefficient',

  'allowanceRelationship.id',

  'allowance.allowanceId',
  'allowance.allowanceType',
  'allowance.allowanceNameVI',
  'allowance.allowanceNameEN',
  'allowance.allowanceRate',
  'allowance.allowanceFee',
];
interface filterGetPositionsProps {
  query: FilterPositionsDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetPositions = async ({
  query,
  repository,
  sortField = 'position.positionId',
  sortOrder = 'ASC',
}: filterGetPositionsProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('position');
  if (Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect('position.users', 'users')
      .leftJoinAndSelect(
        'position.allowanceRelationship',
        'allowanceRelationship',
      )
      .leftJoinAndSelect('allowanceRelationship.allowance', 'allowance')

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
      .leftJoinAndSelect('position.users', 'users')
      .leftJoinAndSelect(
        'position.allowanceRelationship',
        'allowanceRelationship',
      )
      .leftJoinAndSelect('allowanceRelationship.allowance', 'allowance')

      .orderBy(sortField, sortOrder)
      .select(SELECT_POSITION_RELATIONSHIP)
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
