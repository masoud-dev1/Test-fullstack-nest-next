import Link from 'next/link';

export const metadata = { title: 'CRUD Demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      {children}
      </body>
      </html>
  );
}