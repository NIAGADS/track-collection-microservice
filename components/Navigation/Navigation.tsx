"use client";
import React, { ReactNode } from "react";

export interface MenuItemProps {
    label: string;
    openNewTab?: boolean;
    href: string;
}

interface NavigationProps {
    brand: MenuItemProps
    logo?: any;
    variant: "primary" | "secondary" | "white" | "default";
    items: MenuItemProps[];
}

const __buildRouterLink = (url: string) => {
    if (url.startsWith("http")) {
        return url;
    }
    // otherwise build the router link
    return `${process.env.NEXT_PUBLIC_APP_HOST_URL}${url.startsWith("/") ? url : "/" + url}`;
};

const MenuItem = ({ label, openNewTab, href }: MenuItemProps) => {
    return <a href={__buildRouterLink(href)} target={openNewTab ? "_blank" : "_self"} />;
};

export const Navigation = ({ brand, logo, items, variant = "white" }: NavigationProps) => {
    return (
        <nav className={`ui-nav ${variant}`}>s
            <div className="ui-nav-inner-container">
                <a href={brand.href} target={brand.openNewTab ? '_blank' : '_selfsss'} className="ui-nav-brand">
                    <img src={logo} className="h-8" alt="Logo" />
                    <span className="ui-nav-brand-label">
                        {brand.label}
                    </span>
                </a>
            </div>
            <div className="ui-nav-item-container">
                <ul className="ui-nav-item-list">

                </ul>
            </div>
        </nav>
    );
};

/*





  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

*/
