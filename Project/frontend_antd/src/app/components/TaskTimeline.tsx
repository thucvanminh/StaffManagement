import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const TaskTimeline: React.FC = () => (
    <Timeline
        items={[
            {
                color: 'green',
                children: 'Create a services site 2015-09-01',
            },
            {
                color: 'green',
                children: 'Create a services site 2015-09-01',
            },
            {
                color: 'red',
                children: (
                    <>
                        <p>Solve initial network problems 1</p>
                    </>
                ),
            },
            {
                children: (
                    <>
                        <p>Technical testing 1</p>
                    </>
                ),
            },
            {
                color: 'gray',
                children: (
                    <>
                        <p>Technical testing 1</p>
                    </>
                ),
            },
        ]}
    />
);
export default TaskTimeline;