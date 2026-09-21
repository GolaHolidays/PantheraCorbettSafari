import { dataSourceClient } from "../client";
import type { BlogPost, BlogCategory } from "../../models";

export class BlogRepository {
  public static getAllPosts(): BlogPost[] {
    return dataSourceClient.getBlogPostsRaw();
  }

  public static getFeaturedPosts(): BlogPost[] {
    return this.getAllPosts().filter((p) => p.isFeatured);
  }

  public static getPostBySlug(slug: string): BlogPost | undefined {
    return this.getAllPosts().find((p) => p.slug === slug);
  }

  public static getPostsByCategory(category: BlogCategory): BlogPost[] {
    return this.getAllPosts().filter((p) => p.category === category);
  }

  public static getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
    const current = this.getPostBySlug(currentSlug);
    if (!current) return this.getAllPosts().slice(0, limit);

    // Same category first, then any other posts
    const sameCat = this.getAllPosts().filter(
      (p) => p.slug !== currentSlug && p.category === current.category
    );
    const other = this.getAllPosts().filter(
      (p) => p.slug !== currentSlug && p.category !== current.category
    );

    return [...sameCat, ...other].slice(0, limit);
  }

  public static getAvailableSlugs(): string[] {
    return this.getAllPosts().map((p) => p.slug);
  }

  public static getAllCategories(): BlogCategory[] {
    const cats = this.getAllPosts().map((p) => p.category);
    return [...new Set(cats)];
  }
}
