import { dataSourceClient } from "../client";
import type { Testimonial } from "../../models";

export class TestimonialRepository {
  public static getAll(): Testimonial[] {
    return dataSourceClient.getTestimonialsRaw();
  }

  public static getTopTestimonials(limit = 4): Testimonial[] {
    return this.getAll().slice(0, limit);
  }
}
