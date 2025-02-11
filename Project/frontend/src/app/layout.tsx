/* frontend/src/app/layout.tsx */

// import './globals.css';

// export const metadata = {
//   title: 'HRM System',
//   description: 'Human Resource Management',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }
import './globals.css';
import EmployeePanel from './EmployeePanel/EmployeePanel';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EmployeePanel>
          {children}
        </EmployeePanel>
      </body>
    </html>
  );
}