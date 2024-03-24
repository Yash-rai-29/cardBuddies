import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
const initialNavigation = [
  { name: "Home", route: "/", current: false },
  { name: "Offers", route: "/offers", current: false },
  { name: "Add Card", route: "/add-card", current: false },
  { name: "Available Cards", route: "/avaiable-card", current: false },
  { name: "Chat", route: "/chat", current: false },
];
const avatarStyle = {
  backgroundColor: blue[500],
};

const userNavigation = [
  { name: "Your Profile", route: "/account/profile" },
  { name: "Settings", route: "/settings" },
  { name: "Sign out", route: "/sign-out" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(initialNavigation);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage
    const userDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("user")
    );

    // Set user details
    if (userDetailsFromLocalStorage) {
      const { displayName, email, imageUrl } = userDetailsFromLocalStorage;
      setUser({ displayName, email, imageUrl });
    }
    console.log("User details", user);
  }, []);

  const getFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    // Update navigation current state based on the current route
    const pathname = window.location.pathname; // Get the current pathname directly
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.route === pathname,
    }));
    setNavigation(updatedNavigation);
  }, []);
  return (
    <>
      <div className="min-h-min">
        <div className="bg-gray-700">
          <Disclosure as="nav" className="bg-black">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="border-b border-gray-600">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-36"
                            src="logo_card.png"
                            alt="logo"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.route}
                                activeClassName="bg-white text-black"
                                className={classNames(
                                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          {user && (
                            <Menu as="div" className="ml-3 relative">
                              <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <Avatar
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      ...avatarStyle,
                                    }}
                                  >
                                    {getFirstLetter(user.displayName)}
                                  </Avatar>
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <NavLink
                                          to={item.route}
                                          activeClassName="bg-gray-100"
                                          className={classNames(
                                            "block px-4 py-2 text-sm text-gray-700",
                                            { "bg-gray-100": active }
                                          )}
                                        >
                                          {item.name}
                                        </NavLink>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          )}
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="px-2 py-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.route}
                        activeClassName="bg-gray-900 text-white"
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  {user && (
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          {user.imageUrl ? (
                            <Avatar
                              alt={user.name}
                              src={user.imageUrl}
                              sx={{ width: 32, height: 32 }}
                            />
                          ) : (
                            <Avatar
                              sx={{ width: 32, height: 32, ...avatarStyle }}
                            >
                              {getFirstLetter(user.displayName)}
                            </Avatar>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.route}
                            activeClassName="bg-gray-700 text-white"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
}
