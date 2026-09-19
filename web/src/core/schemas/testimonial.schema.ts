import { z } from "zod";

export const TestimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  safariZone: z.string().min(1),
  date: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(10),
  verified: z.boolean(),
  source: z.string().min(1),
});

export const TestimonialsSchema = z.array(TestimonialSchema).min(1);

export type Testimonial = z.infer<typeof TestimonialSchema>;
