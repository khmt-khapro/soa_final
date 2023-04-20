const loginFields = [
  // Username
  {
    labelText: "Tên tài khoản",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeHolder: "Nhập tên tài khoản",
  },
  // Password
  {
    labelText: "Mật khẩu",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeHolder: "Nhập mật khẩu",
  },
];

const signupFields = [
  // Username
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeHolder: "Nhập email của bạn"
  },
  {
    labelText: "Mật khẩu",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeHolder: "Nhập mật khẩu",
  },
  {
    labelText: "Xác nhận mật khẩu",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeHolder: "Nhập xác nhận mật khẩu",
  },
];

const forgetPassField = [
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeHolder: "Nhập email mà bạn đã đăng ký"
  },
];

export { loginFields, signupFields, forgetPassField };
