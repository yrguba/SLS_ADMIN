import React, { useEffect, useState, useRef } from "react";
import { Select, DatePicker, Table, Button, Modal } from "antd";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import moment from "moment";
import { columns } from './columns';
import { products } from "../../constants";
import './charts.less';
import './statistic.less';
import { FileTwoTone } from '@ant-design/icons';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,LinearScale, BarElement, PointElement, LineElement);


const { Option } = Select;
const { RangePicker } = DatePicker;

const randomRgba = () => {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.2' + ')';
}

const barsTemplate = {
    labels: [],
    datasets: [
        {
            label: 'Устройств',
            data: [],
            backgroundColor: [],
            borderWidth: 1,
            barThickness: 30,
        },
    ],
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

function DatesView(props) {
    const [data, setData] = useState(JSON.parse(JSON.stringify(barsTemplate)));
    const [dataSource, setDataSource] = useState(null);
    const [dateRange, setDateRange] = useState([moment().startOf('day'), moment()]);
    const [interval, setInterval] = useState('week');
    const [devicesByDate, setDevicesByDate] = useState(null);
    const [detailDevicesModalVisible, setDetailDevicesModalVisible] = useState(false);
    const chartRef = useRef();
    const dateFormat = "DD.MM.YYYY";

    useEffect(() => {
        if (props.devicesStats) {
            setDevicesByDate(props.devicesStats);
        }
    }, [props.devicesStats]);

    const columnsProducts = [
        {
            title: '',
            dataIndex: 'icon',
            render: (icon) => {
                return(
                    <img
                        style={{
                            width: '40px'
                        }}
                        src={`https://api.fasthome.io/${icon}`} alt=""
                    />
                );
            }
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            render: (created_at) => {
                return(
                    moment(created_at * 1000).format("DD.MM.YYYY")
                );
            }
        },
        {
            title: 'ID Продукта',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 't_product_name',
            key: 't_product_name',
        },
        {
            title: 'ID Категории',
            dataIndex: 't_product_id',
            key: 'category_id',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Спецификация',
            dataIndex: 'spec',
            key: 'spec',
            render: (value, params) => {
                return(
                    <div
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <FileTwoTone
                            style={{
                                fontSize: '25px'
                            }}
                            onClick={() => {
                                props.getSpecs(params.home_id, params.id);
                            }}
                            type="primary"
                        />
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        const dates = _getDateInterval(interval, dateRange);
        props.getStatistic(moment(dates.dateTo).unix(), moment(dates.dateFrom).unix());
    }, [interval, dateRange]);

    const getProductName = (id) => {
        return products.find(product => product.ProductID === id)?.name || id;
    };

    const sortByCount = (a, b) => {
        return b.count - a.count;
    }

    useEffect(() => {
        let dataArray = [];
        const datasetArray = JSON.parse(JSON.stringify(barsTemplate));

        if (props.statistic) {
            props.statistic.data.devices_by_product.map((device, index) => {
                dataArray.push({
                    key: index,
                    id: device.product.id,
                    t_product_id: getProductName(device.product.t_product_id),
                    name: device.product.name,
                    category_id: device.category.id,
                    category: device.category.title,
                    count: device.count,
                    color: randomRgba(),
                    icon: device.category.icon
                });
            });

            dataArray = dataArray.sort(sortByCount);

            setDataSource(dataArray);

            dataArray.map(item => {
                //const devicesTitle = products.find(product => product.ProductID === item.t_product_id);
                datasetArray.labels.push(item.t_product_id);
                datasetArray.datasets[0].data.push(item.count);
                datasetArray.datasets[0].backgroundColor.push(item.color);
            });
            setData(JSON.parse(JSON.stringify(datasetArray)));
        }
    }, [props.statistic]);

    const onBarClick = (event) => {
        const target = getElementAtEvent(chartRef.current, event);
        if (target && target[0]?.index !== null && target[0]?.index !== undefined) {
            const targetCategory = dataSource[target[0].index];
            setDetailDevicesModalVisible(true);
            const dates = _getDateInterval(interval);
            props.getDevicesStat(targetCategory.category_id, targetCategory.id, moment(dates.dateFrom).unix(), moment(dates.dateTo).unix());
        }
    };

    const onTableRowClick = (record) => {
        const dates = _getDateInterval(interval);
        props.getDevicesStat(record.category_id, record.id, moment(dates.dateFrom).unix(), moment(dates.dateTo).unix());
        setDetailDevicesModalVisible(true);
    };

    const _getDateInterval = (currentInterval) => {
        const intervalDefault = {
            dateFrom: moment().startOf('day').format(),
            dateTo: moment().format(),
        };

        switch (currentInterval) {
            case 'yesterday':
                intervalDefault.dateFrom = moment().subtract(1, 'days').startOf('day').format();
                intervalDefault.dateTo = moment().subtract(1, 'days').endOf('day').format();
                break;
            case 'week':
                intervalDefault.dateFrom = moment().subtract(6, 'days').startOf('day').format();
                break;
            case 'month':
                intervalDefault.dateFrom = moment().subtract(29, 'days').startOf('day').format();
                break;
            case 'period':
                if (dateRange) {
                    intervalDefault.dateFrom = dateRange[0].format();
                    intervalDefault.dateTo = dateRange[1].format();
                }

                break;
        }

        return intervalDefault;
    };

    return(
        <>
            <Select
                style={{
                    width: '200px',
                    marginBottom: '20px'
                }}
                value={interval}
                onSelect={(value) => {
                    setInterval(value);
                }}
            >
                <Option value="today">За сегодня</Option>
                <Option value="yesterday">За вчера</Option>
                <Option value="week">За неделю</Option>
                <Option value="month">За месяц</Option>
                <Option value="period">За период</Option>
            </Select>
            {interval === 'period' && dateRange.length &&
                <RangePicker
                    value={dateRange}
                    format={dateFormat}
                    onChange={(event) => {
                        setDateRange(event);
                    }}
                    style={{
                        marginLeft: '15px'
                    }}
                />
            }
            {
                props.statistic?.data?.devices_by_product?.length > 0 &&
                <span
                    style={{
                        marginLeft: '20px'
                    }}
                >
                    {`За данный период добавлено устройств - ${props.statistic.data?.devices_by_product?.length}`}
                </span>
            }
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}
            >
                <Bar
                    ref={chartRef}
                    data={data}
                    onClick={onBarClick}
                />
            </div>
            <Table
                className="devices-table"
                style={{
                    marginTop: '30px',
                }}
                dataSource={dataSource}
                columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => {
                            onTableRowClick(record);
                        }
                    };
                }}
                pagination={false}
            />

            <Modal
                width={900}
                title={`Устройства`}
                visible={detailDevicesModalVisible}
                onCancel={() => {
                    setDevicesByDate(null);
                    setDetailDevicesModalVisible(false);
                }}
                footer={[
                    <Button key="back" onClick={() => {
                        setDevicesByDate(null);
                        setDetailDevicesModalVisible(false);
                    }}>
                        Закрыть
                    </Button>,
                ]}
            >
                <Table
                    style={{
                        marginTop: '30px',
                    }}
                    dataSource={devicesByDate}
                    columns={columnsProducts}
                    pagination={false}
                />
            </Modal>
        </>

    )
}

export default DatesView;
