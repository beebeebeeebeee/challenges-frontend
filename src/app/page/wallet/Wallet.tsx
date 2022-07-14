import { Card, Col, Row, Statistic, Tooltip, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserModel } from '../../model/user/user.model';
import { PriceModel } from '../../model/wallet/price.model';
import * as userService from '../../service/user.service';
import * as walletService from '../../service/wallet.service';
import { StateModel } from '../../store/model/state.model';
import Deposit from '../deposit/Deposit';

export default function Wallet() {

    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    const state = useSelector((state: StateModel) => state)

    const [userInfo, setUserInfo] = useState<UserModel>()
    const [currentPrice, setCurrentPrice] = useState<PriceModel>()

    const getUserInfo = async () => {
        const UserInfoRepsonse = await userService.getUserInfo()
        setUserInfo(UserInfoRepsonse)

        const priceResponse = await walletService.getPrice()
        setCurrentPrice(priceResponse)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const [showDepositModal, setShowDepositModal] = useState<boolean>(false)

    return <>
        <Modal title={t("page.deposit.title")} visible={showDepositModal} onCancel={() => { setShowDepositModal(false) }} footer={null}>
            <Deposit onComplete={() => { setShowDepositModal(false); getUserInfo() }} />
        </Modal>
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
                                    prefix={`${e.type}$`}
                                    precision={2} />
                            </Tooltip>

                        </Card>
                    </Col>
                })
            }
            <Col span={24}>
                <Button style={{ width: "100%" }} type="primary" onClick={() => { setShowDepositModal(true) }}>
                    {t("page.deposit.title")}
                </Button>
            </Col>
        </Row>
    </>
}