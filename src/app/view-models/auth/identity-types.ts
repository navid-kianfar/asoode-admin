import { CalendarType, UserType } from '../../library/core/enums';

export interface IdentityObject {
  token: string;
  userId: string;
  username: string;
}
export interface MemberInfoViewModel {
  email: string;
  avatar: string;
  firstName: string;
  fullName: string;
  id: string;
  initials: string;
  lastName: string;
  username: string;
  bio: string;
}
export interface ProfileViewModel extends MemberInfoViewModel {
  workingGroupId?: string;
  workingProjectId?: string;
  workingPackageId?: string;
  workingTaskId?: string;
  workingGroupFrom?: Date;
  workingTaskFrom?: Date;

  phoneNumber: string;
  userType: UserType;
  timeZone: string;
  calendar: CalendarType;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
}
