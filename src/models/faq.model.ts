import { z } from "zod";
import { BaseModelSchema } from "./base.model";

export const FaqSchema = z.object({
    question: z.string({ required_error: 'Questoion is required' }),
    answer: z.string({ required_error: 'Answer is required' })
});
export type Faq = z.infer<typeof FaqSchema>

export const FaqSchemaWithBaseModel = FaqSchema.merge(BaseModelSchema);
export type FaqWithBaseModel = z.infer<typeof FaqSchemaWithBaseModel>

export const FaqArraySchemaWithBaseModel = z.array(FaqSchemaWithBaseModel)
export type FaqArrayWithBaseModel = z.infer<typeof FaqArraySchemaWithBaseModel>

export const faqInitialFormValues: Faq = {
    answer: '',
    question: ''
}