/* frontend/src/app/page.tsx */

import Link from 'next/link';
import LoginSection from './components/assets/LoginSection';
import EmployeePanel from './components/assets/EmployeePanel';

export default function HomePage() {
  return (
    <div>
      <LoginSection />
      {/* <EmployeePanel/> */}
    </div>
  );
}