import { store } from "../../store/store"

export const getAuthHeader = () => {
    const { token } = store.getState()
    if (token == null) throw Error("no token")
    return { headers: { authorization: `Bearer ${token}` } }
}