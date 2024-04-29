import axios from 'axios'
import { UrlConstant } from '../../constants/url.constant.ts'
import type { Industry } from '../../models/categories/industry.model.ts'
import type { PagedResults } from '../../models/common/response-page.model.ts'

const apiURL = UrlConstant.API.INDUSTRY

const IndustryService = {
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

    return axios.get<PagedResults<Industry>>(apiURL + '/paging', { params })
  },

  create(model: Industry) {
    return axios.post(apiURL, model)
  },

  update(id: number, model: Industry) {
    return axios.put(apiURL + `/${id}`, model)
  },

  changeStatus(id: number) {
    return axios.delete(apiURL + '/change-status/' + id)
  },

  delete(id: number) {
    return axios.delete(apiURL + `/${id}`)
  }
}

export default IndustryService;
