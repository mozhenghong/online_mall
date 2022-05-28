import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import './index.scss';
import { getOrderList, OrderListParams } from '@/api/order';

const OrderManagement: FC = () => {
    // TODO: 默认值删除 search
    const [ searchInfo, setSearchInfo ] = useState<OrderListParams>({ search: '' });

    const fetchOrderList = async () => {
        const res = await getOrderList(searchInfo);
        console.log(res);
    };

    useEffect(() => {
        void fetchOrderList();
    }, []);
    return (
        <div className="order_management">

        </div>
    );
};

export default observer(OrderManagement);
