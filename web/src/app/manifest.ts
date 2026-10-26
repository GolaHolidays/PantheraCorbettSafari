import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Panthera Corbett Safari",
    short_name: "Panthera Corbett",
    description:
      "Official Jim Corbett Safari Booking Desk & Forest Rest House Stay Assistance — Ramnagar, Uttarakhand.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F0",
    theme_color: "#17211A",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
