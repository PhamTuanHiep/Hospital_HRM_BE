export const ANNOUNCEMENT_POST_IMAGE_FOLDER = 'announcement_posts';
export const RECRUITMENT_POST_IMAGE_FOLDER = 'recruitment_posts';
export const AVATAR_FOLDER = 'avatars';

export enum RoleId {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}
export const roleName = {
  [RoleId.ADMIN]: 'Admin',
  [RoleId.MANAGER]: 'Manager',
  [RoleId.USER]: 'User',
};

export type DefaultOrderSort = 'ASC' | 'DESC';

export enum OrderSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

// export const adminPermissions = [RoleId.MANAGER, RoleId.USER];
// export const managerPermissions = [RoleId.USER];

export enum ContractStatus {
  ACTIVE = 1, //có hiệu lực.
  RENEWAL_PENDING, //sắp hết hạn và đang chờ phê duyệt gia hạn
  EXPIRED, //đã hết hạn
  SUSPENDED, //tạm thời đình do sự cố
  TERMINATED, //Chấm dứt-bị kết thúc trước thời hạn
  CANCELLED, //bị hủy trước khi có hiệu lực
  TRANSFERRED, //nhân viên chuyển sang cơ sở khác
}

export const contractStatus = {
  [ContractStatus.ACTIVE]: 'Active',
  [ContractStatus.RENEWAL_PENDING]: 'Renewal-Pending',
  [ContractStatus.EXPIRED]: 'Expired',
  [ContractStatus.SUSPENDED]: 'Suspended',
  [ContractStatus.TERMINATED]: 'Terminated',
  [ContractStatus.CANCELLED]: 'Cancelled',
  [ContractStatus.TRANSFERRED]: 'Transferred',
};
