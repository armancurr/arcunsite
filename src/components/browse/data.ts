import { Portfolio } from "./types";

export const portfolios: Portfolio[] = [
  {
    id: "p1",
    creator: "armancurr",
    imageSrc: "/1.avif",
    images: ["/1.avif", "/2.avif", "/3.avif"],
    siteUrl: "https://example.com/minimalist-product-design",
  },
];

export function getPortfolioById(id: string): Portfolio | undefined {
  return portfolios.find((p) => p.id === id);
}
