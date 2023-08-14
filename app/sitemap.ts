import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dropbyte.org",
      lastModified: new Date(),
    },
  ];
}
