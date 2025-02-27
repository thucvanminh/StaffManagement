import React from 'react';
import { DatePicker, Space } from 'antd';
const onOk = (value) => {
    console.log('onOk: ', value);
};
const TimePicker = () => (
    <Space direction="vertical" size={12}>
        <DatePicker
            showTime
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
        />
    </Space>
);
export default TimePicker;