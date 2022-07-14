import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export default function GenericNotFound() {

    const navigate = useNavigate();
    const { t } = useTranslation()

    const backHome = () => {
        navigate("/")
    }

    return <Result
        status="404"
        title="404"
        subTitle={t("page.notfound.text")}
        extra={<Button type="primary" onClick={backHome}>{t("page.notfound.back")}</Button>}
    />
}