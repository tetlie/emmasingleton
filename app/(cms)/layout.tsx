export const metadata = {
  title: 'ES — Studio',
  description: 'CMS for ES',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
