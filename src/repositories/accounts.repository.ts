import { RoleId } from 'src/common/common.constants';
import { DefaultOrderSort } from 'src/common/common.type';
import { FilterAccountsDto } from 'src/dto/common.filter.dto';

interface filterGetAccountsProps {
  query: FilterAccountsDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetAccounts = async ({
  query,
  repository,
  sortField = 'account.createdAt',
  sortOrder = 'ASC',
}: filterGetAccountsProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('account');
  if (Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('account.user', 'user');

    if (query.roleId) {
      if (query.roleId === RoleId.ADMIN) {
        queryBuilder
          .where('role.roleId = :managerRoleId', { managerRoleId: 'manager' })
          .orWhere('role.roleId = :userRoleId', { userRoleId: 'user' });
      } else if (query.roleId === RoleId.MANAGER) {
        queryBuilder.orWhere('role.roleId = :userRoleId', {
          userRoleId: 'user',
        });
      } else {
      }
    }
    queryBuilder
      .orderBy(sortField, sortOrder)
      .select([
        'account.accountId',
        'account.email',
        'account.password',
        'account.avatar',
        'account.role',
        'account.createdAt',
        'account.updatedAt',

        'role.roleId',
        'role.roleName',

        'user.userId',
        'user.fullName',
      ]); // Chỉ lấy các cột cần thiết
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
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('account.user', 'user')
      .orderBy(sortField, sortOrder)
      .select([
        'account.accountId',
        'account.email',
        'account.password',
        'account.avatar',
        'account.role',
        'account.createdAt',
        'account.updatedAt',

        'role.roleId',
        'role.roleName',

        'user.userId',
        'user.fullName',
      ])
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
