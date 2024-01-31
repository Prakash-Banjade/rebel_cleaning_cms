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
    type?: 'dialog' | 'link' | 'button';
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
            <DropdownMenuContent side="left" align="start">
                {
                    header && <>
                        <DropdownMenuLabel>{header}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                }

                {
                    menuItems.map((item, index) => (
                        item.type === 'dialog' ? <div key={index}>{item.element}</div> :
                            <DropdownMenuItem key={index} role="button" className="hover:bg-slate-100">{item.element}</DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}