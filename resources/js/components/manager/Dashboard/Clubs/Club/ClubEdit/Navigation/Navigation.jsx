import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function Navigation({selectedSection, setSelectedSection, navigation}) {
    

  return (
    <div className="bg-gray-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <button 
                key={item.name} 
                href={item.href} 
                className={clsx(
                  'font-semibold leading-6',
                  {
                    'text-white text-base': selectedSection === item.name,
                    'text-gray-600 text-sm': selectedSection !== item.name
                  }
                )} // выбираем стиль текста в зависимости от состояния выбранного элемента
                onClick={() => setSelectedSection(item.name === selectedSection ? null : item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>   
        </div>
      </nav>
    </div>
  )
}