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


const parsePageId = (path: string) => path.substring(path.lastIndexOf('/') + 1)



export function MainNav({ showNav, setNav }: { showNav: boolean, setNav: (value: boolean) => void }) {
  const pageId = parsePageId(window.location.pathname)
  const { height, width } = useWindowDimensions();
  const [currentTab, setCurrentTab] = useState("basic");
  console.log(width)
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

          <div className="flex flex-col items-center justify-center mb-3 mt-auto p-3  border-white  hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer">
            <FaRegUser className="w-5 h-5 text-white" />
          </div>
        </div>
        <Tabs
          value={currentTab}
          className={`fixed ml-[50px] md:ml-0 md:static h-full w-[220px] items-center pt-5 m-0 bg-gray-100 gap-2 shadow-md ${showNav ? "" : "-ml-[280px] md:-ml-[220px]"} transition-all duration-300`}
        >
          <TabsContent value="basic" className="flex flex-col w-full m-0">
            <Collapsible className="w-full" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <GiBuyCard className="w-5 h-5 text-orange-800 " />
                  <p className=" text-sm text-gray-800">TRANSITION</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-gray-800" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/orders"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4 ${pageId === "orders" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaList className="w-5 h-5 text-orange-800 group-hover:text-orange-600" />
                  <p className="text-xs text-gray-800 ">LES COMMANDES</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="w-full CollapsibleContent" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3   transition-all px-4">
                <div className="flex items-center gap-3">
                  <FiBox className="w-5 h-5  text-red-800" />
                  <p className=" text-sm text-gray-800">STOCK</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-red text-gray-800" />
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/products"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4  ${pageId === "products" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaBoxesStacked className="w-5 h-5 text-red-800 group-hover:text-red-600" />
                  <p className="text-xs  text-gray-800 ">PRODUITS</p>
                </Link>
                <Link
                  href="/admin/receptions"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3  group transition-all px-4" ${pageId === "receptions" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >

                  <FaTruckRampBox className="w-5 h-5 text-red-600" />
                  <p className="text-xs  text-gray-800">RECEPTIONS</p>
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="w-full" defaultOpen>
              <CollapsibleTrigger className="w-full h-10 flex justify-between items-center gap-3 transition-all px-4">
                <div className="flex items-center gap-3">
                  <FaUserFriends className="w-5 h-5 text-blue-800 group-hover:text-gray-900" />
                  <p className=" text-sm text-gray-800 group-hover:text-gray-900">UTILISATEURS</p>
                </div>
                <FaAngleRight className="h-4 w-4 text-red text-gray-800" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 w-full flex flex-col">
                <Link
                  href="/admin/employes"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3 group hover:text-gray-200 transition-all px-4" ${pageId === "employes" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaUserTie className="w-5 h-5 text-blue-800 group-hover:text-blue-600" />
                  <p className="text-xs  text-gray-800 ">EMPLOYÉES</p>
                </Link>
                <Link
                  href="/admin/clients"
                  className={`w-full pl-5 h-10 flex justify-start items-center gap-3 group hover:text-gray-200 transition-all px-4" ${pageId === "clients" ? "bg-gray-200" : ""}`}
                  onClick={() => (width <= 768) ? setNav(false) : null}
                >
                  <FaUsers className="w-5 h-5 text-blue-800 group-hover:text-blue-600" />
                  <p className="text-xs  text-gray-800 ">CLIENTS</p>
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
