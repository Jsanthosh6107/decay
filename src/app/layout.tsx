import "./globals.css"
import { Quicksand, Poppins } from "next/font/google"
import GlobalDecayGlow from "@/components/ui/GlobalDecayGlow";

export const metadata = {
  title: "ARS",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-heading",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-body",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${poppins.variable} antialiased`}>
        {children}
        <GlobalDecayGlow />
      </body>
    </html>
  )
}