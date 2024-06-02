export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-screen w-full">
      <body>{children}</body>{" "}
    </html>
  );
}
