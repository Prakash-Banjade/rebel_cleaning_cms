import { z } from "zod";

export const ContactSchema = z.object({
    email: z.string().email().nullish(),
    address: z.string().nullish(),
    phone: z.array(z.string()).nullish(),
    facebook: z.string().url().nullish(),
    instagram: z.string().url().nullish(),
    twitter: z.string().url().nullish(),
    linkedIn: z.string().url().nullish(),
    website: z.string().url().nullish(),
}).partial()
export type ContactSchemaType = z.infer<typeof ContactSchema>

export const ContactArraySchema = z.array(ContactSchema)
export type ContactArrayType = z.infer<typeof ContactArraySchema>


export const ContactFormSchema = z.object({ // this separate schema is for contact form, the field values won't accept null values so created separated omitting nullable chaining
    email: z.string().email({ message: "Please enter a valid email" }).optional().or(z.literal('')), // .or() is used because the .optional() worn't work due to strict types like .email(), .url()
    address: z.string().optional(),
    phone: z.array(
        z.object({
            value: z.string().optional(),
        })
    ).optional(),
    facebook: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    instagram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    linkedIn: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
}).partial()

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>
export const contactFormInitialValues: ContactFormSchemaType = {
    email: undefined,
    address: undefined,
    phone: [{ value: '' }],
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    linkedIn: undefined,
    website: undefined,
}

const ContactSchemaWithOutPhone = ContactFormSchema.omit({ phone: true }) // omitting phone is because while mapping, react-hook-form creates problem for not accepting the array as direct value

type FormFieldType = { // this is just to match the shadcn ui form type with custom form fields name type
    name: keyof z.infer<typeof ContactSchemaWithOutPhone>,
    type: string,
    placeholder: string,
    label: string,
}

export const contactFormFields: FormFieldType[] = [
    {
        name: 'email',
        type: 'email',
        placeholder: 'your_company_email@something.com',
        label: 'Email',
    },
    {
        name: 'address',
        type: 'text',
        placeholder: 'your_company_address',
        label: 'Address',
    },
    // {
    //     name: 'phone',
    //     type: 'text',
    //     placeholder: 'your_company_phone',
    //     label: 'Phone',
    // },
    {
        name: 'facebook',
        type: 'text',
        placeholder: 'A valid link to facebook',
        label: 'Facebook',
    },
    {
        name: 'instagram',
        type: 'text',
        placeholder: 'A valid link to instagram',
        label: 'Instagram',
    },
    {
        name: 'linkedIn',
        type: 'text',
        placeholder: 'A valid link to linkedIn',
        label: 'LinkedIn',
    },
    {
        name: 'twitter',
        type: 'text',
        placeholder: 'A valid link to twitter',
        label: 'Twitter',
    },
    {
        name: 'website',
        type: 'text',
        placeholder: 'A valid link to website',
        label: 'Website',
    },
]