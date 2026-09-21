import { z } from "zod";

export const CabVehicleCategorySchema = z.enum(["Sedan", "MUV", "SUV", "Tempo"]);

export const CabPriceRangeSchema = z.object({
  minPriceINR: z.number().int().min(0),
  maxPriceINR: z.number().int().min(0),
  priceDisplay: z.string().min(1),
  priceNote: z.string().min(1),
});

export const CabVehicleFareSchema = z.object({
  vehicleId: z.string().min(1),
  name: z.string().min(1),
  category: CabVehicleCategorySchema,
  seatingCapacity: z.number().int().positive(),
  capacityDisplay: z.string().min(1),
  luggageCapacity: z.string().min(1),
  priceRange: CabPriceRangeSchema,
  roundTripPriceRange: CabPriceRangeSchema.optional(),
  features: z.array(z.string().min(1)).optional(),
});

export const CabTransferRouteSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  fromLocation: z.string().min(1),
  toLocation: z.string().min(1),
  isBidirectional: z.boolean(),
  distanceKm: z.number().int().positive(),
  distanceDisplay: z.string().min(1),
  travelTimeDisplay: z.string().min(1),
  pickupPoints: z.array(z.string().min(1)).optional(),
  seasonalityNote: z.string().min(1),
  vehicles: z.array(CabVehicleFareSchema).min(1),
});

export const CabTransfersSchema = z.array(CabTransferRouteSchema).min(1);

export type CabVehicleCategory = z.infer<typeof CabVehicleCategorySchema>;
export type CabPriceRange = z.infer<typeof CabPriceRangeSchema>;
export type CabVehicleFare = z.infer<typeof CabVehicleFareSchema>;
export type CabTransferRoute = z.infer<typeof CabTransferRouteSchema>;
