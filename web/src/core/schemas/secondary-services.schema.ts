import { z } from "zod";

export const SecondaryServiceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  startingPriceINR: z.number().int().min(0),
  priceNote: z.string().min(1),
  vehicleOptions: z.array(z.string().min(1)).min(1),
  actionText: z.string().min(1),
});

export const SecondaryServicesDataSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  items: z.array(SecondaryServiceItemSchema).min(1),
});

export type SecondaryServiceItem = z.infer<typeof SecondaryServiceItemSchema>;
export type SecondaryServicesData = z.infer<typeof SecondaryServicesDataSchema>;
