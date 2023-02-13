import React, {useEffect, useState} from "react";
import StatisticSendForm from "./StatisticSendForm";
import SvgIcon from "../../../components/icon";
import {Button, Modal, Select, Table} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const StatisticReports = (props) => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [deleteReportModalVisible, setDeleteReportModalVisible] = useState(false);
    const [editReportModalVisible, setEditReportModalVisible] = useState(false);

    return(
        <>
            {props?.reports && props?.reports.length > 0 &&
                props?.reports?.map(report =>
                    <div className="statistic-report">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <SvgIcon name="report"/>
                            <span
                                style={{
                                    fontWeight: '500',
                                    fontSize: '18px',
                                    marginLeft: '16px'
                                }}
                            >
                                {report.subject}</span>
                        </div>
                        <div
                            style={{
                                borderBottom: '2px solid #9BA3B1',
                                paddingBottom: '13px',
                                marginTop: '30px'
                            }}
                        >
                            {report.to_emails.map(email =>
                                <span style={{ marginRight: '20px'}}>{email}</span>
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '10px'
                            }}
                        >
                            {report.for_time === "month" &&
                                <span>За месяц</span>
                            }
                            {report.for_time === "week" &&
                                <span>За неделю</span>
                            }
                            {report.for_time === "day" &&
                                <span>За день</span>
                            }
                            {report.for_time === "period" &&
                                <span>За период</span>
                            }
                            {
                                report.day && <span>{`Ежемесячно ${report.day} числа`}</span>
                            }

                        </div>
                        {report.day &&
                        <div className="statistic-report-actions">
                            <EditOutlined
                                onClick={() => {
                                    setSelectedReport(report);
                                    setEditReportModalVisible(true);
                                }}
                                style={{ marginRight: '12px'}}
                            />
                            <DeleteOutlined
                                onClick={() => {
                                    setSelectedReport(report);
                                    setDeleteReportModalVisible(true);
                                }}
                            />
                        </div>
                        }

                    </div>
                )
            }
            {props?.reports && props?.reports.length === 0 &&
                <p style={{ fontSize: '18px', textAlign: 'center', padding: '40px'}}>Отчеты не найдены</p>
            }

            <Modal
                className="modal"
                width={500}
                title=""
                visible={deleteReportModalVisible}
                onCancel={() => {
                    setDeleteReportModalVisible(false);
                }}
                footer={[
                    <Button key="submit" onClick={() => {
                        setDeleteReportModalVisible(false);
                    }}>
                        Отмена
                    </Button>,
                    <Button type="primary" danger  key="back" onClick={() => {
                        setDeleteReportModalVisible(false);
                        props.deleteReport(selectedReport.id);
                    }}>
                        Удалить
                    </Button>,
                ]}
            >
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        padding: '52px 52px 0',
                    }}
                >
                    <SvgIcon name="logo-cm" />
                    <p>Вы уверены, что хотите удалить сохранённый список статистики</p>
                    <b>{selectedReport?.subject || ''}</b>
                </div>
            </Modal>
            <Modal
                className="modal"
                width={900}
                title="Редактирование сохранённого списка"
                visible={editReportModalVisible}
                onCancel={() => {
                    setEditReportModalVisible(false);
                }}
                footer={[]}
            >
                <StatisticSendForm
                    report={selectedReport}
                    devices={props.devices}
                    patchReport={props.patchReport}
                    setEditReportModalVisible={setEditReportModalVisible}
                />
            </Modal>
        </>
    );
};

export default StatisticReports;
