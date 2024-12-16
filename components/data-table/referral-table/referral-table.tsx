"use client"

import React, { useState } from "react"
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface DataTableProps<TData, TValue> {
  data: TData[]
}

export function ReferralDataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const [openAdd,setOpenAdd] = useState(false) 
    const [code,setCode] = useState("")
    const [discount,setDiscount] = useState<string | number>(0)
    
    const route = useRouter()

    const handleDeactiveCode = async (code:string)=>{
        const bData = {
            code
        }
        try {
            const response = await fetch(`${BASE_URL}${API_ENDPOINT.getAllCode}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bData),
            })
      
            if (response.ok) {
                route.refresh()
            } else {
                route.refresh()
            }
          } catch (error) {
            route.refresh()
          }
    }

    const codeColumn=[
        {
        accessorKey: "code",
        header: "Referral Code",
        },
        {
        accessorKey: "discount",
        header: "Discount",
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
            return(
            <div>{data?.isActive == true ?<ToggleRight className="cursor-pointer" onClick={()=>handleDeactiveCode(data?.code)} />: <ToggleLeft className="cursor-pointer" onClick={()=>handleDeactiveCode(data?.code)} />}</div>
            )
        }
        },
    ]

    const table = useReactTable({
        data,
        columns:codeColumn,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        columnFilters,
        },
    })

    const handleCreateCode= async ()=>{
        if(code && discount){
            const bodyData={
                "code":code,
                "discount":Number(discount)
            }
    
            try {
                const response = await fetch(`${BASE_URL}${API_ENDPOINT.createCode}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bodyData),
                })
          
                setOpenAdd(false)
                if (response.ok) {
                    route.refresh()
                } else {
                    route.refresh()
                }
              } catch (error) {
                route.refresh()
            }
        }else{
            toast.error("Please Enter Code and Discound.")
        }
    }

    return (
        <>
            <div className="flex justify-end mb-3">
                <Button onClick={()=>setOpenAdd(true)}>Create Referral </Button>
            </div>
            <div className="rounded-md">
                <Table className="border">
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id} className="border ">
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="border">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={codeColumn?.length} className="h-24 text-center border">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-3">
                <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length} row(s).
                </div>
                <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
                </div>
            </div>

            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Referral Code</DialogTitle>
                    </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label htmlFor="name" className="">Code</Label>
                                <Input id="name" value={code} onChange={(e)=>setCode(e.target.value)} className="col-span-3" />
                            </div>

                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label htmlFor="username" className="">Discount</Label>
                                <Input id="username" value={discount} onChange={(e)=>setDiscount(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <div className="text-center">
                            <Button onClick={handleCreateCode}>Save changes</Button>
                        </div>
                </DialogContent>
            </Dialog>

        </>
    )
}
