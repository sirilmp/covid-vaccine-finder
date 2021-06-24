import { HashtagIcon} from '@heroicons/react/solid'
import React from 'react'

function Footer() {
    const closeTag="</>"
    const openTag='<>'
    return (
        <div className='grid place-items-center bg-gray-100 '>
            <p className='p-2 font-mono'>Developed by : <a className='hover:text-iconColor-lightGreen footer_font transform translate duration-150' href="https://sirilmp.online/"> siril m p</a> </p>
        </div>
    )
}

export default Footer
