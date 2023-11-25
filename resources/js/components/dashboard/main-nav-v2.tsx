import { Link } from "@inertiajs/react"

import { GiBuyCard } from "react-icons/gi"
import { FaAngleLeft, FaList, FaRegUser, FaUserFriends } from "react-icons/fa"
import { FiBox } from "react-icons/fi"
import { FaAngleRight, FaBoxesStacked, FaSort, FaTruckRampBox, FaUserTie, FaUsers } from "react-icons/fa6";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/ui/collapsible"
import { useState } from "react";

const parsePageId = (path: string) => path.substring(path.lastIndexOf('/') + 1)

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const pageId = parsePageId(window.location.pathname)

  const [currentTab, setCurrentTab] = useState("basic");


  return (
    <>
      <div className="flex flex-row fixed h-screen w-[300px] bg-white border-b shadow-md">

        <div className="flex flex-col h-full w-[80px] items-center px-4 bg-forth pt-3 gap-2">
          <Link href="/" className="w-14 h-14 flex justify-center items-center border-2 border-white rounded-full group hover:bg-white hover:bg-opacity-10 transition-all   ">
            <FaAngleLeft className="w-6 h-6 text-white group-hover:w-8 group-hover:h-8 transition-all" />
          </Link>
          <div
            className={`w-14 h-14 flex justify-center items-center border-2 bg-red-600 rounded-full group hover:bg-red-700h active:bg-red-800 transition-all shadow-md shadow-red-900 cursor-pointer ${currentTab === "basic" ? "bg-red-900" : "bg-red-600 "}`}
            onClick={() => setCurrentTab("basic")}
          >
            <FiBox className="w-6 h-6 text-white group-hover:w-7 group-hover:h-7 transition-all" />
          </div>

          <div
            className={`w-14 h-14 flex justify-center items-center border-2 rounded-full group hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-900 cursor-pointer ${currentTab === "users" ? "bg-blue-900" : "bg-blue-600 "}`}
            onClick={() => setCurrentTab("users")}
          >
            <FaUserFriends className="w-6 h-6 text-white group-hover:w-7 group-hover:h-7 transition-all" />
          </div>

          <div className="flex flex-col items-center justify-center mb-3 mt-auto p-3 border-2 border-white rounded-full hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer">
            <FaRegUser className="w-6 h-6 text-white" />
          </div>
        </div>
        <Tabs className=" h-full w-[220px] items-center pt-5 m-0 bg-gray-900 gap-2" value={currentTab}>
          <TabsContent value="basic" className="flex flex-col w-full m-0">
            <Collapsible className="w-full" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <GiBuyCard className="w-5 h-5 text-white " />
                  <p className="font-bold text-sm text-white">TRANSITION</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-white" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/orders"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4 ${pageId === "orders" ? "bg-gray-700" : "bg-gray-900"}`}

                >
                  <FaList className="w-5 h-5 text-white group-hover:text-gray-200" />
                  <p className="text-xs font-bold text-white group-hover:text-gray-200">LES COMMANDES</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="w-full CollapsibleContent" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <FiBox className="w-5 h-5  text-white" />
                  <p className="font-bold text-sm text-white">STOCK</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-red text-white" />
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/products"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4  ${pageId === "products" ? "bg-gray-700" : "bg-gray-900"}`}
                >
                  <FaBoxesStacked className="w-5 h-5 text-white group-hover:text-gray-200" />
                  <p className="text-xs font-bold text-white group-hover:text-gray-200">PRODUITS</p>
                </Link>
                <Link
                  href="/admin/receptions"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4" ${pageId === "receptions" ? "bg-gray-700" : "bg-gray-900"}`}
                >

                  <FaTruckRampBox className="w-5 h-5 text-white" />
                  <p className="text-xs font-bold text-white">RECEPTIONS</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>
          <TabsContent value="users" className="flex flex-col w-full m-0" >
            <Collapsible className="w-full" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3 transition-all px-4">
                <div className="flex items-center gap-3">
                  <FaUserFriends className="w-5 h-5 text-white group-hover:text-gray-200" />
                  <p className="font-bold text-sm text-white group-hover:text-gray-200">USERS</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-red text-white" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/employes"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  hover:text-gray-200 transition-all px-4" ${pageId === "employes" ? "bg-gray-700" : "bg-gray-900"}`}
                >
                  <FaUserTie className="w-5 h-5 text-white group-hover:text-gray-200" />
                  <p className="text-xs font-bold text-white group-hover:text-gray-200">EMPLOYÉES</p>
                </Link>
                <Link
                  href="/admin/clients"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  hover:text-gray-200 transition-all px-4" ${pageId === "clients" ? "bg-gray-700" : "bg-gray-900"}`}
                >
                  <FaUsers className="w-5 h-5 text-white group-hover:text-gray-200" />
                  <p className="text-xs font-bold text-white group-hover:text-gray-200">CLIENTS</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>
        </Tabs>
        {/* <div className="flex flex-col h-16 items-center px-4">
    <Link href="/">
        <Button className="flex items-center justify-items-center text-sm transition-colors  gap-2 font-bold">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <p>Return to Website</p>
        </Button>
    </Link>
    <MainNav className="mx-6" />
    <div className="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav />
    </div>
</div> */}
      </div>
    </>
  )
}
