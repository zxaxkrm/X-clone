import React, { Children } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>
  <LeftSideBar/>
<div className="mr-2 md:mr-10 xl:mr-110 lg:ml-100 ml-12 min-h-screen border border-border mb-20">
{children}
</div>
<RightSideBar/>
 </>;
}
