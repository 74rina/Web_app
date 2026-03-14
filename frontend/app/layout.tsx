import './globals.css';

export const metadata = {
  title: 'Bulletin Board',
  description: 'タグ付き投稿といいねができる掲示板',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
