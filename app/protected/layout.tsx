// import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "../../app/globals.css";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   display: "swap",
//   subsets: ["latin"],
// });
// className={`${geistSans.className} antialiased`}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
