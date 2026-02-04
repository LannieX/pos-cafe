// components/layout/AppHeader.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type AppHeaderProps = {
  breadcrumbs?: BreadcrumbItemType[];
};

export default function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  );
}
