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
        page: "users",
        toggle: "click",
      },
      {
        title: "Bookings",
        root: true,
        alignment: "left",
        page: "bookings",
        toggle: "click",
      },
      {
        title: "Posts",
        root: true,
        alignment: "left",
        page: "posts",
        toggle: "click",
      },
      {
        title: "Review",
        root: true,
        alignment: "left",
        page: "reviews",
        toggle: "click",
      },
    ]
  }
};
