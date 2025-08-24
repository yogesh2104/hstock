"use client"

import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint"
import { ColumnDef } from "@tanstack/react-table"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { toast } from "sonner"

export type User = {
  name: string,
  email: string,
  companyName:string,
  phoneNumber:string,
  address:string,
  address2:string,
  city:string,
  state:string,
  country:string,
  pincode:string, 
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey:"companyName",
    header:"Company Name"
  },
  {
    accessorKey:"phoneNumber",
    header:"Phone Number"
  },
  {
    accessorKey:"address",
    header:"Address"
  },
  {
    accessorKey:"address2",
    header:"Address2"
  },
  {
    accessorKey:"city",
    header:"City"
  },
  {
    accessorKey:"state",
    header:"State"
  },
  {
    accessorKey:"country",
    header:"Country"
  },
  {
    accessorKey:"pincode",
    header:"Pin Code"
  },
  {
    accessorKey:"isActive",
    header:()=>{
      return(
        <div>Active</div>
      )
    },
    cell:({ row }:{ row:any })=>{
      const data = row?.original

      const handleDeactiveCode = async ()=>{
          const bData = {
            id:data?.id,
            active: !data?.active
          }
          try {
              const response = await fetch(`${BASE_URL}${API_ENDPOINT.alluserList}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bData),
              })
        
              if (response.ok) {
                  toast.success("Please refresh the page")
              } else {
                  toast.error("Failed to update")
              }
            } catch (error) {
              toast.error("Failed to update")
            }
      }

      return(
        <div>{data?.active == true ?<ToggleRight className="cursor-pointer" onClick={handleDeactiveCode}/>: <ToggleLeft className="cursor-pointer" onClick={handleDeactiveCode}/>}</div>
      )
    }
  },
]
