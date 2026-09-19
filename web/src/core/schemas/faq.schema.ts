import { z } from "zod";

export const FaqItemSchema = z.object({
  category: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const FaqsSchema = z.array(FaqItemSchema).min(1);

export type FaqItem = z.infer<typeof FaqItemSchema>;
