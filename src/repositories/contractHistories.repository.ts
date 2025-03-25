import { OrderSort } from 'src/common/common.constants';
import { DefaultOrderSort } from 'src/common/common.type';
import { FilterContractHistoriesDto } from 'src/dto/common.filter.dto';

interface filterGetContractHistoriesProps {
  query: FilterContractHistoriesDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetContractHistories = async ({
  query,
  repository,
  sortField = 'contractHistory.contractHistoryId',
  sortOrder = OrderSort.ASC,
}: filterGetContractHistoriesProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('contractHistory'); //bí danh tùy ý -> cho gon
  if (query && Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect('contractHistory.user', 'user') // Tham chiếu đến bảng user
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('contractHistory.contract', 'contract')
      .where('contract.contractId = :contractId', { contractId: query.search });
    if (query.contractStatus) {
      const statuses = query.contractStatus
        .split(',')
        .map((s) => parseInt(s.trim(), 10));
      queryBuilder.andWhere('contractHistory.status IN (:...statuses)', {
        statuses,
      });
    } else if (query.excludesStatus) {
      const excludeStatuses = query.excludesStatus
        .split(',')
        .map((s) => parseInt(s.trim(), 10));

      queryBuilder.andWhere(
        'contractHistory.status NOT IN (:...excludeStatuses)',
        {
          excludeStatuses,
        },
      );
    }
    queryBuilder
      .orderBy(sortField, sortOrder)
      .select([
        'contractHistory.contractHistoryId',
        'contractHistory.startDay',
        'contractHistory.endDay',
        'contractHistory.note',
        'contractHistory.suspensionTime',

        'contractHistory.status',
        'contractHistory.updatedAt',
        'contractHistory.createdAt',

        'user.userId',
        'user.fullName',

        'department.departmentId',
        'department.departmentName',

        'position.positionId',
        'position.positionName',

        'contract.contractId',
        'contract.contractNameVI',
        'contract.contractNameEN',
        'contract.note',
      ]);
    if (items_per_page) {
      queryBuilder
        .take(items_per_page) // Số lượng bản ghi mỗi trang
        .skip(skip); // Bỏ qua các bản ghi của trang trước
    }
    const [res, total] = await queryBuilder.getManyAndCount(); // Trả về [danh sách kết quả, tổng số lượng kết quả]

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
      .leftJoinAndSelect('contractHistory.user', 'user') // Tham chiếu đến bảng user
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('contractHistory.contract', 'contract')
      .orderBy(sortField, sortOrder)
      .select([
        'contractHistory.contractHistoryId',
        'contractHistory.startDay',
        'contractHistory.endDay',
        'contractHistory.note',
        'contractHistory.suspensionTime',

        'contractHistory.status',
        'contractHistory.updatedAt',
        'contractHistory.createdAt',

        'user.userId',
        'user.fullName',

        'department.departmentId',
        'department.departmentName',

        'position.positionId',
        'position.positionName',

        'contract.contractId',
        'contract.contractNameVI',
        'contract.contractNameEN',
        'contract.note',
      ])
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
