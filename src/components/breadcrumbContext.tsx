// components/breadcrumb/BreadcrumbContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type BreadcrumbContextType = {
  items: BreadcrumbItemType[];
  setItems: (items: BreadcrumbItemType[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<BreadcrumbItemType[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("useBreadcrumb must be used inside BreadcrumbProvider");
  return ctx;
}
