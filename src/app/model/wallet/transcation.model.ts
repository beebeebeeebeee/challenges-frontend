export interface TransactionModel {
    id: number
    user_id: number
    from: string
    to: string
    fromAmount: number
    toAmount: number
    status: string
    timestamp: Date
}