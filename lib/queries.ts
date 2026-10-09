import { allPageSlugsQuery, sitemapPagesQuery } from "@laptopclub/foundation-cms/queries";
import { groq } from "next-sanity";

const imageFields = groq`{
  ...,
  asset->{
    _id,
    metadata{
      dimensions{
        aspectRatio,
        height,
        width
      },
      lqip
    }
  }
}`;

const linkFields = groq`{
  label,
  openInNewTab,
  variant,
  "href": select(
    page->_id == "page.home" || page->slug.current == "home" => "/",
    defined(page->slug.current) => "/" + page->slug.current,
    href
  )
}`;

const portableContentFields = groq`[]{
  ...,
  _type == "imageWithAlt" => ${imageFields},
  _type == "portableImage" => ${imageFields},
  _type == "contentAction" => {
    ...,
    action ${linkFields}
  },
  markDefs[]{
    ...,
    _type == "internalLink" => {
      openInNewTab,
      "href": select(
        page->_id == "page.home" || page->slug.current == "home" => "/",
        defined(page->slug.current) => "/" + page->slug.current
      )
    }
  }
}`;

const pageFields = groq`{
  title,
  "slug": select(_id == "page.home" => "home", slug.current),
  seo,
  blocks[]{
    ...,
    cta ${linkFields},
    primaryAction ${linkFields},
    secondaryAction ${linkFields},
    action ${linkFields},
    ctaItems[]{
      ...,
      buttons[] ${linkFields},
      links[] ${linkFields}
    },
    image ${imageFields},
    avatar ${imageFields},
    features[]{
      ...,
      image ${imageFields}
    },
    images[] ${imageFields},
    logos[]{
      ...,
      image ${imageFields}
    },
    content ${portableContentFields}
  }
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]${pageFields}`;
export const homePageQuery = groq`*[_type == "page" && (_id == "page.home" || slug.current == "home")][0]${pageFields}`;
export { allPageSlugsQuery, sitemapPagesQuery };
