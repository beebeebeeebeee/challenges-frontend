import { ResponseStatus } from '../constant/response.status';
import { GenericResponseModel } from '../model/generic.response.model';
import { UserModel } from '../model/user/user.model';
import { getAuthHeader } from './util/auth.header.service';
import axios from './util/axios.instant';

export const getUserInfo = async () => {
    const { status, data } = (await axios.get("http://localhost:4001/v1/api/user/info", getAuthHeader())).data as GenericResponseModel<UserModel>
    if (status == ResponseStatus.SUCCESS && data != null) {
        return data
    }
}