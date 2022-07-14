export interface DepositRequestModel {
    from?: string
    to?: string
    currentRate?: number
    amount?: {
        target?: string
        value?: number
    }
}