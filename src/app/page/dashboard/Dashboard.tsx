import { AppstoreOutlined, DownOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, PageHeader, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { langList } from '../../i18n';
import { UserModel } from '../../model/user/user.model';
import * as userService from '../../service/user.service';
import { StateModel } from '../../store/model/state.model';
import { StateAction } from '../../store/reducer';
import { store } from '../../store/store';

import type { MenuProps } from 'antd';
import { requestSuccessHandler } from '../../service/util/request.hander';

export default function Dashboard() {

    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    const state = useSelector((state: StateModel) => state)

    const [userInfo, setUserInfo] = useState<UserModel>()

    useEffect(() => {
        (async () => {
            const UserInfoRepsonse = await userService.getUserInfo()
            setUserInfo(UserInfoRepsonse)
        })()
    }, [])

    const changeLang = (lang: string) => {
        store.dispatch({
            type: StateAction.SET_LANG,
            data: lang
        })
    }

    const logout = () => {
        store.dispatch({
            type: StateAction.SET_TOKEN,
            data: null
        })
        requestSuccessHandler("logout")
        navigate("/login")
    }

    return <>
        <PageHeader
            className="site-page-header"
            title={t("page.dashboard.welcome", { name: userInfo?.account })}
            extra={[
                <Dropdown overlay={<Menu
                    items={[...langList.map((e, i) => {
                        return {
                            label: (
                                <a onClick={() => { changeLang(e) }}>
                                    {t("lang", { lng: e })}
                                </a>
                            ),
                            key: `${i}`
                        }
                    }) || []]}
                />}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {t("lang", { lng: state.lang })}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                ,
                <Button onClick={logout}>{t("page.dashboard.logout")}</Button>
            ]}
        />
        <Row style={{ marginBottom: "1rem" }}>
            <Col span={24}>
                <Button style={{ width: "8rem" }} onClick={() => { navigate("/") }} type={window.location.pathname == "/" ? "primary" : "default"}>
                    <MailOutlined />
                    {t("tab.wallet")}
                </Button>
                <Button style={{ width: "8rem" }} onClick={() => { navigate("/transaction") }} type={window.location.pathname == "/transaction" ? "primary" : "default"}>
                    <AppstoreOutlined />
                    {t("tab.transaction")}
                </Button>
            </Col>
        </Row>
        <Outlet />
    </>
}