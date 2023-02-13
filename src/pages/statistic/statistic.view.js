import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import Charts from './charts.view';
import { Typography, Table, Button, Modal, Select, DatePicker, Tabs, message, Alert, Spin } from "antd";
import { columns } from "./columns";
import './statistic.less';
import { products } from "../../constants";
import moment from "moment";
import { FileTwoTone } from "@ant-design/icons";
import SvgIcon from "../../components/icon";
import StatisticSendForm from "./component/StatisticSendForm";
import StatisticReports from "./component/StatisticReports";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

function StatisticView (props) {
    const [selectedPage, setSelectedPage] = useState('all');
    const [dataSource, setDataSource] = useState(null);
    const [dataSourceUnknown, setDataSourceUnknown] = useState(null);
    const [dataSourceTable, setDataSourceTable] = useState(null);
    const [unknownCurrentDataView, setUnknownCurrentDataView] = useState('');
    const [unknownDevicesModalVisible, setUnknownDevicesModalVisible] = useState(false);
    const [dateRange, setDateRange] = useState([moment().startOf('day'), moment()]);
    const [interval, setInterval] = useState('all');
    const [devicesByDate, setDevicesByDate] = useState(null);
    const [devicesByDateLoading, setDevicesByDateLoading] = useState(true);
    const [detailDevicesModalVisible, setDetailDevicesModalVisible] = useState(false);
    const [statisticReportActiveTab, setStatisticReportActiveTab] = useState('saved');
    const [statisticSendModalVisible, setStatisticSendModalVisible] = useState(false);
    const dateFormat = "DD.MM.YYYY";

    useEffect(() => {
        if (selectedPage === 'all') {
            props.getStatistic();
        }
    }, [selectedPage]);

    useEffect(() => {
        if (selectedPage === 'period') {
            const dates = _getDateInterval(interval, dateRange);
            props.getStatistic(moment(dates.dateTo).unix(), moment(dates.dateFrom).unix());
        }
    }, [interval, dateRange, selectedPage]);

    useEffect(() => {
        if (props.devices_stat?.data) {
            setDevicesByDate(props.devices_stat.data);
            setDevicesByDateLoading(false);
        }
    }, [props.devices_stat]);

    useEffect(() => {
        if (props.report_send_success) {
            message.success('Отчет успешно создан');
            props.getReports();
            setStatisticReportActiveTab("saved");
            props.clearReportSendState();
        }
    }, [props.report_send_success]);

    useEffect(() => {
        if (statisticSendModalVisible) {
            props.getReports();
        }
    }, [statisticSendModalVisible]);

    useEffect(() => {
        if (props.report_deleted) {
            props.getReports();
            props.clearReportDeletedState();
            message.success('Отчет успешно удален');
        }
    }, [props.report_deleted]);

    useEffect(() => {
        if (props.report_updated) {
            props.getReports();
            props.clearReportUpdatedState();
            message.success('Отчет успешно отредактирован');
        }
    }, [props.report_updated]);

    useEffect(() => {
        if (props.report_error) {
            message.error('При отправке статистики произошла ошибка, попробуйте повторить запрос');
        }
    }, [props.report_error]);


    const sortByCount = (a, b) => {
        return b.count - a.count;
    };

    useEffect(() => {
        if (props.statistic && props.statistic.device_categories) {
            let dataSourceTemp = [];
            let dataSourceUnknownTemp = [];
            let dataSourceTable = [];
            let count = 0;

            const statisticData = props.statistic.device_categories;

            statisticData.map((category, index) => {
                category.products.map((device, index) => {
                    dataSourceTemp.push({
                        key: index,
                        id: device.id,
                        t_product_id: device.name || device.t_product_name || device.t_product_id,
                        name: device.name,
                        category_id: device.category_id,
                        category: category.title,
                        count: device.devices_count,
                        background: randomRgba()
                    });
                });
            });

            statisticData.map((category, index) => {
                dataSourceTable.push({
                    key: index,
                    name: "-",
                    category: category.title,
                    count: category.devices_count
                });

                dataSourceTable[index].children = [];
                const row = []
                category.products.map(statisticDataItem => {
                    row.push(
                        {
                            key: statisticDataItem.t_product_id,
                            id: statisticDataItem.id,
                            t_product_id: statisticDataItem.t_product_id,
                            name: statisticDataItem.name || statisticDataItem.t_product_name || statisticDataItem.t_product_id,
                            category_id: statisticDataItem.category_id,
                            category: '-',
                            count: statisticDataItem.devices_count
                        }
                    );
                    dataSourceTable[index].children = row;
                });

            });


            setDataSource(dataSourceTemp.sort(sortByCount));
            setDataSourceUnknown(dataSourceUnknownTemp.sort(sortByCount));
            setDataSourceTable(dataSourceTable.sort(sortByCount));
        }
    }, [props.statistic]);

    const randomRgba = () => {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.2' + ')';
    };

    const _getDateInterval = (currentInterval) => {
        const intervalDefault = {
            dateFrom: moment().startOf('day').format(),
            dateTo: moment().format(),
        };

        switch (currentInterval) {
            case 'all':
                intervalDefault.dateFrom = moment().subtract(10, 'years').startOf('day').format();
                intervalDefault.dateTo = moment().subtract(0, 'days').endOf('day').format();
                break;
            case 'yesterday':
                intervalDefault.dateFrom = moment().subtract(1, 'days').startOf('day').format();
                intervalDefault.dateTo = moment().subtract(1, 'days').endOf('day').format();
                break;
            case 'week':
                intervalDefault.dateFrom = moment().subtract(6, 'days').startOf('day').format();
                break;
            case 'month':
                intervalDefault.dateFrom = moment().subtract(1, 'month').startOf('day').format();
                break;
            case 'period':
                if (dateRange) {
                    intervalDefault.dateFrom = dateRange[0].startOf('day').format();
                    intervalDefault.dateTo = dateRange[1].endOf('day').format();
                }

                break;
        }

        return intervalDefault;
    };

    const onBarClick = (item) => {
        setDevicesByDateLoading(true);
        setDetailDevicesModalVisible(true);
        const dates = _getDateInterval(interval);
        props.getDevicesStat(item.category_id, item.id, moment(dates.dateFrom).unix(), moment(dates.dateTo).unix());
    };

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
            title: 't_device_id',
            dataIndex: 't_device_id',
            key: 't_device_id',
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

    return(
        <Wrapper {...props} tabActive="statistic">
            <div className="action-header">
                <Title level={2}>Статистика</Title>
                <div
                    onClick={() => setStatisticSendModalVisible(true)}
                    className="action-header-button"
                >
                    <SvgIcon name="mail"/>
                    <span>Отправка статистики</span>
                </div>
            </div>
            <div className="statistic-top">
                <ul
                    className="statistic-top__tabs"
                >
                    <li
                        className={selectedPage === 'all' ? 'active' : ''}
                        key="all"
                        onClick={() => setSelectedPage('all')}
                    >
                        Общая сводка
                    </li>
                    <li
                        key="period"
                        className={selectedPage === 'period' ? 'active' : ''}
                        onClick={() => setSelectedPage('period')}
                    >
                        По времени
                    </li>
                    {
                        selectedPage === 'period' &&
                        <li className="statistic-top__tabs-period">
                            <Select
                                style={{
                                    width: '200px',
                                }}
                                value={interval}
                                onSelect={(value) => {
                                    setInterval(value);
                                }}
                                size="large"
                            >
                                <Option value="all">За все время</Option>
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
                                onChange={(range) => {
                                    setDateRange([
                                        range[0].startOf('day'),
                                        range[1].endOf('day'),
                                    ]);
                                }}
                                style={{
                                    marginLeft: '15px'
                                }}
                                size="large"
                            />
                            }
                        </li>
                    }
                </ul>

                <ul className="statistic-top-values">
                    <li>
                        <span>Количество пользователей</span>
                        <span className="statistic-top-values__value">{props?.statistic?.filtered_users_count}</span>
                    </li>
                    <li>
                        <span>Количество девайсов</span>
                        <span className="statistic-top-values__value">{props?.statistic?.filtered_devices_count}</span>
                    </li>
                </ul>
            </div>
            {dataSource &&
            <>
                <Charts
                    devices={dataSource}
                    randomRgba={randomRgba}
                    handleBarClick={onBarClick}
                    devices_count={props.statistic?.data?.devices_count}
                />
                <Table
                    dataSource={dataSourceTable}
                    columns={columns}
                    pagination={false}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                if (record.key === 'unknown') {
                                    setUnknownCurrentDataView('table');
                                    setUnknownDevicesModalVisible(true);
                                }
                            }
                        };
                    }}
                />
                <Modal
                    className="modal"
                    width={900}
                    title={`Unknown`}
                    visible={unknownDevicesModalVisible}
                    onCancel={() => {
                        setUnknownDevicesModalVisible(false);
                    }}
                    footer={[
                        <Button key="back" onClick={() => {
                            setUnknownDevicesModalVisible(false);
                        }}>
                            Закрыть
                        </Button>,
                    ]}
                >
                    {unknownCurrentDataView === 'table' &&
                        <Table
                            rowSelection
                            className="unknown-table"
                            dataSource={dataSourceUnknown}
                            columns={columns}
                            pagination={false}
                        />
                    }
                    {unknownCurrentDataView === 'charts' &&
                        <>
                            <Charts
                                devices={dataSourceUnknown}
                                randomRgba={randomRgba}
                            />
                        </>
                    }
                </Modal>
            </>
            }

            <Modal
                className="modal"
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
                    loading={devicesByDateLoading}
                />
            </Modal>
            <Modal
                className="modal"
                width={780}
                title=""
                visible={statisticSendModalVisible}
                onCancel={() => {
                    setStatisticSendModalVisible(false);
                }}
                footer={[]}
            >
                <Tabs
                    defaultActiveKey={statisticReportActiveTab}
                    activeKey={statisticReportActiveTab}
                    className="statistic-reports-tabs"
                    onChange={(key) => setStatisticReportActiveTab(key)}
                >
                    <Tabs.TabPane tab="Отправка статистики" key="send">
                        <StatisticSendForm
                            sendReport={props.sendReport}
                            devices={dataSource}
                            changeTab={setStatisticReportActiveTab}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Сохранённые списки" key="saved">
                       <StatisticReports
                           reports={props.reports}
                           deleteReport={props.deleteReport}
                           devices={dataSource}
                           patchReport={props.patchReport}
                           changeTab={setStatisticReportActiveTab}
                       />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
            {props.loading &&
                <Spin tip="Статистика загружается..."
                      onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                      }}
                      style={{
                          position: "fixed",
                          top: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(255, 255, 255, .7)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 9999999,
                      }}>
                </Spin>
            }
        </Wrapper>
    );
}

export default StatisticView;
