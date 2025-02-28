// 'use client';
// import React from 'react';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
// import dayLocaleData from 'dayjs/plugin/localeData';
// dayjs.extend(dayLocaleData);
// const CalendarMenu = () => {
//   const { token } = theme.useToken();
//   const onPanelChange = (value, mode) => {
//     console.log(value.format('YYYY-MM-DD'), mode);
//   };
//   // src/app/components/CalendarMenu.js (hoặc vị trí tương ứng)
//   const wrapperStyle = {
//     width: 300,
//     border: `1px solid ${token.colorBorderSecondary}`,
//     borderRadius: token.borderRadiusLG,
//     margin: 0,
//     padding: 0,
//   };
//   return (
//     <div style={wrapperStyle}>
//       <Calendar
//         fullscreen={false}
//         headerRender={({ value, type, onChange, onTypeChange }) => {
//           const start = 0;
//           const end = 12;
//           const monthOptions = [];
//           let current = value.clone();
//           const localeData = value.localeData();
//           const months = [];
//           for (let i = 0; i < 12; i++) {
//             current = current.month(i);
//             months.push(localeData.monthsShort(current));
//           }
//           for (let i = start; i < end; i++) {
//             monthOptions.push(
//               <Select.Option key={i} value={i} className="month-item">
//                 {months[i]}
//               </Select.Option>,
//             );
//           }
//           const year = value.year();
//           const month = value.month();
//           const options = [];
//           for (let i = year - 10; i < year + 10; i += 1) {
//             options.push(
//               <Select.Option key={i} value={i} className="year-item">
//                 {i}
//               </Select.Option>,
//             );
//           }
//           return (
//             <div
//               style={{
//                 padding: 8,
//               }}
//             >
//               <Typography.Title level={4}>Personal Calendar</Typography.Title>
//               <Row gutter={8}>
//                 <Col>
//                   <Radio.Group
//                     size="small"
//                     onChange={(e) => onTypeChange(e.target.value)}
//                     value={type}
//                   >
//                     <Radio.Button value="month">Month</Radio.Button>
//                     <Radio.Button value="year">Year</Radio.Button>
//                   </Radio.Group>
//                 </Col>
//                 <Col>
//                   <Select
//                     size="small"
//                     popupMatchSelectWidth={false}
//                     className="my-year-select"
//                     value={year}
//                     onChange={(newYear) => {
//                       const now = value.clone().year(newYear);
//                       onChange(now);
//                     }}
//                   >
//                     {options}
//                   </Select>
//                 </Col>
//                 <Col>
//                   <Select
//                     size="small"
//                     popupMatchSelectWidth={false}
//                     value={month}
//                     onChange={(newMonth) => {
//                       const now = value.clone().month(newMonth);
//                       onChange(now);
//                     }}
//                   >
//                     {monthOptions}
//                   </Select>
//                 </Col>
//               </Row>
//             </div>
//           );
//         }}
//         onPanelChange={onPanelChange}
//       />
//     </div>
//   );
// };
// export default CalendarMenu;


'use client';
import React from 'react';
import { Badge, Calendar } from 'antd';
const getListData = (value) => {
  let listData = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event......',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const CalendarMenu = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
export default CalendarMenu;