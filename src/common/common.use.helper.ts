import { extname } from 'path';
import { Like } from 'typeorm';
import { BaseFile, DefaultOrderSort, Relations, Select } from './common.type';
import {
  FilterContractHistoriesDto,
  FilterDto,
  FilterUsersDto,
} from 'src/dto/common.filter.dto';
import { RoleId } from './common.constants';

interface FilterGetAllProps<T extends string> {
  query: FilterDto;
  repository: any;
  relations?: Relations<T>;
  select?: Select<T>;
  arrSearch?: string[];
  order?: any;
}
export const filterGetAll = async ({
  query,
  repository,
  relations,
  select,
  arrSearch = [],
  order,
}: FilterGetAllProps<string>): Promise<any> => {
  const items_per_page = Number(query.items_per_page) || 4;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const keyword = query.search || '';

  //phương thức của TypeORM repository
  //Tìm kiếm các bản ghi dựa trên điều kiện được cung cấp
  //Đếm tổng số bản ghi phù hợp với điều kiện, không phụ thuộc vào pagination
  //res: Một mảng chứa danh sách các bản ghi phù hợp với điều kiện tìm kiếm.
  //total: Tổng số bản ghi phù hợp với điều kiện (số lượng toàn bộ bản ghi không phụ thuộc vào take và skip)
  const [res, total] = await repository.findAndCount({
    //Like tìm kiếm dựa trên mẫu chuỗi.
    //%: Là ký tự đại diện trong SQL.
    //'%keyword%' có nghĩa là tìm kiếm bất kỳ chuỗi nào có chứa keyword ở bất kỳ vị trí nào trong chuỗi.
    where: arrSearch.map((elSearch) => ({
      [elSearch]: Like('%' + keyword + '%'),
    })),
    // [
    //   { first_name: Like('%' + keyword + '%') },
    //   { last_name: Like('%' + keyword + '%') },
    //   { email: Like('%' + keyword + '%') },
    // ],
    order: order ?? { createdAt: 'ASC' },
    take: items_per_page, //số lượng bản ghi tối đa sẽ được trả về cho mỗi lần truy vấn
    skip: skip, //số lượng bản ghi sẽ bỏ qua khi truy vấn
    relations,
    // relations: {
    //   user: true,
    // },
    select,
    // select: [
    //     'id',
    //     'first_name',
    //     'last_name',
    //     'email',
    //     'status',
    //     'created_at',
    //     'updated_at',
    //   ],
  });
  const lastPage = Math.ceil(total / items_per_page);
  const nextPage = page + 1 > lastPage ? null : page + 1;
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
};

export const fileFilterInterceptor = (
  req: any,
  file: BaseFile,
  cb: Function,
) => {
  //lấy ra phần  phần mở rộng của tệp
  const ext = extname(file.originalname);

  const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  if (!allowedExtArr.includes(ext)) {
    req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()} `;
    cb(null, false);
  } else {
    // Lấy kích thước tệp
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 5) {
      req.fileValidationError =
        'File size is too large. Accept file size is less than 5MB';
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
};

export const extractFilePathFromUrl = (fileUrl: string): string => {
  // Lấy phần sau 'o/' và trước '?alt=' từ URL
  const match = fileUrl.match(/\/o\/(.*?)\?alt/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]); // Giải mã URL và trả về đường dẫn nội bộ
  }
  throw new Error('Invalid file URL.');
};

interface filterGetUsersProps {
  query: FilterUsersDto;
  repository: any;
  sortField?: string;
  sortOrder?: DefaultOrderSort;
}

export const filterGetUsers = async ({
  query,
  repository,
  sortField = 'user.createdAt',
  sortOrder = 'ASC',
}: filterGetUsersProps): Promise<any> => {
  const items_per_page = Number(query.items_per_page);
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const queryBuilder = repository.createQueryBuilder('user');
  if (Object.keys(query).length > 0) {
    queryBuilder
      .leftJoinAndSelect('user.account', 'account') // Tham chiếu đến bảng account
      .leftJoinAndSelect('account.role', 'role') // Tham chiếu đến bảng role
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('user.leaveHistories', 'leaveHistories')
      .leftJoinAndSelect('user.overtimeHistories', 'overtimeHistories')
      .leftJoinAndSelect('user.userInsurances', 'userInsurances')
      .leftJoinAndSelect('user.evaluateHistories', 'evaluateHistories')
      .leftJoinAndSelect('user.contractHistories', 'contractHistories')
      .leftJoinAndSelect('user.salaryHistories', 'salaryHistories')
      .leftJoinAndSelect(
        'user.medicalTrainingResults',
        'medicalTrainingResults',
      )
      .leftJoinAndSelect(
        'user.nursingTrainingResults',
        'nursingTrainingResults',
      );

    // .where('role.roleId = :managerRoleId', { managerRoleId: 'manager' }) // Lọc theo roleId = "manager"
    // .orWhere('role.roleId = :userRoleId', { userRoleId: 'user' })
    // .orWhere('role.roleId = :adminRoleId', { adminRoleId: 'admin' })
    // .orWhere('role.roleId IS NULL') // Điều kiện user chưa có role

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
        // queryBuilder.orWhere('role.roleId = :userRoleId', {
        //   userRoleId: 'other',
        // });
      }
    }
    queryBuilder
      .orderBy(sortField, sortOrder)
      .select([
        'user.userId',
        'user.fullName',
        'user.gender',
        'user.address',
        'user.phoneNumber',
        'user.nation',
        'user.nationality',
        'user.hometown',
        'user.birthday',
        'user.fatherFullName',
        'user.fatherBirthday',
        'user.motherFullName',
        'user.motherBirthday',
        'user.weeklySchedule',
        'user.jobDescription',
        'user.otherDescription',
        'user.updatedAt',
        'user.createdAt',
        'user.status',
        'user.salaryCoefficient',

        'account.accountId',
        'account.email',
        'account.avatar',
        'account.role',

        'role.roleId',
        'role.roleName',

        'department.departmentId',
        'department.departmentName',

        'position.positionId',
        'position.positionName',

        'leaveHistories.leaveHistoryId',
        'leaveHistories.leaveId',
        'leaveHistories.month',
        'leaveHistories.year',
        'leaveHistories.numOfDaysOff',
        'leaveHistories.dayOffList',

        'overtimeHistories.overtimeHistoryId',
        'overtimeHistories.overtimeId',
        'overtimeHistories.startDay',
        'overtimeHistories.endDay',

        'userInsurances.id',
        'userInsurances.insuranceId',

        'evaluateHistories.evaluateId',
        'evaluateHistories.workLoad',
        'evaluateHistories.capacityOfWork',
        'evaluateHistories.quantityOfScientificWorks',
        'evaluateHistories.workInitiatives',
        'evaluateHistories.responsibilityForWork',
        'evaluateHistories.workSpirit',
        'evaluateHistories.workResult',
        'evaluateHistories.averageScore',
        'evaluateHistories.createdAt',
        'evaluateHistories.updatedAt',

        'contractHistories.contractHistoryId',
        'contractHistories.contractId',
        'contractHistories.startDay',
        'contractHistories.endDay',

        'salaryHistories.salaryHistoryId',
        'salaryHistories.month',
        'salaryHistories.year',
        'salaryHistories.attendance',
        'salaryHistories.paidLeave',
        'salaryHistories.unpaidLeave',
        'salaryHistories.numOfDaysOff',
        'salaryHistories.standardWorkDays',
        'salaryHistories.bonus',
        'salaryHistories.allowance',
        'salaryHistories.salary',
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
      .leftJoinAndSelect('user.account', 'account')
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('user.leaveHistories', 'leaveHistories')
      .leftJoinAndSelect('user.overtimeHistories', 'overtimeHistories')
      .leftJoinAndSelect('user.userInsurances', 'userInsurances')
      .leftJoinAndSelect('user.evaluateHistories', 'evaluateHistories')
      .leftJoinAndSelect('user.contractHistories', 'contractHistories')
      .leftJoinAndSelect('user.salaryHistories', 'salaryHistories')
      .leftJoinAndSelect(
        'user.medicalTrainingResults',
        'medicalTrainingResults',
      )
      .leftJoinAndSelect(
        'user.nursingTrainingResults',
        'nursingTrainingResults',
      )
      .orderBy(sortField, sortOrder)
      .select([
        'user.userId',
        'user.fullName',
        'user.gender',
        'user.address',
        'user.phoneNumber',
        'user.nation',
        'user.nationality',
        'user.hometown',
        'user.birthday',
        'user.fatherFullName',
        'user.fatherBirthday',
        'user.motherFullName',
        'user.motherBirthday',
        'user.weeklySchedule',
        'user.jobDescription',
        'user.otherDescription',
        'user.updatedAt',
        'user.createdAt',
        'user.status',
        'user.salaryCoefficient',

        'account.accountId',
        'account.email',
        'account.avatar',
        'account.role',

        'role.roleId',
        'role.roleName',

        'department.departmentId',
        'department.departmentName',

        'position.positionId',
        'position.positionName',

        'leaveHistories.leaveHistoryId',
        'leaveHistories.leaveId',
        'leaveHistories.month',
        'leaveHistories.year',
        'leaveHistories.numOfDaysOff',
        'leaveHistories.dayOffList',

        'overtimeHistories.overtimeHistoryId',
        'overtimeHistories.overtimeId',
        'overtimeHistories.startDay',
        'overtimeHistories.endDay',

        'userInsurances.id',
        'userInsurances.insuranceId',

        'evaluateHistories.evaluateId',
        'evaluateHistories.workLoad',
        'evaluateHistories.capacityOfWork',
        'evaluateHistories.quantityOfScientificWorks',
        'evaluateHistories.workInitiatives',
        'evaluateHistories.responsibilityForWork',
        'evaluateHistories.workSpirit',
        'evaluateHistories.workResult',
        'evaluateHistories.averageScore',
        'evaluateHistories.createdAt',
        'evaluateHistories.updatedAt',

        'contractHistories.contractHistoryId',
        'contractHistories.contractId',
        'contractHistories.startDay',
        'contractHistories.endDay',

        'salaryHistories.salaryHistoryId',
        'salaryHistories.month',
        'salaryHistories.year',
        'salaryHistories.attendance',
        'salaryHistories.paidLeave',
        'salaryHistories.unpaidLeave',
        'salaryHistories.numOfDaysOff',
        'salaryHistories.standardWorkDays',
        'salaryHistories.bonus',
        'salaryHistories.allowance',
        'salaryHistories.salary',
      ])
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};

interface filterGetContractHistoriesProps<T extends string> {
  query: FilterContractHistoriesDto;
  repository: any;
  relations?: Relations<T>;
  select?: Select<T>;
  arrSearch?: string[];
  order?: any;
}

export const filterGetContractHistories = async ({
  query,
  repository,
  relations,
  select,
  order,
}: filterGetContractHistoriesProps<string>): Promise<any> => {
  const items_per_page = Number(query.items_per_page) || 4;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;

  if (Object.keys(query).length > 0) {
    const [res, total] = await repository.findAndCount({
      where: {
        status: Like('%' + query.contractStatus + '%'),
        contractId: Like('%' + query.search + '%'),
      },
      order: order ?? { createdAt: 'ASC' },
      take: items_per_page,
      skip: skip,
      relations,
      select,
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
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
    const [res, total] = await repository.findAndCount({
      order: order ?? { createdAt: 'ASC' },
      relations,
      select,
    });
    return {
      data: res,
      total,
    };
  }
};
