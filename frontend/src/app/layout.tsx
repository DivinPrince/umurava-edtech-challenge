import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Challenge",
  description: "Challenge from umurava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <Toaster richColors position="bottom-right" />
          <ReduxProvider>{children}</ReduxProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
