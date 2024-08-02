import { Typography } from '@/component/typogrphy'
import Image from 'next/image'
import React from 'react'
type GuideProps ={
    icon:string,
    number:string,
    header:string,
    body:string
}
export default function Guide(prop:GuideProps) {
    const {icon, number,header,body} = prop
  return (
    <div className='px-[24px] pt-[32px] pb-[40px] bg-custom-purple-transparent rounded-[24px] h-[324px] flex flex-col gap-[2rem]'>
        <div className='flex items-center justify-between'>
            <Image src={icon} alt={icon && `icon-${icon}`} height={40} width={40}/>
            <Typography variant="number" color="numberPurple" customClassName='font-Ubuntu'>
                {number}
            </Typography>
        </div>
        <div>
            <Typography variant="h4" color="fontBodyWhiteishColor" customClassName="font-Ubuntu" >
            {header}
            </Typography>
            <Typography variant="body-m" color="fontBodyRGreyishColor" customClassName='font-Ubuntu'>
                {body}
            </Typography>
        </div>
    </div>
  )
}
