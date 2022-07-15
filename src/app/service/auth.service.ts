import { ResponseStatus } from '../constant/response.status';
import { LoginRequestModel } from '../model/auth/login.request.model';
import { LoginResponseModel } from '../model/auth/login.response.model';
import { LoginTotpRequestModel } from '../model/auth/login.totp.request.model';
import { RegisterRequestModel } from '../model/auth/register.request.model';
import { RegisterTotpResponseModel } from '../model/auth/register.totp.response.model';
import { GenericResponseModel } from '../model/generic.response.model';
import { getAuthHeader } from './util/auth.header.service';
import axios from './util/axios.instant';
import { requestSuccessHandler } from './util/request.hander';

export const login = async (requestPayload: LoginRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/auth/login", requestPayload)).data as GenericResponseModel<LoginResponseModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        if (data.token) requestSuccessHandler("login")
        return data
    }
}

export const loginTotp = async (requestPayload: LoginTotpRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/auth/login/totp", requestPayload)).data as GenericResponseModel<LoginResponseModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        if (data.token) requestSuccessHandler("login")
        return data
    }
}

export const register = async (requestPayload: RegisterRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/auth/register/user", requestPayload)).data as GenericResponseModel
    if (status == ResponseStatus.SUCCESS) {
        requestSuccessHandler("register")
        return true
    }
}

export const registerTotp = async () => {
    const { status, data } = (await axios.get("http://localhost:4001/v1/api/auth/register/totp", getAuthHeader())).data as GenericResponseModel<RegisterTotpResponseModel>
    if (status == ResponseStatus.SUCCESS) {
        requestSuccessHandler("registerTotp")
        return data
    }
}