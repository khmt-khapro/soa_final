const leftSideBar = [
  {
    id: 0,
    name: "Trang chủ",
    image: <i className="fa-sharp fa-solid fa-house"></i>,
    path: "/",
  },
  {
    id: 1,
    name: "Xem sau",
    image: <i className="fa-sharp fa-solid fa-book"></i>,
    path: "reading-list",
  },
  {
    id: 2,
    name: "Thẻ",
    image: <i className="fa-sharp fa-solid fa-tags"></i>,
    path: "tag",
  },
];

const rightSideBar = [
  {
    id: 0,
    name: "Trang chủ",
    image: <i className="fa-sharp fa-solid fa-house"></i>,
  },
  {
    id: 1,
    name: "Xem sau",
    image: <i className="fa-sharp fa-solid fa-book"></i>,
  },
  { id: 2, name: "Thẻ", image: <i className="fa-sharp fa-solid fa-tags"></i> },
];

const singleSideBar = [
  {
    id: 0,
    name: "Trang cá nhân",
    image: <i className="fa-solid fa-user"></i>,
    path: 'edit-profile'
  },
  {
    id: 1,
    name: "Thiết lập",
    image: <i className="fa-solid fa-gear"></i>,
    path: 'custom'
  },
]

export { leftSideBar, rightSideBar, singleSideBar };
