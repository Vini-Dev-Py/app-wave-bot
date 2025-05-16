import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    const savedState = localStorage.getItem("wavebot-sidebar-open");
    if (savedState !== null) {
      setOpenSidebar(savedState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !openSidebar;
    setOpenSidebar(newState);
    localStorage.setItem("wavebot-sidebar-open", newState.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem("app-wavebot-user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Itens = [
    { text: "Home", icon: "pi pi-home", to: "/" },
    { text: "Contatos", icon: "pi pi-users", to: "/contacts" },
    { text: "Fluxos", icon: "pi pi-forward", to: "/flows" },
    { text: "Configurações", icon: "pi pi-cog", to: "/configs" },
  ];

  return (
    <div className="bg-white border-r-2 border-light-gray flex">
      <div className="flex-col flex flex-1">
        <motion.div
          animate={{ width: openSidebar ? "16rem" : "5rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white lg:flex md:flex-col overflow-hidden flex-1"
        >
          <div className="flex flex-1 flex-col py-5 overflow-hidden">
            <div className="h-full flex-col justify-between px-2 flex">
              <div className="space-y-4 px-2">
                <div className={twMerge("flex items-center", openSidebar ? "justify-between" : "justify-center")}>
                  <motion.div 
                    animate={{ opacity: openSidebar ? 1 : 0, x: openSidebar ? 0 : -20 }}
                    transition={{ duration: 0.2 }}
                    className={twMerge("text-2xl font-medium", openSidebar ? "" : "hidden")}
                  >
                    WaveBot
                  </motion.div>
                  <Button
                    icon={openSidebar ? "pi pi-angle-left text-xl" : "pi pi-bars text-xl"}
                    className="p-button-rounded p-button-text p-button-plain text-black"
                    onClick={toggleSidebar}
                  />
                </div>
                <div className="bg-top bg-cover space-y-1">
                  <ul className="flex items-start w-full flex-col list-none p-0 m-0">
                    {Itens.map((item, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={twMerge("flex items-center p-2.5 rounded-lg hover:bg-gray-200 w-full")}
                      >
                        <Link to={item.to} className="font-medium text-sm text-gray-900 flex items-center justify-center transition-all group cursor-pointer w-full">
                          <i className={twMerge(item.icon, "text-xl")} />
                          {openSidebar && (
                            <motion.span transition={{ duration: 0.2 }} className="ml-4">{item.text}</motion.span>
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relativo bottom-0 space-y-1 px-2">
                <ul className="flex flex-col list-none p-0 m-0">
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={twMerge("flex items-center py-2.5 rounded-lg hover:bg-gray-200 px-4")}
                    onClick={handleLogout}
                  >
                    <div className="font-medium text-sm text-gray-900 flex items-center transition-all duration-200 group cursor-pointer">
                      <i className="text-xl pi pi-sign-out" />
                      {openSidebar && (
                        <motion.span transition={{ duration: 0.2 }} className="ml-4">Logout</motion.span>
                      )}
                    </div>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
