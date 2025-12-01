"use client";

import Header from "@/components/shared/header";
import PortfolioCard from "@/components/browse/portfolio-card";
import { portfolios } from "@/components/browse/data";
import type { Portfolio } from "@/components/browse/types";

export default function AppPage() {
  return (
    <div>
      <Header />
      <div className="pt-18 pb-18">
        <div className="max-w-6xl mx-auto px-8">
          <div className="p-2 border border-neutral-900 rounded-2xl space-y-2">
            <div className="p-8 border border-neutral-900 rounded-2xl space-y-2">
              <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
                Browse
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl">
                Explore exceptional portfolios contributed by the community.
              </p>
            </div>

            <div className="p-4 md:p-8 border border-neutral-900 rounded-2xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {portfolios.map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    item={portfolio as Portfolio}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
