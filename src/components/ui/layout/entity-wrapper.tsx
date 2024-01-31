import React from "react"
import { Button } from "../button";
import { Link } from "react-router-dom";

interface Props {
    children: React.ReactNode;
    title: string;
    description?: string;
    addBtnUrl?: string;
}

export default function EntityWrapper({ children, title, description, addBtnUrl }: Props) {
    return (
        <div className="mt-4">
            <header className="bg-foregroundSecondary px-5 py-3 mb-4 rounded-md border flex items-center justify-between">
                <div className="flex flex-col gap">
                    <h2 className=" font-medium text-3xl text-brand">{title}</h2>
                    <p className="text-muted-foreground text-sm mt-2">{description}</p>
                </div>
                {
                    addBtnUrl && <Button variant="brand" asChild>
                        <Link to={addBtnUrl}>
                            Add new
                        </Link>
                    </Button>
                }
            </header>
            <div className="bg-foregroundSecondary xl:p-10 lg:p-8 p-5 rounded-md border">
                {children}
            </div>
        </div >
    )
}
