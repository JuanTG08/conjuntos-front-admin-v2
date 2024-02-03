import Link from "next/link";
import React from "react";
import Container from "./container";
import { AcmeLogo } from "@/components/logos/AcmeLogo";

export default function FooterPage({ navigation }) {
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 mx-auto border-t border-gray-100  lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-primary "
              >
                <AcmeLogo />
                <span>{process.env.NEXT_PUBLIC_NAME_APP}</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 ">
              Simplifica la administración de tu copropiedad con nuestra
              plataforma todo en uno.
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((routeMain, indMain) =>
                routeMain?.navigation_bar_sub?.length > 0 ? (
                  routeMain?.navigation_bar_sub.map((routeSub, indJ) => (
                    <Link
                      key={indJ}
                      href={routeSub?.link}
                      className="w-full px-4 py-2 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none "
                    >
                      {routeSub.label}
                    </Link>
                  ))
                ) : (
                  <Link
                    key={indMain}
                    href={routeMain?.link}
                    className="w-full px-4 py-2 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none "
                  >
                    {routeMain.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/*

        <div className="my-10 text-sm text-center text-gray-600 ">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
          <a href="https://web3templates.com/" target="_blank" rel="noopener">
            Web3Templates.
          </a>{" "}
          Illustrations from{" "}
          <a href="https://www.glazestock.com/" target="_blank" rel="noopener ">
            Glazestock
          </a>
        </div>

        */}
      </Container>
    </div>
  );
}
