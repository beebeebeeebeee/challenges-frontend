import { DownOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Dropdown, Form, Input, Menu, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { langList } from '../../i18n';
import { RegisterRequestModel } from '../../model/auth/register.request.model';
import * as authService from '../../service/auth.service';
import { StateModel } from '../../store/model/state.model';
import { StateAction } from '../../store/reducer';
import { store } from '../../store/store';

export default function Register() {

    const { t } = useTranslation()
    const state = useSelector((state: StateModel) => state)
    const navigate = useNavigate();

    useEffect(() => {
        if (state.token != null) {
            navigate("/")
        }
    }, [])

    const onFinish = async (values: any) => {
        const { account, password, password2 } = values
        const requestPayload: RegisterRequestModel = { account, password, password2 }

        const response = await authService.register(requestPayload)
        if (response == null) return

        navigate("/login")
    }



    const changeLang = (lang: string) => {
        store.dispatch({
            type: StateAction.SET_LANG,
            data: lang
        })
    }

    return <>
        <Row style={{ justifyContent: "center" }}>
            <Col span={state.isMobile ? 24 : 12} style={{ padding: "0rem 2rem", marginTop: "1rem" }}>
                <Row >
                    <Col span={12}>
                        <Button type='link' onClick={() => { navigate("/login") }}>{"\<"} {t("common.back")}</Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
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
                </Row >

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

                        <Form.Item
                            label={t("page.login.password2")}
                            name="password2"
                            rules={[
                                { required: true, message: t("page.login.error.password2") },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t("page.login.error.password2incorrect")));
                                    },
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: state.isMobile ? 0 : 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                {t("page.login.register")}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>

    </>
}