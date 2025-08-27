"use client"
import { DataTable } from "@/components/data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"


export type Player = {
    name: string
    email: string
    message: string
    createdAt:string
  }

export const columns: ColumnDef<Player>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey:"message",
      header:"Message"
    },
    {
      accessorKey:"createdAt",
      header:'Contact date'
    }
  ]

  
const ContactPage=({data}:any)=>{
    return(
        <div className="mt-4 mb-2">
            <p>Conatct Data List</p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default ContactPage