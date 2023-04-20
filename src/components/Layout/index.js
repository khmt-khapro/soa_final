import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Link to="/">Trang chủ</Link>
        <Link to="/signin">Đăng nhập</Link>
        <Link to="/signup">Đăng ký</Link>
        {/* <Outlet/> */}
    </div>
  )
}

export default Layout