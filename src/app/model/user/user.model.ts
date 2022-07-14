import { WalletModel } from "../wallet/wallet.model"

export interface UserModel {
    id: number
    account: string
    wallets: WalletModel[]
}