import i18next from 'i18next';
import { notification } from "antd"

export const requestErrorHandler = (errorMessage: string) => {
    notification.error({
        message: i18next.t(`error.${errorMessage}`) as any,
        placement: "top",
        duration: 3
    })
}

export const requestSuccessHandler = (succesAction: string) => {
    notification.success({
        message: i18next.t(`success.text`, { action: i18next.t(`success.${succesAction}`) }) as any,
        placement: "top",
        duration: 3
    })
}