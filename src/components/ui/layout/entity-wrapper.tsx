import React from "react"

interface Props {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export default function EntityWrapper({ children, title, description }: Props) {
    return (
        <div className="mt-4">
            <header className="bg-foregroundSecondary px-5 py-3 mb-4 rounded-md border">
                <h2 className=" font-medium text-3xl text-brand">{title}</h2>
                <p className="text-muted-foreground text-sm mt-2">{description}</p>
            </header>
            <div className="bg-foregroundSecondary xl:p-10 lg:p-8 p-5 rounded-md border">
                {children}
            </div>
        </div >
    )
}
