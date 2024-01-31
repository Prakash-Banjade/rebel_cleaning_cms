import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";

interface DropDownItem {
    element: React.ReactNode;
}

interface Props {
    trigger: React.ReactNode | string;
    menuItems: DropDownItem[];
    header?: string;
}

export default function CustomDropDown({ trigger, menuItems, header }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={typeof trigger !== 'string'}>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    header && <>
                        <DropdownMenuLabel>{header}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                }

                {
                    menuItems.map((item, index) => (
                        <DropdownMenuItem key={index}>{item.element}</DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}