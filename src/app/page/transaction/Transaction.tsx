import { Table, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TransactionModel } from '../../model/wallet/transcation.model';
import * as walletService from '../../service/wallet.service';

export default function Transaction() {

    const { t } = useTranslation()

    const [transcationInfo, setTranscationInfo] = useState<TransactionModel[]>()

    const getTransaction = async () => {
        const transcationResponse = await walletService.getTransaction()
        if (transcationResponse != null) setTranscationInfo(transcationResponse)
    }

    useEffect(() => {
        getTransaction()
    }, [])

    const columns = [
        {
            title: t('page.transaction.table.id'),
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('page.transaction.table.from'),
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: t('page.transaction.table.to'),
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: t('page.transaction.table.fromAmount'),
            dataIndex: 'fromAmount',
            key: 'fromAmount',
        },
        {
            title: t('page.transaction.table.toAmount'),
            dataIndex: 'toAmount',
            key: 'toAmount',
        },
        {
            title: t('page.transaction.table.rate'),
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: t('page.transaction.table.status'),
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: t('page.transaction.table.timestamp'),
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
    ];

    return <>
        <Row>
            <Col span={24}>
                <Table dataSource={transcationInfo} columns={columns} style={{ margin: "0 1rem" }} scroll={{x:true}}/>;
            </Col>
        </Row>
    </>
}