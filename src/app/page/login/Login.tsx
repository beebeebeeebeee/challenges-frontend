import { DownOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Dropdown, Form, Input, Menu, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { langList } from '../../i18n';
import { LoginRequestModel } from '../../model/auth/login.request.model';
import * as authService from '../../service/auth.service';
import { StateModel } from '../../store/model/state.model';
import { StateAction } from '../../store/reducer';
import { store } from '../../store/store';

export default function Login() {

    const { t } = useTranslation()
    const state = useSelector((state: StateModel) => state)
    const navigate = useNavigate();

    useEffect(() => {
        if (state.token != null) {
            navigate("/")
        }
    }, [])

    const onFinish = async (values: any) => {
        const { account, password, remember } = values
        const requestPayload: LoginRequestModel = { account, password }

        const response = await authService.login(requestPayload)
        if (response == null) return

        if (response.token) {
            store.dispatch({
                type: StateAction.SET_TOKEN,
                data: response.token
            })

            store.dispatch({
                type: StateAction.SET_REMEMBER,
                data: remember ? account : null
            })

            navigate("/")
        }

    };

    const changeLang = (lang: string) => {
        store.dispatch({
            type: StateAction.SET_LANG,
            data: lang
        })
    }

    return <>
        <Row style={{ justifyContent: "center" }}>
            <Col span={state.isMobile ? 24 : 12} style={{ padding: "0rem 2rem", marginTop: "1rem", textAlign: 'right' }}>
                <Dropdown
                    overlay={<Menu
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
            </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
            <Col span={state.isMobile ? 24 : 12} >
                <Card style={{ margin: "1rem 2rem" }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ ...(state.remember ? { account: state.remember } : {}), ...(state.remember ? { remember: true } : {}) }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={t("page.login.username")}
                            name="account"
                            rules={[{ required: true, message: t("page.login.error.account") }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t("page.login.password")}
                            name="password"
                            rules={[{ required: true, message: t("page.login.error.password") }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: state.isMobile ? 0 : 8, span: 16 }}>
                            <Checkbox>{t("page.login.remember")}</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: state.isMobile ? 0 : 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                {t("page.login.login")}
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: state.isMobile ? 0 : 8, span: 16 }}>
                            <Button type="link" style={{ padding: 0 }} onClick={() => { navigate("/register") }}>{t("page.login.create")}</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>

    </>
}