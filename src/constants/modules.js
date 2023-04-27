export const postModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", "normal", "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [
      {
        font: [],
      },
    ],
    [{ align: ["", "center", "right", "justify"] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }],
    [
      {
        color: [
          "red",
          "green",
          "blue",
          "yellow",
          "orange",
          "pink",
          "purple",
          "black",
        ],
      },
      {
        background: [
          "red",
          "green",
          "blue",
          "yellow",
          "orange",
          "pink",
          "purple",
          "black",
        ],
      },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export const commentModules = {
  toolbar: [
    ["image"],
  ]
};
