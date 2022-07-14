import { ResponseStatus } from "../constant/response.status"

export interface GenericResponseModel<T = any> {
    status: ResponseStatus
    code?: string
    msg?: string
    data?: T
}