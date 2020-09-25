import React from 'react'
import { Select, Input, InputNumber, DatePicker, Switch } from 'antd'
const { TextArea } = Input
const { Option } = Select
const FormType: any = {
    select: {
        render: (props: FormItemType) => <Select {...props}>
            {props.data &&
                props.data.option &&
                props.data.option.map((item: any) => <Option value={item.name} key={item.name}>{item.label}</Option>)}
        </Select>
    },
    text: { render: (props: any) => <TextArea {...props} /> },
    phone: { render: (props: FormItemType) => <Input  {...props} /> },
    string: { render: (props: FormItemType) => <Input {...props} /> },
    time: {
        render: (props: any) => <DatePicker {...props} format={'YYYY-MM-DD'} />
    },
    mentions: { render: (props: FormItemType) => <Input {...props} /> },
    switch: { render: (props: any) => <Switch {...props} ></Switch> },
    number: { render: (props: any) => <InputNumber {...props} /> }
}

type FormItem = 'select' | 'text' | 'phone' | 'string' | 'time' | 'mentions' | 'switch'

interface SelectOption {
    name: String | number,
    label: String
}

interface HeadData {
    label: String;
    name: String;
    option?: Array<SelectOption>;
    type: FormItem
}

interface FormItemType {
    type: FormItem;
    data?: HeadData;
}

export default (props: FormItemType) => FormType[props.type].render(props)