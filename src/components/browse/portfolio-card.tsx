"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Portfolio } from "./types";

interface PortfolioCardProps {
  item: Portfolio;
}

function PortfolioCardComponent({ item }: PortfolioCardProps) {
  return (
    <Link
      href={`/browse/${item.id}`}
      className="group relative overflow-hidden rounded-xl border border-neutral-900 bg-black transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-900/20"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={`${item.creator}'s portfolio cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h4 className="text-base text-neutral-100">{item.creator}</h4>
      </div>
    </Link>
  );
}

const PortfolioCard = memo(PortfolioCardComponent);
export default PortfolioCard;
