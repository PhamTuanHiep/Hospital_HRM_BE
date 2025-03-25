import { RoleId } from 'src/common/common.constants';
import { DefaultOrderSort } from 'src/common/common.type';
import { FilterUsersDto } from 'src/dto/common.filter.dto';

const userSelect = [
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

  'deptAllowRel.id',

  'deptAllowance.allowanceId',
  'deptAllowance.allowanceType',
  'deptAllowance.allowanceNameVI',
  'deptAllowance.allowanceNameEN',
  'deptAllowance.allowanceRate',
  'deptAllowance.allowanceFee',
  'deptAllowance.note',

  'position.positionId',
  'position.positionName',

  'posAllowRel.id',

  'posAllowance.allowanceId',
  'posAllowance.allowanceType',
  'posAllowance.allowanceNameVI',
  'posAllowance.allowanceNameEN',
  'posAllowance.allowanceRate',
  'posAllowance.allowanceFee',
  'posAllowance.note',

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

  // 'userInsurances.id',
  // 'userInsurances.insuranceId',

  'evaluateHistories.evaluateId',
  'evaluateHistories.workLoad',
  'evaluateHistories.capacityOfWork',
  'evaluateHistories.quantityOfScientificWorks',
  'evaluateHistories.workInitiatives',
  'evaluateHistories.workingStyle',
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
  'salaryHistories.overtimeCost',
  'salaryHistories.allowance',
  'salaryHistories.salary',

  'medicalTrainingResults.trainingResultsId',
  'medicalTrainingResults.understandingOfMedicalTheory',
  'medicalTrainingResults.knowledgeOfTreatmentProtocols',
  'medicalTrainingResults.abilityToLearnNewKnowledge',
  'medicalTrainingResults.diagnosticSkills',
  'medicalTrainingResults.treatmentSkills',
  'medicalTrainingResults.decisionMakingSkills',
  'medicalTrainingResults.communicationSkillsWithPatientsAndTheirFamilies',
  'medicalTrainingResults.communicationSkillsWithColleagues',
  'medicalTrainingResults.patientMonitoringAndCare',
  'medicalTrainingResults.participationInMedicalResearch',
  'medicalTrainingResults.averageScore',

  // 'nursingTrainingResults.understandingOfNursingTheory',
  // 'nursingTrainingResults.clinicalSkills',
  // 'nursingTrainingResults.basicCareSkills',
  // 'nursingTrainingResults.communicationSkillsWithPatientsAndTheirFamilies',
  // 'nursingTrainingResults.patientRecordManagementSkills',
  // 'nursingTrainingResults.patientMonitoringAndAssessmentSkills',
  // 'nursingTrainingResults.abilityToAdaptToTheWorkEnvironment',
  // 'nursingTrainingResults.averageScore',
];

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

      .leftJoinAndSelect('department.allowanceRelationship', 'deptAllowRel')
      .leftJoinAndSelect('deptAllowRel.allowance', 'deptAllowance')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.allowanceRelationship', 'posAllowRel')
      .leftJoinAndSelect('posAllowRel.allowance', 'posAllowance')

      .leftJoinAndSelect('user.leaveHistories', 'leaveHistories')
      .leftJoinAndSelect('user.overtimeHistories', 'overtimeHistories')
      // .leftJoinAndSelect('user.userInsurances', 'userInsurances')
      .leftJoinAndSelect('user.evaluateHistories', 'evaluateHistories')
      .leftJoinAndSelect('user.contractHistories', 'contractHistories')
      .leftJoinAndSelect('user.salaryHistories', 'salaryHistories')
      .leftJoinAndSelect(
        'user.medicalTrainingResults',
        'medicalTrainingResults',
      );
    // .leftJoinAndSelect(
    //   'user.nursingTrainingResults',
    //   'nursingTrainingResults',
    // );

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
    if (query.userStatus) {
      queryBuilder.where('user.status = :userStatus', {
        userStatus: query.userStatus,
      });
    }
    queryBuilder.orderBy(sortField, sortOrder).select(userSelect); // Chỉ lấy các cột cần thiết
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

      .leftJoinAndSelect('department.allowanceRelationship', 'deptAllowRel')
      .leftJoinAndSelect('deptAllowRel.allowance', 'deptAllowance')
      .leftJoinAndSelect('user.position', 'position')
      .leftJoinAndSelect('position.allowanceRelationship', 'posAllowRel')
      .leftJoinAndSelect('posAllowRel.allowance', 'posAllowance')

      .leftJoinAndSelect('user.leaveHistories', 'leaveHistories')
      .leftJoinAndSelect('user.overtimeHistories', 'overtimeHistories')
      // .leftJoinAndSelect('user.userInsurances', 'userInsurances')
      .leftJoinAndSelect('user.evaluateHistories', 'evaluateHistories')
      .leftJoinAndSelect('user.contractHistories', 'contractHistories')
      .leftJoinAndSelect('user.salaryHistories', 'salaryHistories')
      .leftJoinAndSelect(
        'user.medicalTrainingResults',
        'medicalTrainingResults',
      )
      // .leftJoinAndSelect(
      //   'user.nursingTrainingResults',
      //   'nursingTrainingResults',
      // )
      .orderBy(sortField, sortOrder)
      .select(userSelect)
      .getManyAndCount();

    return {
      data: res,
      total,
    };
  }
};
