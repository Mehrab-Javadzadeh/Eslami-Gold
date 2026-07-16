import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

export const metadata = {
  title: "Eslami Gold",
  description: "طلا فروشی اسلامی گلد",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="color-scheme" content="light" />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}