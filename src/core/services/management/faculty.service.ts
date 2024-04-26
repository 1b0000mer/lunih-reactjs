import axios from 'axios'
import { UrlConstant } from '../../constants/url.constant.ts'
import type { Faculty } from '../../models/categories/faculty.model.ts'
import type { PagedResults } from '../../models/common/response-page.model.ts'

const apiURL = UrlConstant.API.FACULTY

const FacultyService = {
  getAll() {
    return axios.get(apiURL)
  },

  getAllPaging(page: number, size: number, search?: string, sort?: string, column?: string) {
    const params = {
      page: page,
      size: size,
      search: search ?? '',
      sort: sort ?? '',
      column: column ?? ''
    }

    // return axios.get(apiURL, { params })
    return axios.get<PagedResults<Faculty>>(apiURL + '/paging', { params })
  },

  create(model: Faculty) {
    return axios.post(apiURL, model)
  },

  update(id: number, model: Faculty) {
    return axios.put(apiURL + `/${id}`, model)
  },

  changeStatus(id: number) {
    return axios.delete(apiURL + '/change-status/' + id)
  },

  delete(id: number) {
    return axios.delete(apiURL + `/${id}`)
  }
}

export default FacultyService
