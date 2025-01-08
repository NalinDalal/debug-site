"use client";

import * as React from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown, MoreHorizontal, Option} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export interface Disco {
    id: string | null;
    username: string | null;
    email: string | null;
    isRequestSent: boolean;
    isAccepted: boolean;
    isDeclined: boolean;
    isMember: boolean;
    createdAt: string | null;
}

export interface TableDataProps {
    data: Disco[];
}

export const columns: ColumnDef<Disco>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className={"border-gray-400 aria-checked:border-white"}
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                // change the border color of the box
                className={"border-gray-400 aria-checked:border-white"}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: ({column}) => (
            <Button
                variant="ghost"
                className={"capitalize my-1"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Username <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => <div className="capitalize">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "email",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "isMember",
        header: "Membership Status",
        cell: ({row}) => (
            <div>{row.getValue("isMember") ? "Member" : "Non-member"}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) => {
            const date: Date = row.getValue("createdAt");
            return <div>{date ? new Date(date).toLocaleDateString("en-US"
                , {
                    // dateStyle: "medium",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }) : "N/A"}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const disco = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-700">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal color={"white"}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={"bg-gray-900 text-white"}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className={"mx-auto"}/>
                        <DropdownMenuItem
                            onClick={async () => {
                                await navigator.clipboard.writeText(disco.id || "")
                                toast({
                                    title: "ID copied",
                                    description: `ID: ${disco.id}`,
                                    duration: 5000,
                                    className: "bg-green-500 text-white",
                                    action: (
                                        <ToastAction altText={"close"}
                                                     className={"bg-white text-green-500 hover:bg-green-500 hover:text-white"}>Close</ToastAction>
                                    ),
                                })
                            }}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"hover:!bg-red-500"}>
                            Accept
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTable({data}: TableDataProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pageSize, setPageSize] = React.useState(10); // Default page size
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        pageCount: Math.ceil(data.length / pageSize),
        manualPagination: false,
        initialState: {
            pagination: {
                pageSize,
                pageIndex: 0,

            }
        }
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by email..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-gray-900 text-white">
                            Columns <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={"bg-gray-900 text-white"}>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize text-sm font-normal "
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={"hover:bg-gray-900"}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`hover:bg-gray-900 hover:text-white cursor-pointer transition-colors duration-200 ease-in-out ${
                                        row.getIsSelected()
                                            ? "!bg-gray-900 !text-white hover:!bg-gray-800 hover:!text-white"
                                            : "hover:!bg-gray-900 hover:!text-white"
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Rows per page:</span>
                    <Select
                        onValueChange={(value) => {
                            const newSize = parseInt(value, 10);
                            setPageSize(newSize);
                            table.setPageSize(newSize);
                        }}
                        disabled={table.getRowModel().rows.length === 0}
                    >
                        <SelectTrigger className={"w-[4rem]"}>
                            <SelectValue
                                placeholder={"10"}/>
                        </SelectTrigger>
                        <SelectContent className={"bg-gray-900 text-white"}>
                            <SelectGroup>
                                <SelectLabel>Page Size</SelectLabel>
                                {[5, 10, 20, 30].map((size, index) => (
                                    <SelectItem key={index} value={String(size)}>{size}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-x-2 flex justify-center items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={"capitalize bg-gray-900 disabled:bg-gray-900 text-white disabled:text-gray-300 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed"}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={"capitalize bg-gray-900 disabled:bg-gray-900 text-white disabled:text-gray-300 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                    <div className="text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                </div>
            </div>
        </div>
    );
}
