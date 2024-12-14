//@ts-nocheck
"use client"

import { cn } from "@/lib/utils"

export const Item=({label,icon:Icon,active,level=0,isMenu=true,onClickFn})=>{
    
    return(
        <div className={cn(isMenu != true && 'ml-2 mr-2')}>
            <div className={cn("cursor-pointer group main-h-[27px] text-pmsmenutext text-sm py-2 w-full hover:bg-card hover:text-white mb-2 rounded-md flex items-center font-medium", active && "bg-card text-white")} style={{paddingLeft:level ? `${(level*12)+12}px`:"12px"}}>
                <Icon className={cn("shrink-0 h-[18px] w-[18px] mr-2 text-pmsicontext group-hover:text-white", active && "text-white")} />
                <span className="truncate" onClick={onClickFn}>{label}</span>
            </div>
        </div>
    )

}