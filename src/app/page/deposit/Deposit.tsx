import { Button, Card, Col, InputNumber, Row, Select, Statistic, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserModel } from '../../model/user/user.model';
import { DepositRequestModel } from '../../model/wallet/deposit.request.model';
import { DepositResponseModel } from '../../model/wallet/deposit.response.model';
import { PriceModel } from '../../model/wallet/price.model';
import * as userService from '../../service/user.service';
import * as walletService from '../../service/wallet.service';
import { StateModel } from '../../store/model/state.model';

interface Props {
    onComplete: () => void
}

export default function Deposit({ onComplete }: Props) {

    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    const state = useSelector((state: StateModel) => state)

    const [userInfo, setUserInfo] = useState<UserModel>()
    const [currentPrice, setCurrentPrice] = useState<PriceModel>()

    const [previewInfo, setPreviewInfo] = useState<DepositResponseModel>()
    const [isDisplayDepositButton, setIsDisplayDepositButton] = useState<boolean>(false)
    const [depositInfo, setDepositInfo] = useState<DepositRequestModel>({
        "from": "USD",
        "to": "BTC",
        "currentRate": currentPrice?.price,
        "amount": {
            "target": "from",
            "value": 0
        }
    })

    const getUserInfo = async (depositInfoToSet?: DepositRequestModel) => {
        const UserInfoRepsonse = await userService.getUserInfo()
        setUserInfo(UserInfoRepsonse)

        const priceResponse = await walletService.getPrice()
        setCurrentPrice(priceResponse)
        setDepositInfo({ ...(depositInfoToSet || depositInfo), currentRate: priceResponse?.price })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const onTargetChange = (target: "from" | "to", type: string) => {
        const oppose = target == "from" ? "to" : "from"
        const depositInfoToSet = {
            ...depositInfo,
            ...(type == depositInfo[oppose] ? { [target]: type, [oppose]: depositInfo[target] } : {})
        }
        setDepositInfo(depositInfoToSet)
        depositPreview(depositInfoToSet)
    }

    const depositPreview = async (depositInfoToSet?: DepositRequestModel) => {
        const previewResponse = await walletService.depositPreview(depositInfoToSet || depositInfo)
        setIsDisplayDepositButton(previewResponse != null && previewResponse.from != 0)
    }

    const depositAction = async () => {
        const previewResponse = await walletService.depositAction(depositInfo)
        if (previewResponse != null) {
            const depositInfoToSet = {
                "from": "USD",
                "to": "BTC",
                "currentRate": currentPrice?.price,
                "amount": {
                    "target": "from",
                    "value": 0
                }
            }
            setDepositInfo(depositInfoToSet)
            setIsDisplayDepositButton(false)
            await getUserInfo(depositInfoToSet)
            onComplete()
        }
    }

    return <>
        <Row gutter={16} style={{ padding: "0 1rem" }}>
            <Col span={6}>
                {t("page.dashboard.wallet.yourwallet")}
            </Col>
            <Col span={18} style={{ textAlign: "right" }}>
                {currentPrice ? `[${currentPrice?.exchange}] ${currentPrice?.from}->${currentPrice?.to} $${currentPrice?.price}` : t("common.loading")}
            </Col>
            {
                userInfo?.wallets?.map(e => {
                    return <Col span={state.isMobile ? 24 : 12}>
                        <Card title={e.type} bordered={true} style={{ marginBottom: "1rem" }}>
                            <Tooltip placement="topLeft" title={`${e.type}$${e.balance}`}>
                                <Statistic
                                    title={t("page.dashboard.wallet.balance")}
                                    value={e.balance}
                                    prefix="$"
                                    precision={2} />
                            </Tooltip>
                        </Card>
                    </Col>
                })
            }
            <Col span={24}>
                <Card title={t("page.deposit.title")} bordered={true} style={{ marginBottom: "1rem" }}>
                    {t("page.deposit.from")}
                    <InputNumber
                        addonBefore={
                            <Select value={depositInfo.from} onChange={(val) => { onTargetChange("from", val) }} className="select-before">
                                {
                                    userInfo?.wallets?.map(e => {
                                        return <Select.Option value={e.type}>{e.type}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        onBlur={() => { depositPreview() }}
                        value={depositInfo.amount?.value as any}
                        style={{ width: "100%", marginBottom: "1rem" }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                        min={0}
                        onChange={(val) => { setDepositInfo({ ...depositInfo, amount: { ...depositInfo.amount, value: val } }) }}
                    />
                    {t("page.deposit.to")}
                    <InputNumber
                        disabled
                        addonBefore={
                            <Select value={depositInfo.to} onChange={(val) => { onTargetChange("to", val) }} className="select-before">
                                {
                                    userInfo?.wallets?.map(e => {
                                        return <Select.Option value={e.type}>{e.type}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        value={previewInfo?.to as any}
                        style={{ width: "100%" }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                        min={0}
                        onChange={() => { }}
                    />
                    {
                        isDisplayDepositButton &&
                        <Button type="primary" onClick={() => { depositAction() }} style={{ marginTop: "1rem", width: "100%" }}>{t("page.deposit.title")}</Button>
                    }
                </Card>
            </Col>
        </Row>
    </>
}