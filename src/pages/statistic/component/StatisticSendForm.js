import React, {useEffect, useState} from "react";
import {Button, Checkbox, Collapse, DatePicker, Form, Input, Radio, Select, Space} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const StatisticSendForm = (props) => {
    const dateFormat = "DD.MM.YYYY";
    const [form] = Form.useForm();
    const [emailList, setEmailList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [frequencyType, setFrequencyType] = useState('once');
    const [dateRange, setDateRange] = useState([moment().startOf('day'), moment()]);
    const [selectedInterval, setSelectedInterval] = useState("month");
    const [filledCategoryCheckboxes, setFilledCategoryCheckboxes] = useState(null);
    const [filledCategoryProdCheckboxes, setFilledCategoryProdCheckboxes] = useState(null);

    useEffect(() => {
        if (props.report) {
            form.setFieldsValue({
                name: props.report.subject || '',
                day: props.report.day || '',
                period: props.report.for_time || 'month'
            });

            const currentList = [];
            const currentSelectedCategories = [];
            const currentProducts = [];
            props.report.to_emails.map(email =>
                currentList.push({
                    name: `email_${currentList.length + 1}`,
                    value: email,
                })
            );
            props.report.categories.map(category => {
                currentSelectedCategories.push(category.id)
            });
            props.report.products.map(product =>
                currentProducts.push(product.id)
            );
            setEmailList(currentList);


            setTimeout(() => {
                setSelectedCategories(currentSelectedCategories);
                console.log(11111);
                setSelectedProducts(currentProducts);
            }, 1000)

            if (props.report.day) {
                setFrequencyType("period")
            }
        } else {
            setEmailList([{name: 'email_1'}]);
            form.setFieldsValue({
                day: '31'
            });
        }
    }, [props.report])


    useEffect(() => {
        const categoriesArray = [];
        const productsObj = {};
        props.devices.map(item => {
            if (!categoriesArray.find(categoryItem => categoryItem.id === item.category_id)) {
                categoriesArray.push({
                    id: item.category_id,
                    title: item.category,
                });
            }
            if (productsObj[item.category_id]) {
                productsObj[item.category_id].push({
                    product_id: item.id,
                    product_name: item.t_product_id
                });
            } else {
                productsObj[item.category_id] = [];
                productsObj[item.category_id].push({
                    product_id: item.id,
                    product_name: item.t_product_id
                });
            }
        });
        setCategories(categoriesArray);
        setProducts(productsObj);
    }, [props.devices]);

    useEffect(() => {
        if (selectedProducts?.length) {
            form.setFields([
                {
                    name: 'products',
                    errors: [],
                },
            ]);
        }
    }, [selectedProducts])

    const onFinish = (values) => {
        if (!selectedCategories?.length) {
            form.setFields([
                {
                    name: 'categories',
                    errors: ['Выберите категорию'],
                },
            ]);
        } else if (!selectedProducts?.length) {
            form.setFields([
                {
                    name: 'products',
                    errors: ['Выберите продукты'],
                },
            ]);
        } else {
            const to_emails = [];

            Object.keys(values).map(key =>{
                if (key.split('_')[0] === 'email') {
                    to_emails.push(values[key]);
                }
            })
            const delivery = {
                "subject": values.name,
                "to_emails": to_emails,
                //"day": values.day
            };

            const statistics = {
                "for_time": selectedInterval,
                "category_ids": selectedCategories,
                "product_ids": selectedProducts,
            }

            const dates = _getDateInterval(selectedInterval);

            if (frequencyType === "once") {
                if (selectedInterval === "period") {
                    statistics["for_time"] = "period";
                    statistics["since"] = moment(dateRange[0].format()).unix();
                    statistics["until"] =  moment(dateRange[1].format()).unix();
                } else {
                    statistics["for_time"] = selectedInterval;

                    statistics["since"] =  moment(dates.dateFrom).unix();
                    statistics["until"] =  moment(dates.dateTo).unix();
                }
            } else {
                delivery["day"] = values.day;
                statistics["for_time"] = "month";
                statistics["since"] =  moment(dates.dateFrom).unix();
                statistics["until"] =  moment(dates.dateTo).unix();
            }

            //const currentDate = new Date();
            statistics["timezone_offset"] = 3;

            if (props.report) {
                props.patchReport(props.report.id, delivery, statistics);
                props.setEditReportModalVisible(false);
                props.changeTab('saved');
            } else {
                props.sendReport(delivery, statistics);
            }

            form.resetFields();
            setSelectedProducts([]);
            setSelectedCategories([]);
        }
    };

    const onFinishFailed = () => {
        console.log('failed');
    };

    const handleAddEmailToList = () => {
        const currentList = Array.from(emailList);
        currentList.push({name: `email_${currentList.length + 1}`, value: ""});
        setEmailList(currentList);
    };

    const handleChangeSelectedCategories = (value) => {
        let addedCategories = value.filter(x => !selectedCategories.includes(x));
        let removedCategories = selectedCategories.filter(x => !value.includes(x));
        fillAddedCategory(addedCategories);
        uncheckedRemovedCategory(removedCategories);
        setSelectedCategories(value);
        if (value?.length) {
            form.setFields([
                {
                    name: 'categories',
                    errors: [],
                },
            ]);
        }
    };

    const fillAddedCategory = (categories) => {
        const productsArray = Array.from(selectedProducts);
        categories.map(category =>
            products[category].map(product => {
                productsArray.push(product.product_id)
            })
        )
        setSelectedProducts(productsArray);
    };

    const uncheckedRemovedCategory = (categories) => {
        if (categories?.length) {
            const productsArray = Array.from(selectedProducts);
            const removedProducts = [];
            categories.map(category =>
                products[category].map(product => {
                    removedProducts.push(product.product_id);
                    setFilledCategoryCheckboxes({...filledCategoryCheckboxes, [category]: true})
                    setFilledCategoryProdCheckboxes({...filledCategoryProdCheckboxes, [category]: false})
                })
            )
            setSelectedProducts(productsArray.filter(x => !removedProducts.includes(x)));

        }
    };

    const getCategoryName = (id) => {
      const target = categories.find(category => category.id === id);
      if (target) {
          return target.title;
      } else {
          return id;
      }
    };

    const handleRemoveProducts = (products, checked) => {
        const currentProducts = Array.from(selectedProducts);

        if (checked) {
            products.map(product => {
                if (!currentProducts.includes(product.product_id)) {
                    currentProducts.push(product.product_id);
                }
            });

            setSelectedProducts(JSON.parse(JSON.stringify(currentProducts)));
        } else {
            products.map(product => {
                const elementIndex = currentProducts.indexOf(product.product_id);
                if (elementIndex >= 0) {
                    currentProducts.splice(elementIndex, 1);
                }
            });

            setSelectedProducts(JSON.parse(JSON.stringify(currentProducts)));
        }
    }

    const handleRemoveProductionProducts = (products, checked) => {
        const currentProducts = Array.from(selectedProducts);

        if (checked) {
            products.map(product => {
                if (product.product_name.toLowerCase().includes('sls')) {
                    if (!currentProducts.includes(product.product_id)) {
                        currentProducts.push(product.product_id);
                    }
                }
                else {
                    const elementIndex = currentProducts.indexOf(product.product_id);
                    if (elementIndex >= 0) {
                        currentProducts.splice(elementIndex, 1);
                    }
                }
            });

            setSelectedProducts(JSON.parse(JSON.stringify(currentProducts)));
        } else {
            products.map(product => {
                if (product.product_name.toLowerCase().includes('sls')) {
                    const elementIndex = currentProducts.indexOf(product.product_id);
                    if (elementIndex >= 0) {
                        currentProducts.splice(elementIndex, 1);
                    }
                }
            });

            setSelectedProducts(JSON.parse(JSON.stringify(currentProducts)));
        }
    }

    const handleRemoveProduct = (event) => {
        const { value } = event.target;
        const { checked } = event.target;
        const currentProducts = Array.from(selectedProducts);

        if (checked) {
            currentProducts.push(value);
            setSelectedProducts(currentProducts);
        } else {
            const elementIndex = currentProducts.indexOf(value);
            if (elementIndex >= 0) {
                currentProducts.splice(elementIndex, 1);
                setSelectedProducts(currentProducts);
            }
        }
    };

    const deleteItemFromEmailList = (name) => {
        const emailListArray = Array.from(emailList);
        const delIndex = emailListArray.findIndex(item => item.name === name);

        if (delIndex >= 0) {
            emailListArray.splice(delIndex, 1);
            form.setFieldsValue({
                [name] : ""
            });
        }

        setEmailList(emailListArray);
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
                intervalDefault.dateFrom = moment().startOf('week').startOf('day').format();
                break;
            case 'month':
                intervalDefault.dateFrom = moment().startOf('month').startOf('day').format();
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

    return(
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Как назвать список?"
                name="name"
                rules={[{ required: true, message: 'Введите название списка' }]}
            >
                <Form.Item name="name" noStyle>
                    <Input
                        size="large"
                        placeholder="Введите название"
                    />
                </Form.Item>
                <p className="form-item-description">Название будет отображаться в теме письма и в сохранённых отправках при ежемесячной отправке.</p>
            </Form.Item>
            <Form.Item
                label="Куда отправлять статистику?"
                name="emailList"
            >
                {
                    emailList.map(emailItem =>
                        <Form.Item name={emailItem.name} initialValue={emailItem?.value || ""} key={emailItem.name} rules={[{ required: true, message: 'Введите email' }]}>
                            <Input
                                value={emailItem?.value || ""}
                                size="large"
                                placeholder="Введите email"
                                suffix={<DeleteOutlined onClick={() => deleteItemFromEmailList(emailItem.name)}/>}
                            />
                        </Form.Item>
                    )
                }
                <span className="add-form-item-button" onClick={handleAddEmailToList}>
                    <Button icon={<PlusOutlined/>} size="small"/>
                    <span className="label">Добавить email</span>
                </span>
            </Form.Item>
            <Form.Item
                label="Выберите категории устройств по которым хотите получать статистику"
                name="categories"
            >
                {props.report && selectedCategories.length > 0 &&
                    <Select
                        size="large"
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите категории"
                        defaultValue={selectedCategories}
                        onChange={handleChangeSelectedCategories}
                    >
                        {categories.map(category =>
                            <Option key={category.id} value={category.id}>{category.title}</Option>
                        )}
                    </Select>
                }
                {!props.report  &&
                    <Select
                        size="large"
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите категории"
                        onChange={handleChangeSelectedCategories}
                    >
                        {categories.map(category =>
                            <Option key={category.id} value={category.id}>{category.title}</Option>
                        )}
                    </Select>
                }

            </Form.Item>

            <Form.Item
                label="Как часто вы хотите отправлять данную статистику?"
            >
                <div>
                    <Radio.Group
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginTop: '25px'
                        }}
                        onChange={(event) => {
                            setFrequencyType(event.target.value);
                        }}
                        defaultValue={frequencyType}
                        value={frequencyType}
                    >
                        <Space direction="horizontal">
                            <Radio value="once" className="form-radio" style={{ width: '90% '}}>
                                <p>Один раз</p>
                                <p className="form-item-description">Статистика будет отправлена один раз</p>
                            </Radio>
                            <Radio value="period" className="form-radio" style={{ width: '90% '}}>
                                <p>Ежемесячно</p>
                                <p className="form-item-description" style={{ fontWeight: '400', fontSize: '14px', color: '#4286F4' }}>Статистика отправляется в 9.00 выбранного числа месяца.</p>
                            </Radio>
                        </Space>
                        {frequencyType === "period" &&
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "35px",
                            width: "58%",
                            marginLeft: "auto",
                        }}>
                            <span style={{fontSize: '16px', marginRight: '14px'}}>Выберите число отправки</span>
                            <Form.Item
                                noStyle
                                defaultValue="31"
                                value="31"
                                name="day"
                            >
                                <Input size="large" style={{ width: "43px"}}/>
                            </Form.Item>
                        </div>
                        }
                    </Radio.Group>
                </div>
            </Form.Item>
            {selectedCategories && selectedCategories.length > 0 &&
                <Form.Item
                    className="statistic-report-products"
                    label="Выберите продукты в соответствии с выбранными категориями"
                    name="products"
                >
                    <Collapse>
                        {selectedCategories.map(category =>
                            <Panel header={getCategoryName(category)} key={category}>
                                <div>
                                    <Checkbox
                                        onChange={(event) => {
                                            handleRemoveProducts(products[category], event.target.checked);
                                            setFilledCategoryCheckboxes({...filledCategoryCheckboxes, [category]: event.target.checked})
                                            setFilledCategoryProdCheckboxes({...filledCategoryProdCheckboxes, [category]: false})
                                        }}
                                        checked={filledCategoryCheckboxes?.[category] === undefined ? true : filledCategoryCheckboxes?.[category]}
                                    >
                                        Выбрать все
                                    </Checkbox>
                                    <Checkbox
                                        onChange={(event) => {
                                            handleRemoveProductionProducts(products[category], event.target.checked);
                                            setFilledCategoryProdCheckboxes({...filledCategoryProdCheckboxes, [category]: event.target.checked})
                                            setFilledCategoryCheckboxes({...filledCategoryCheckboxes, [category]: false})
                                        }}
                                        checked={filledCategoryProdCheckboxes?.[category] === undefined ? false : filledCategoryProdCheckboxes?.[category]}
                                    >
                                        Выбрать прод. устройства
                                    </Checkbox>
                                </div>
                                {
                                    products[category].map(product =>
                                        <Checkbox
                                            onChange={handleRemoveProduct}
                                            checked={selectedProducts.includes(product.product_id)}
                                            value={product.product_id}>{product.product_name}
                                        </Checkbox>
                                    )
                                }
                            </Panel>
                        )}
                    </Collapse>
                </Form.Item>
            }
            {
                frequencyType === "once" &&
                <Form.Item
                    rules={[{ required: true, message: 'Выберите период' }]}
                    label="Введите период за который хотите получать статистику"
                    name="period"
                    initialValue="month"
                >
                    <Select defaultValue="month" size="large" onChange={(value) => {
                        setSelectedInterval(value);
                    }}>
                        <Option value="all">За все время</Option>
                        <Option value="month">За последний месяц</Option>
                        <Option value="week">За последнюю неделю</Option>
                        <Option value="yesterday">За вчера</Option>
                        <Option value="today">За сегодня</Option>
                        <Option value="period">За период</Option>
                    </Select>
                </Form.Item>
            }
            {
                selectedInterval === "period" &&
                <RangePicker
                    value={dateRange}
                    format={dateFormat}
                    onChange={(range) => {
                        setDateRange([
                            range[0].startOf('day'),
                            range[1].endOf('day'),
                        ]);
                    }}
                    size="large"
                />
            }

            {/*<Form.Item*/}
            {/*    rules={[{ required: true, message: 'Введите число месяца' }]}*/}
            {/*    label="Введите число месяца когда получить статистику"*/}
            {/*    name="day"*/}
            {/*>*/}
            {/*    <p style={{ fontWeight: '400', fontSize: '14px', color: '#4286F4' }}>Статистика отправляется в 9.00 выбранного числа месяца.</p>*/}
            {/*    <Form.Item*/}
            {/*        noStyle*/}
            {/*        rules={[{ required: true, message: 'Введите число месяца' }]}*/}
            {/*        label="Введите число месяца когда получить статистику"*/}
            {/*        name="day"*/}
            {/*    >*/}
            {/*        <Input defaultValue="31" size="large" style={{ width: "43px"}}/>*/}
            {/*    </Form.Item>*/}
            {/*</Form.Item>*/}
            {
                props.report &&
                <div className="statistic-send-buttons">
                    <Button size="large" type="primary" className="cancel-button">Отменить</Button>
                    <Button size="large" type="primary" htmlType="submit">Сохранить</Button>
                </div>
            }
            {
                !props.report &&
                <div className="statistic-send-buttons">
                    <Button size="large" type="primary" className="cancel-button">Отменить</Button>
                    <Button size="large" type="primary" htmlType="submit">Отправить</Button>
                </div>
            }
        </Form>
    );
}

export default StatisticSendForm;
