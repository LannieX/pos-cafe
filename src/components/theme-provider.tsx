"use client";

import React from "react";
import { ConfigProvider } from "antd";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-kanit)", 
        },
        components: {
          Segmented: {
            itemSelectedBg: '#6F4E37',
            itemSelectedColor: '#ffffff',
            
            itemHoverBg: 'rgba(86, 53, 23, 0.1)',
            itemHoverColor: '#6F4E37',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}