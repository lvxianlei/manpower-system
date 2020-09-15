import React, { useState, useEffect } from 'react'
import { Result, Button } from 'antd'
type Status = "404" | 403 | 404 | 500 | "403" | "500" | "success" | "error" | "info" | "warning" | undefined
export default (props: any) => {
    const [status, setStatus] = useState('404')

    return <Result
        // status={status}
        title={status}
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">回到首页</Button>}
    />
}