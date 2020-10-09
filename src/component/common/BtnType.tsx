import React from 'react';
import { Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { EDIT_URL } from '../../Config/API'
import { request } from '../../Util';
const { confirm, success } = Modal;

interface Button_selef {
    name: string;
    type: string;
    option: string;
    id: string
}

interface BtnType {
    data: Button_selef;
    type: string;
    onDelete?: Function;
}

const buttonType: any = {
    edit: {
        render(props: Button_selef, history: any) {
            return <Button type="link" onClick={() => history.push(history.location.pathname + '/edit/' + props.id)}>{props.name}</Button>
        }
    },
    auth: {
        render(props: any, history: any) {
            return <Button type="link" onClick={() => history.push(history.location.pathname + '/auth/' + props.id)}>{props.name}</Button>
        }
    },
    delete: {
        handleClick(data: Button_selef, history: any, onDelete: Function) {
            const type = history.location.pathname.split('/')[1]
            confirm({
                title: data.name,
                content: `确定要${data.name}？`,
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    try {
                        const deleteInfo: any = await request.delete(EDIT_URL, { data: { id: data.id, type } })
                        if (deleteInfo.code === 1) {
                            success({
                                title: '删除',
                                content: '数据成功删除...',
                                okText: '确认',
                                onOk() {
                                    onDelete(deleteInfo.data.id)
                                }
                            })
                        }
                    } catch (error) {

                    }
                }
            })
        },
        render(props: Button_selef, history: any, onDelete: Function) {
            return <Button type="link" onClick={() => this.handleClick(props, history, onDelete)}>{props.name}</Button>
        }
    },
    approve: {
        render(props: Button_selef, history: any, onDelete: Function) {
            return <Button type="link" >{props.name}</Button>
        }
    }
}

export default (props: BtnType) => {
    const history = useHistory()
    return <>
        {buttonType[props.type].render(props.data, history, props.onDelete)}
    </>
}