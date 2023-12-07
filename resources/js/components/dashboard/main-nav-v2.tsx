import { Link } from "@inertiajs/react"

// Hooks
import useWindowDimensions from "@/components/hooks/useWindowDimensions";


// Icons
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
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdCategory } from "react-icons/md";


const parsePageId = (path: string) => path.split("/")[2] || "admin"

export function MainNav({ auth, showNav, setNav }: { auth?: any, showNav: boolean, setNav: (value: boolean) => void }) {
  const pageId = parsePageId(window.location.pathname)
  const { height, width } = useWindowDimensions();
  const [currentTab, setCurrentTab] = useState("basic");
  const [collapsedStateList, setCollapsedStateList] = useState([true, true, true])
  return (
    <>

      <div className={`flex flex-row fixed h-screen  bg-white border-b shadow-md z-10 ${showNav ? "w-[50px] md:w-[270px]" : "w-[50px]"} transition-all duration-300`}>
        {showNav && <div className="md:hidden fixed w-screen h-screen bg-black bg-opacity-50 z-0" onClick={() => setNav(false)}></div>}
        <div className="flex flex-col h-full w-[50px] items-center  bg-forth z-20
        ">
          <Link href="/" className="w-full h-14 flex justify-center items-center  border-white  group hover:bg-white hover:bg-opacity-10 transition-all   ">
            <FaAngleLeft className="w-5 h-5 text-white group-hover:w-6 group-hover:h-6 transition-all" />
          </Link>
          <div
            className={`w-full h-14 flex justify-center items-center group transition-all cursor-pointer ${currentTab === "basic" ? "bg-gray-100 " : "bg-red-600 text-white"}`}
            onClick={() => {
              if (currentTab === "basic") {
                setNav(!showNav)
              } else {
                setCurrentTab("basic")
                !showNav && setNav(true)
              }
            }}
          >
            <FiBox className="w-5 h-5  group-hover:w-6 group-hover:h-6 transition-all" />
          </div>

          <div
            className={`w-full h-14 flex justify-center items-center group transition-all cursor-pointer ${currentTab === "settings" ? "bg-gray-100 " : "bg-sky-600 text-white"}`}
            onClick={() => {
              if (currentTab === "settings") {
                setNav(!showNav)
              } else {
                setCurrentTab("settings")
                !showNav && setNav(true)
              }
            }}
          >
            <IoSettingsOutline className="w-5 h-5  group-hover:w-6 group-hover:h-6 transition-all" />
          </div>

          <Link
            href="/dashboard/profile"
            className="flex flex-col items-center justify-center mb-3 mt-auto p-2 rounded-md border-white  hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer">
            <FaRegUser className="w-5 h-5 text-white" />
          </Link>
        </div>
        <Tabs
          value={currentTab}
          className={`fixed  pr-2 md:static h-full w-[220px] items-center pt-5 m-0 bg-gray-100 gap-2 shadow-md ${showNav ? "ml-[50px] md:ml-0" : "-ml-[280px] md:-ml-[220px]"} transition-all duration-300`}
        >
          <TabsContent value="basic" className="flex flex-col w-full m-0">
            <Link
              href="/dashboard"
              className={`w-full  h-10 flex justify-start items-center gap-3  group transition-all px-4 hover:bg-gray-200 ${pageId === "admin" ? "bg-gray-200" : ""}`}
              onClick={() => (width <= 768) ? setNav(false) : null}
            >
              <LuLayoutDashboard className="w-5 h-5 text-sky-800 group-hover:text-sky-600" />
              <p className="text-sm text-gray-800 ">TABLEAU DE BORD</p>
            </Link>
            <Collapsible className="w-full" open={collapsedStateList[0]} onOpenChange={(open) => setCollapsedStateList([open, collapsedStateList[1], collapsedStateList[2]])}>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <GiBuyCard className="w-5 h-5 text-green-800 " />
                  <p className=" text-sm text-gray-800">TRANSITION</p>
                </div>
                <FaAngleRight className={`h-4 w-4 text-gray-800 ${collapsedStateList[0] ? "transform rotate-90" : ""} transition-all`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/dashboard/orders"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4  hover:bg-gray-200 ${pageId === "orders" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaList className="w-5 h-5 text-green-800 group-hover:text-green-600" />
                  <p className="text-xs text-gray-800 ">LES COMMANDES</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="w-full CollapsibleContent" open={collapsedStateList[1]} onOpenChange={(open) => setCollapsedStateList([collapsedStateList[0], open, collapsedStateList[2]])}>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <FiBox className="w-5 h-5  text-red-800" />
                  <p className=" text-sm text-gray-800">STOCK</p>
                </div>
                <FaAngleRight className={`h-4 w-4 text-red text-gray-800 ${collapsedStateList[1] ? "transform rotate-90" : ""} transition-all`} />
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/dashboard/products"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4 hover:bg-gray-200  ${pageId === "products" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaBoxesStacked className="w-5 h-5 text-red-800 group-hover:text-red-600" />
                  <p className="text-xs  text-gray-800 ">PRODUITS</p>
                </Link>
                <Link
                  href="/dashboard/receptions"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4 hover:bg-gray-200 ${pageId === "receptions" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >

                  <FaTruckRampBox className="w-5 h-5 text-red-800 group-hover:text-red-600" />
                  <p className="text-xs  text-gray-800">RECEPTIONS</p>
                </Link>
                <Link
                  href="/dashboard/categories"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4  hover:bg-gray-200 ${pageId === "categories" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >

                  <MdCategory className="w-5 h-5 text-red-800 group-hover:text-red-600" />
                  <p className="text-xs  text-gray-800">CATEGORIES</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            {auth?.user?.role === 3 && (
              <Collapsible
                className="w-full"
                open={collapsedStateList[2]}
                onOpenChange={(open) => setCollapsedStateList([collapsedStateList[0], collapsedStateList[1], open])}
              >

                <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3 transition-all px-4">
                  <div className="flex items-center gap-3">
                    <FaUserFriends className="w-5 h-5 text-blue-800 group-hover:text-gray-900" />
                    <p className=" text-sm text-gray-800 group-hover:text-gray-900">UTILISATEURS</p>
                  </div>
                  <FaAngleRight className={`h-4 w-4 text-red text-gray-800 ${collapsedStateList[2] ? "transform rotate-90" : ""} transition-all`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 w-full flex flex-col">
                  <Link
                    href="/dashboard/employees"
                    className={`w-full pl-5 h-10 flex justify-start items-center gap-3 group hover:text-gray-200 transition-all px-4 hover:bg-gray-200 ${pageId === "employees" ? "bg-gray-200" : ""}`}
                    onClick={() => (width <= 768) ? setNav(false) : null}
                  >
                    <FaUserTie className="w-5 h-5 text-blue-800 group-hover:text-blue-600" />
                    <p className="text-xs  text-gray-800 ">EMPLOYÉES</p>
                  </Link>
                  <Link
                    href="/dashboard/clients"
                    className={`w-full pl-5 h-10 flex justify-start items-center gap-3 group hover:text-gray-200 transition-all px-4 hover:bg-gray-200 ${pageId === "clients" ? "bg-gray-200" : ""}`}
                    onClick={() => (width <= 768) ? setNav(false) : null}
                  >
                    <FaUsers className="w-5 h-5 text-blue-800 group-hover:text-blue-600" />
                    <p className="text-xs  text-gray-800 ">CLIENTS</p>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
