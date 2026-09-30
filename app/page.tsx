import { homePageQuery } from "@laptopclub/foundation-cms/queries";
import { BlockRenderer, type PageBlock } from "@laptopclub/foundation-ui";
import type { Metadata } from "next";
import type { PageBySlugQueryResult } from "../lib/sanity-query-types";
import { siteBlockRegistry } from "../lib/blocks";
import { env } from "../lib/env";
import { sanityFetch } from "../lib/live";
import { getSiteSettings } from "../lib/site";

type PageData = NonNullable<PageBySlugQueryResult>;

const fallbackBlocks: PageBlock[] = [
  {
    _type: "heroBlock",
    eyebrow: "Laptop Club",
    title: "A practical home for better websites",
    body: "We are setting up the new Laptop Club site on Foundation, our reusable Next.js and Sanity framework.",
    cta: { label: "Open Studio", href: "/studio" }
  }
];

async function getHomePage({ stega = true }: { stega?: boolean } = {}): Promise<PageData | null> {
  if (!env.sanity.isConfigured) {
    return null;
  }

  try {
    const { data } = await sanityFetch({ query: homePageQuery, stega });
    return data as PageBySlugQueryResult;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getHomePage({ stega: false }), getSiteSettings({ stega: false })]);

  return {
    description: page?.seo?.description ?? site.description,
    robots: page?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: page?.seo?.title ?? page?.title ?? site.title
  };
}

export default async function HomePage() {
  const page = await getHomePage();
  const imageConfig = { dataset: env.sanity.dataset, projectId: env.sanity.projectId };

  return (
    <BlockRenderer
      blocks={page?.blocks?.length ? (page.blocks as PageBlock[]) : fallbackBlocks}
      imageConfig={imageConfig}
      registry={siteBlockRegistry}
    />
  );
}
