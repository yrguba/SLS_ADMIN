import React from "react";
import { Form, Input } from "antd";

function CategoryFormView (props) {
    return(
        <Form
            form={props.form}
        >
            {
                props.fields.map(field =>
                    <Form.Item
                        label={field.placeholder}
                        name={field.name}
                        rules={[{
                            required: true,
                            message: 'Поле обязательно для заполнения'
                        }]}

                    >
                        <Input
                            placeholder={field.placeholder}
                            size="large"
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                    </Form.Item>
                )
            }
        </Form>
    );
}

export default CategoryFormView;
