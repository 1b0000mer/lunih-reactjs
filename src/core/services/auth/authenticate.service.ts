import axios from 'axios'
import { UrlConstant } from '../../constants/url.constant.ts'
import SystemConstant from '../../constants/system.constant.ts'
import type { AuthModel, LoginFormModel } from '../../models/common/auth.model.ts'

const apiURL = UrlConstant.API.LOGIN

const AuthenticateService = {
  //common
  getNameOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}')?.fullName
  },
  getAvatarOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{}')?.avatar
  },

  // login username/pass
  doLoginForm(model: LoginFormModel) {
    return axios.post<AuthModel>(apiURL, model)
  },

  // set/ get localStorage model Auth
  getAuthData(): AuthModel {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) || '{ "roles": []}')
  },

  setAuthData(model: AuthModel): void {
    localStorage.setItem(SystemConstant.CURRENT_INFO, JSON.stringify(model))
  },

  // logout
  doLogout(): void {
    localStorage.removeItem(SystemConstant.CURRENT_INFO)
    localStorage.removeItem(SystemConstant.CURRENT_INFO_GOOGLE)
    // window.location.assign('../')
  },

  // check roles
  checkRoleAdmin(): boolean {
    const auth = this.getAuthData()
    let role = []
    role = auth.roles.filter((item) => item === SystemConstant.ROLE.ADMIN)
    if (role && role.length > 0) {
      return true
    } else {
      return false
    }
  },

  checkRoleStudent(): boolean {
    const auth = this.getAuthData()
    let role = []
    role = auth.roles.filter((item) => item === SystemConstant.ROLE.STUDENT)
    if (role && role.length > 0) {
      return true
    } else {
      return false
    }
  },

  checkRoleUniversity(): boolean {
    const auth = this.getAuthData()
    let role = []
    role = auth.roles.filter((item) => item === SystemConstant.ROLE.UNIVERSITY)
    if (role && role.length > 0) {
      return true
    } else {
      return false
    }
  },

  checkRoleCompany(): boolean {
    const auth = this.getAuthData()
    let role = []
    role = auth.roles.filter((item) => item === SystemConstant.ROLE.COMPANY)
    if (role && role.length > 0) {
      return true
    } else {
      return false
    }
  }
}

export default AuthenticateService
