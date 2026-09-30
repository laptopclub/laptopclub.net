import { siteSettingsQuery } from "@laptopclub/foundation-cms/queries";
import type { SiteChrome } from "@laptopclub/foundation-ui";
import type { SiteSettingsQueryResult } from "./sanity-query-types";
import { env } from "./env";
import { sanityFetch } from "./live";

export type SiteSettings = SiteChrome & {
  description?: string;
};

export const fallbackSiteSettings: SiteSettings = {
  description: "The home of Laptop Club.",
  footerNavigation: [],
  logoText: env.siteName,
  primaryNavigation: [],
  title: env.siteName
};

function normalizeNavigation(navigation: NonNullable<SiteSettingsQueryResult>["primaryNavigation"]): SiteSettings["primaryNavigation"] {
  return (navigation ?? []).flatMap((link) => {
    if (!link.href || !link.label) {
      return [];
    }

    return [{ href: link.href, label: link.label, openInNewTab: link.openInNewTab ?? undefined }];
  });
}

function normalizeSiteSettings(settings: SiteSettingsQueryResult): SiteSettings {
  if (!settings?.title) {
    return fallbackSiteSettings;
  }

  return {
    description: settings.description ?? fallbackSiteSettings.description,
    footerNavigation: normalizeNavigation(settings.footerNavigation),
    logoText: settings.logoText ?? settings.title,
    primaryNavigation: normalizeNavigation(settings.primaryNavigation),
    title: settings.title
  };
}

export async function getSiteSettings({ stega = true }: { stega?: boolean } = {}): Promise<SiteSettings> {
  if (!env.sanity.isConfigured) {
    return fallbackSiteSettings;
  }

  try {
    const { data: settings } = await sanityFetch({ query: siteSettingsQuery, stega });
    return normalizeSiteSettings(settings as SiteSettingsQueryResult);
  } catch {
    return fallbackSiteSettings;
  }
}
