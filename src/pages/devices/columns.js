import React from "react";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";

export function devicesColumns (setDeviceData) {
    return(
        [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 10,
                sorted: true,
                color: '#9BA3B1'
            },
            {
                title: 'Категория',
                dataIndex: 'category',
                key: 'category',
                render: (value) => {
                    return value.category.title;
                },
                width: 25
            },
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                width: 30,
                color: '#9BA3B1',
                render: (value) => {
                    if (value.name) {
                        return value.name;
                    } else return '-';
                }
            },
            {
                title: 'PID',
                dataIndex: 't_product_id',
                key: 't_product_id',
                width: 20
            },
            {
                title: 'Дата сохранения',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: (value) => {
                    if (value.updated_at) {
                        return moment(value.updated_at * 1000).format('LLL')
                    } else return '-';
                },
                width: 15,
                sorted: true,
                color: '#9BA3B1'
            },
            // {
            //     title: '',
            //     dataIndex: 'actions',
            //     key: 'actions',
            //     render: (value, data) => {
            //         return(
            //             <EditOutlined
            //                 onClick={() => {
            //                     setDeviceData(data);
            //                 }}
            //             />
            //         )
            //     }
            // },
        ]
    )
}

export function categoriesColumns (setCategoryData) {
    return(
        [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 10,
                sorted: true,
                color: '#9BA3B1'

            },
            {
                title: 'Код',
                dataIndex: 'code',
                key: 'code',
                width: 25
            },
            {
                title: 'Название категории',
                dataIndex: 'title',
                key: 'title',
                width: 25
            },
            {
                title: 'Дата создания',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (value) => {
                    if (value) {
                        return moment(value.created_at * 1000).format('LLL')
                    } else return '-';
                },
                width: 20,
                sorted: true,
            },
            {
                title: 'Дата обновления',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: (value) => {
                    if (value) {
                        return moment(value.updated_at * 1000).format('LLL')
                    } else return '-';
                },
                width: 20,
                sorted: true,
            },
            /*{
                title: '',
                dataIndex: 'actions',
                key: 'actions',
                render: (value, data) => {
                    return(
                        <EditOutlined
                            onClick={() => {
                                setCategoryData(data);
                            }}
                        />
                    )
                }
            },*/
        ]
    )
}

