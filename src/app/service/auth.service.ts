import { ResponseStatus } from '../constant/response.status';
import { LoginRequestModel } from '../model/auth/login.request.model';
import { LoginResponseModel } from '../model/auth/login.response.model';
import { RegisterRequestModel } from '../model/auth/register.request.model';
import { GenericResponseModel } from '../model/generic.response.model';
import axios from './util/axios.instant';
import { requestSuccessHandler } from './util/request.hander';

export const login = async (requestPayload: LoginRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/auth/login", requestPayload)).data as GenericResponseModel<LoginResponseModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        requestSuccessHandler("login")
        return data
    }
}

export const register = async (requestPayload: RegisterRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/auth/register/user", requestPayload)).data as GenericResponseModel<LoginResponseModel>
    if (status == ResponseStatus.SUCCESS) {
        requestSuccessHandler("register")
        return true
    }
}