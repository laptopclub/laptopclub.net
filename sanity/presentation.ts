import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    page: defineLocations({
      select: {
        slug: "slug.current",
        title: "title"
      },
      resolve: (doc) => ({
        locations: [
          {
            href: doc?.slug === "home" ? "/" : `/${doc?.slug ?? ""}`,
            title: doc?.title ?? "Untitled page"
          }
        ]
      })
    }),
    siteSettings: defineLocations({
      select: {
        title: "title"
      },
      resolve: (doc) => ({
        locations: [
          {
            href: "/",
            title: doc?.title ?? "Site settings"
          }
        ]
      })
    })
  }
};
