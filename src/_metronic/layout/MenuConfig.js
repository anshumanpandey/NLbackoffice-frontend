export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      },
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      {
        title: "Users",
        root: true,
        alignment: "left",
        toggle: "click",
        submenu: [
          {
            title: "All",
            bullet: "line",
            page: "users"
          },
          {
            title: "Player",
            bullet: "line",
            page: "users/player"
          },
          {
            title: "Coach",
            bullet: "line",
            page: "users/coach"
          },
          {
            title: "Unverified User",
            bullet: "line",
            page: "users"
          },
        ]
      },
    ]
  }
};
