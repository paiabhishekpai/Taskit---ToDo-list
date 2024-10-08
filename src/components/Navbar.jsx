import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between py-2 bg-orange-400 text-white">
      <div className="logo p-3">
        <span className="font-bold text-xl">TaskIt</span>
      </div>
      <ul className='flex gap-5 p-3'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your tasks</li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar
