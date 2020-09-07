import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
const confirm = Modal.confirm;
/**
 * buttonType保存了所有要返回的button类型type属性和所要进行的操作
 */
const buttonType: any = {
    edit: {
        render(props: any) {
            // return <Button type="link" onClick={() => history.push('/edit')}>{props.name}</Button>
        }
    },
    delete: {
        handleClick(event: any) {
            const { that } = event;
            const { name } = that.props;
            confirm({
                title: name,
                content: `确定要${name}？`,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    const { data, linkUrl } = that.props;
                    that.props.dispatch(that.props.deleteWay({ path: linkUrl, deleteId: { name: data.get('name'), linkUrl } }));
                }
            })
        },
        render(props: any) {
            const { that } = props;
            const { disabled } = that.props;
            return <Button type="link" className={disabled ? "disabled" : ''} disabled={disabled ? true : false} onClick={() => this.handleClick(props)}>{props.children}</Button>
        }
    }
}

export default (props:any) => {
    // const history = useHistory()
}