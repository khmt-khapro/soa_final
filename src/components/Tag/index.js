import React from 'react'
import Search from '../Search'
import Card from './Card'

function Tag() {
  return (
    <div className={`mx-auto w-[calc(100%-20px)] sm:w-[calc(50%-20px)] mt-[10px]`}>
        <div className='flex items-center justify-between mb-[10px]'>
            <p className='text-2xl font-bold text-emerald-700'>Thẻ hàng đầu</p>
            <Search placeHolder="Nhập thẻ cần tìm!" customClass="w-[200px]"/>
        </div>
        <Card />
    </div>
  )
}

export default Tag