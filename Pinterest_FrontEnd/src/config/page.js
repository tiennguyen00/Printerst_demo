import map from "lodash/map";
const PinterestScreens = [
  {
    name: "HOME",
    path: "/home",
    component: "HomePage",
  },
  {
    name: "PROFILE",
    path: "/profile",
    component: "Profile",
  },
  {
    name: "VERIFY",
    path: "/verify",
    component: "Verify",
  },
  {
    name: "PROFILE",
    path: "/profile",
    component: "Profile",
  },
  {
    name: "DETAIL",
    path: "/detail",
    component: "Detail",
  },
];

const PinterestScreenRight = [
  {
    name: "Setting",
    path: "/setting",
    component: "Setting",
  },
  {
    name: "Help",
    path: "/help",
    component: "Help",
  },
  {
    name: "Sign out",
    path: "/signout",
    component: "",
  },
];

const pagesHasPermission = [...PinterestScreens];
const pagesHasNoPermission = [];

const routesWithRoles = {
  admin: map(PinterestScreens, "path"),
};

export {
  pagesHasPermission,
  pagesHasNoPermission,
  routesWithRoles,
  PinterestScreenRight,
};
