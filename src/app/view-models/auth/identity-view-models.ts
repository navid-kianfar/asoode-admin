export interface LoginResultViewModel {
  emailNotConfirmed: boolean;
  invalidPassword: boolean;
  lockedOut: boolean;
  lockedUntil?: Date;
  notFound: boolean;
  phoneNotConfirmed: boolean;
  smsFailed: boolean;
  token: string;
  userId: string;
  username: string;
  id: string;
}
export interface MemberInfoViewModel {
  email: string;
  avatar: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  username: string;
}
export interface ProfileViewModel extends MemberInfoViewModel {

}
