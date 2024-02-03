import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"


interface CustomAccordionProps {
    title: React.ReactNode;
    content: React.ReactNode;
}

export default function CustomAccordion({ content, title }: CustomAccordionProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    {content}
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}
