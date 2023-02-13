import React from "react";
import { LinkOutlined } from "@ant-design/icons";

export function UserDevicesColumns(unlinkDeviceFromUser) {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 10
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'code',
            render: (value) => {
                return value.category.title;
            },
            width: 25
        },
        {
            title: 'Имя продукта',
            dataIndex: 'name',
            key: 'name',
            width: 45
        },
        {
            title: 'PID',
            dataIndex: 't_product_id',
            key: 't_product_id',
            width: 10
        },
        {
            title: 'Открепить',
            dataIndex: 'unlink',
            key: 'unlink',
            render: (params) => {
                return <LinkOutlined
                    onClick={() => {
                        unlinkDeviceFromUser(params?.t_device_id)
                    }}
                />;
            },
            width: 10
        }
    ];
}
