import React, { useState } from 'react';
import Query from '../../common/Query'
import Table from '../../common/Table'
import '../index.scss'

export default () => {
    return (
        <div>
            <Query/>
            <Table/>
        </div>
    )
}