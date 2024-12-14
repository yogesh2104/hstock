"use client"

import { ColumnDef } from "@tanstack/react-table"

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
]
