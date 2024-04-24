export class SystemConstant {

  public static CURRENT_INFO = 'CURRENT_INFO';
  public static CURRENT_INFO_GOOGLE = 'CURRENT_INFO_GOOGLE';

  public static ACTION = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW: 'view',
  };

  public static ROLE = {
    ADMIN: 'ROLE_ADMIN',
    STUDENT: 'ROLE_STUDENT',
    UNIVERSITY: 'ROLE_UNIVERSITY',
    COMPANY: 'ROLE_COMPANY'
  };

  public static LIST_ROLE_TITLE = {
    en: [
      {
        id: SystemConstant.ROLE.ADMIN,
        title: 'Admin'
      },
      {
        id: SystemConstant.ROLE.STUDENT,
        title: 'Student',
      },
    ],
    lv: [
      {
        id: SystemConstant.ROLE.ADMIN,
        title: 'admin lv'
      },
      {
        id: SystemConstant.ROLE.STUDENT,
        title: 'student lv'
      },
    ],
    langData: {
      // using for fast get, improving perfomnace
      en: {
        [SystemConstant.ROLE.ADMIN]: 'Admin',
        [SystemConstant.ROLE.STUDENT]: 'Student',
      },
      lv: {
        [SystemConstant.ROLE.ADMIN]: 'admin lv',
        [SystemConstant.ROLE.STUDENT]: 'student lv',
      }
    }
  };
}
