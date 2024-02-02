import EntityWrapper from "@/components/ui/layout/entity-wrapper"
import { getContact } from "@/lib/queryFns"
import { useQuery } from "@tanstack/react-query"

export type Contact = {
    phone?: string[],
    email?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    address?: string;
    linkedIn?: string;
    website?: string;
}

const urlKeys = ['website', 'linkedIn', 'twitter', 'instagram', 'facebook']

export default function ContactPage() {

    const { data, isPending } = useQuery({
        queryKey: ['contact'],
        queryFn: () => getContact()
    })

    if (isPending) return <h1 className="text-2xl p-5">Loading...</h1>

    const formType = data?.length? 'edit' : 'new'

    if (!data || !data?.length) return <p className="italic text-muted-foreground text-center">** You haven&apos;t added any contact details yet. **</p>

    return (
        <EntityWrapper title="Contact" description="Your contacts on your site." addBtnUrl={'form?type=' + formType} addBtnLabel={formType + ' contact'} >
            <div className="flex flex-col gap-5">
                {
                    Object.entries(data[0]).map(([key, value], index) => (
                        value && <section className="flex flex-col gap-1 w-fit" key={index}>
                            <h3 className="text-muted-foreground font-medium capitalize">{key}</h3>
                            {
                                urlKeys.includes(key) ? (
                                    <a href={value as string} className="text-blue-600">{value instanceof Array ? value.join(', ') : value}</a>
                                ) : (
                                    <p className="">{value instanceof Array ? value.join(', ') : value}</p>
                                )
                            }
                        </section>
                    ))
                }
            </div>
        </EntityWrapper>
    )
}
