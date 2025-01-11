import './globals.css';

export const metadata = {
  title: 'HRM System',
  description: 'Human Resource Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
