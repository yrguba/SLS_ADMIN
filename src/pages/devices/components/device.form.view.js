import React, {useEffect} from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

function DeviceFormView (props) {
    useEffect(() => {
        props.getDevicesCategories();
    }, [props.fields]);

    const renderCategories = () => {
        return props.categories && props.categories.map(
            category => <Option value={category.id}>{category.title}</Option>
        );
    };

    const saveChanges = (values) => {
        console.log(values);
    };

    return(
        <Form
            form={props.form}
            onFinish={saveChanges}
        >
            {
                props.fields.map(field =>
                    <>
                        {field.type === 'input' &&
                            <Form.Item
                                label={field.placeholder}
                                name={field.name}
                                rules={field.required ? [{
                                    required: true,
                                    message: 'Поле обязательно для заполнения'
                                }] : []}
                            >
                                    <Input
                                        placeholder={field.placeholder}
                                        size="large"
                                        style={{
                                            marginBottom: '16px'
                                        }}
                                        disabled={field?.disabled}
                                    />
                            </Form.Item>
                        }
                        {field.type === 'select' &&
                            <Form.Item
                                name="category_id"
                                label="Категория"
                            >
                                <Select
                                    placeholder={field.placeholder}
                                    showSearch
                                    style={{ width: '100%' }}
                                    size="large"
                                >
                                    {renderCategories()}
                                </Select>
                            </Form.Item>
                        }
                    </>
                )
            }
        </Form>
    );
}

export default DeviceFormView;
