import React from 'react'

function EditProfile() {
  return (
    <div className='my-[32px] text-left mx-5'>
        <section>
          <h3 className='text-2xl font-medium mb-5'>Thông tin người dùng</h3>
          <div className='flex flex-col gap-y-2 mb-3'>
            <label htmlFor="name">Tên</label>
            <input type="text" name="name" id="name" className='px-2 py-1 rounded-md' placeholder='yourname'/>
          </div>
          <div className='flex flex-col gap-y-2 mb-3'>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" className='px-2 py-1 rounded-md' placeholder='email'/>
          </div>
          <div className='flex flex-col gap-y-2 mb-3'>
            <label htmlFor="username">Tên người dùng</label>
            <input type="text" name="username" id="username" className='px-2 py-1 rounded-md' placeholder='username'/>
          </div>
          <div className='flex flex-col gap-y-2 mb-3'>
            <label htmlFor="avatar">Ảnh đại diện</label>
            <div className='flex items-center gap-x-5'>
              <img src="/images/dev-icon.webp" alt="avatar" className='w-8 h-8 rounded-full'/>
              <input type="file" name="avatar" id="avatar" accept="image/*"/>
            </div>
          </div>
        </section>
    </div>
  )
}

export default EditProfile