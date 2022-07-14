import { ResponseStatus } from '../constant/response.status';
import { GenericResponseModel } from '../model/generic.response.model';
import { DepositRequestModel } from '../model/wallet/deposit.request.model';
import { DepositResponseModel } from '../model/wallet/deposit.response.model';
import { PriceModel } from '../model/wallet/price.model';
import { TransactionModel } from '../model/wallet/transcation.model';
import { getAuthHeader } from './util/auth.header.service';
import axios from './util/axios.instant';
import { requestSuccessHandler } from './util/request.hander';

export const getPrice = async () => {
    const { status, data } = (await axios.get("http://localhost:4001/v1/api/wallet/price", getAuthHeader())).data as GenericResponseModel<PriceModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        return data
    }
}

export const depositPreview = async (depositInfo: DepositRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/wallet/deposit/preview", depositInfo, getAuthHeader())).data as GenericResponseModel<DepositResponseModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        return data
    }
}

export const depositAction = async (depositInfo: DepositRequestModel) => {
    const { status, data } = (await axios.post("http://localhost:4001/v1/api/wallet/deposit/action", depositInfo, getAuthHeader())).data as GenericResponseModel<DepositResponseModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        requestSuccessHandler("deposit")
        return data
    }
}

export const getTransaction = async () => {
    const { status, data } = (await axios.get("http://localhost:4001/v1/api/wallet/transaction", getAuthHeader())).data as GenericResponseModel<TransactionModel[]>
    if (status == ResponseStatus.SUCCESS && data != null) {
        return data
    }
}