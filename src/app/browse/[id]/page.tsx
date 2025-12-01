import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/header";
import { portfolios, getPortfolioById } from "@/components/browse/data";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolios.map((p) => ({ id: p.id }));
}

export default async function PortfolioPage({ params }: PageProps) {
  const { id } = await params;
  const portfolio = getPortfolioById(id);

  if (!portfolio) {
    return (
      <div>
        <Header />
        <div className="pt-18 pb-18">
          <div className="max-w-6xl mx-auto px-8">
            <div className="p-2 border border-neutral-900 rounded-2xl space-y-2">
              <div className="p-8 border border-neutral-900 rounded-2xl space-y-2">
                <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
                  Not found
                </h1>
                <p className="text-sm text-neutral-400 max-w-2xl">
                  The requested portfolio does not exist.
                </p>
              </div>
              <div className="p-4 md:p-8 border border-neutral-900 rounded-2xl">
                <Button asChild size="sm">
                  <Link href="/browse">Back to Browse</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const gallery = Array.from(
    new Set([portfolio.imageSrc, ...(portfolio.images ?? [])]),
  );

  return (
    <div>
      <Header />
      <div className="pt-18 pb-18">
        <div className="max-w-6xl mx-auto px-8">
          <div className="p-2 border border-neutral-900 rounded-2xl space-y-2">
            <div className="p-8 border border-neutral-900 rounded-2xl space-y-2">
              <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
                Portfolio
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl">
                {portfolio.creator}
              </p>
            </div>

            <div className="p-4 md:p-8 border border-neutral-900 rounded-2xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-neutral-900">
                    <Image
                      src={portfolio.imageSrc}
                      alt={`${portfolio.creator}'s portfolio cover`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {gallery.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {gallery.slice(1).map((img) => (
                        <div
                          key={img}
                          className="relative w-full aspect-square overflow-hidden rounded-lg border border-neutral-900"
                        >
                          <Image src={img} alt="Gallery image" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-base text-neutral-100">{portfolio.creator}</h2>
                  </div>
                  <div className="h-px bg-neutral-900" />
                  <div className="grid grid-cols-1 gap-3">
                    <Button asChild size="sm" variant="secondary">
                      <a href={`/api/portfolios/${id}/download`}>
                        Download ZIP
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a
                        href={portfolio.siteUrl ?? "#"}
                        target={portfolio.siteUrl ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        View live site
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/browse">Back to Browse</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
