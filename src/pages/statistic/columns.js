import React from "react";

export const columns = [
    {
        title: 'Категория',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Количество',
        dataIndex: 'count',
        key: 'count',
    },
];


