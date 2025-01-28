export const ANNOUNCEMENT_POST_IMAGE_FOLDER = 'announcement_posts';
export const RECRUITMENT_POST_IMAGE_FOLDER = 'recruitment_posts';
export const AVATAR_FOLDER = 'avatars';

export enum RoleId {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export const adminPermissions = [RoleId.MANAGER, RoleId.USER];
export const managerPermissions = [RoleId.USER];
