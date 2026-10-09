import {
  ActionLink,
  FullWidthMediaBlock,
  HeroBlock,
  ImageTextBlock,
  cleanSectionId,
  cn,
  createBlockRegistry,
  type CtaBlockData,
  type FullWidthMediaBlockData,
  type HeroBlockData,
  type ImageTextBlockData,
  type LinkData
} from "@laptopclub/foundation-ui";

type CtaItem =
  | { _type?: "buttonGroup"; buttons?: LinkData[] | null }
  | {
      _type?: "newsletterSignup";
      title?: string | null;
      body?: string | null;
      formActionUrl?: string | null;
      emailFieldName?: string | null;
      placeholder?: string | null;
      buttonLabel?: string | null;
    }
  | { _type?: "formEmbed"; title?: string | null; body?: string | null; embedUrl?: string | null }
  | { _type?: "socialLinks"; title?: string | null; links?: LinkData[] | null };

type DynamicCtaBlockData = Omit<CtaBlockData, "spacing"> & {
  ctaItems?: CtaItem[] | null;
  spacing?: "none" | "compact" | "standard" | "tall";
};

const backgroundClasses = {
  plain: "",
  light: "bg-slate-50 text-slate-950",
  brand: "bg-brand-600 text-slate-950",
  dark: "bg-slate-950 text-white"
} as const;

const spacingClasses = {
  none: "",
  compact: "py-12",
  standard: "py-20",
  tall: "py-28"
} as const;

const widthClasses = {
  narrow: "max-w-3xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl"
} as const;

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
} as const;

const justifyClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end"
} as const;

function cleanOption<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  return value && allowed.includes(value as T) ? (value as T) : fallback;
}

function hasLink(link: LinkData): boolean {
  return Boolean(link.href && link.label);
}

function CtaButtonGroup({ buttons, textAlign }: { buttons?: LinkData[] | null; textAlign: "left" | "center" | "right" }) {
  const validButtons = buttons?.filter(hasLink) ?? [];

  if (!validButtons.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-3", justifyClasses[textAlign])}>
      {validButtons.map((button, index) => (
        <ActionLink key={`${button.href}-${button.label}-${index}`} link={button} variant={button.variant ?? (index === 0 ? "primary" : "secondary")} />
      ))}
    </div>
  );
}

function NewsletterSignup({ item }: { item: Extract<CtaItem, { _type?: "newsletterSignup" }> }) {
  return (
    <form action={item.formActionUrl ?? undefined} className="mx-auto max-w-xl space-y-4" method="post">
      {item.title ? <h3 className="text-xl font-semibold">{item.title}</h3> : null}
      {item.body ? <p className="text-sm text-slate-600">{item.body}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="cta-newsletter-email">
          Email address
        </label>
        <input
          className="min-h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 text-slate-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
          id="cta-newsletter-email"
          name={item.emailFieldName ?? "email"}
          placeholder={item.placeholder ?? "Email address"}
          required
          type="email"
        />
        <button className="min-h-12 rounded-full bg-slate-950 px-6 font-semibold text-white transition hover:bg-slate-800" type="submit">
          {item.buttonLabel ?? "Sign up"}
        </button>
      </div>
    </form>
  );
}

function FormEmbed({ item }: { item: Extract<CtaItem, { _type?: "formEmbed" }> }) {
  if (!item.embedUrl) {
    return null;
  }

  return (
    <div className="space-y-4">
      {item.title ? <h3 className="text-xl font-semibold">{item.title}</h3> : null}
      {item.body ? <p className="text-sm text-slate-600">{item.body}</p> : null}
      <iframe className="min-h-96 w-full rounded-2xl border border-slate-200 bg-white" src={item.embedUrl} title={item.title ?? "Form"} />
    </div>
  );
}

function SocialLinks({ item, textAlign }: { item: Extract<CtaItem, { _type?: "socialLinks" }>; textAlign: "left" | "center" | "right" }) {
  const links = item.links?.filter(hasLink) ?? [];

  if (!links.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {item.title ? <h3 className="text-xl font-semibold">{item.title}</h3> : null}
      <div className={cn("flex flex-wrap gap-3", justifyClasses[textAlign])}>
        {links.map((link) => (
          <a
            className="flex size-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold uppercase text-white transition hover:bg-brand-700"
            href={link.href}
            key={`${link.label}-${link.href}`}
            rel={link.openInNewTab ? "noreferrer" : undefined}
            target={link.openInNewTab ? "_blank" : undefined}
            title={link.label}
          >
            {link.label?.slice(0, 1)}
          </a>
        ))}
      </div>
    </div>
  );
}

function CtaItemRenderer({ item, textAlign }: { item: CtaItem; textAlign: "left" | "center" | "right" }) {
  switch (item._type) {
    case "buttonGroup":
      return <CtaButtonGroup buttons={item.buttons} textAlign={textAlign} />;
    case "newsletterSignup":
      return <NewsletterSignup item={item} />;
    case "formEmbed":
      return <FormEmbed item={item} />;
    case "socialLinks":
      return <SocialLinks item={item} textAlign={textAlign} />;
    default:
      return null;
  }
}

function DynamicCtaBlock({ block }: { block: DynamicCtaBlockData }) {
  const background = cleanOption(block.background, ["plain", "light", "brand", "dark"] as const, "plain");
  const spacing = cleanOption(block.spacing, ["none", "compact", "standard", "tall"] as const, "none");
  const textAlign = cleanOption(block.textAlign, ["left", "center", "right"] as const, "center");
  const width = cleanOption(block.width, ["narrow", "standard", "wide"] as const, "standard");
  const legacyButtons = [block.primaryAction, block.secondaryAction].filter((link): link is LinkData => Boolean(link));
  const items = block.ctaItems?.length ? block.ctaItems : legacyButtons.length ? [{ _type: "buttonGroup" as const, buttons: legacyButtons }] : [];

  return (
    <section id={cleanSectionId(block.sectionId)} className={cn(backgroundClasses[background], spacingClasses[spacing])}>
      <div className={cn("mx-auto", widthClasses[width], textAlignClasses[textAlign])}>
        {block.eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{block.eyebrow}</p> : null}
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{block.title ?? "Ready to get started?"}</h2>
        {block.body ? <p className={cn("mt-4 text-lg text-slate-600", textAlign === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>{block.body}</p> : null}
        {items.length ? (
          <div className="mt-8 space-y-8">
            {items.map((item, index) => (
              <CtaItemRenderer item={item} key={`${item._type}-${index}`} textAlign={textAlign} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type OptionalHeroBlockData = HeroBlockData & { showCta?: boolean | null };
type OptionalImageTextBlockData = ImageTextBlockData & { showAction?: boolean | null };
type OptionalFullWidthMediaBlockData = FullWidthMediaBlockData & { showAction?: boolean | null };

type ImageConfig = { projectId: string; dataset: string };

function HeroBlockWithOptionalCta({ block, imageConfig }: { block: OptionalHeroBlockData; imageConfig?: ImageConfig }) {
  return <HeroBlock block={block.showCta ? block : { ...block, cta: undefined }} imageConfig={imageConfig} />;
}

function ImageTextBlockWithOptionalAction({ block, imageConfig }: { block: OptionalImageTextBlockData; imageConfig?: ImageConfig }) {
  return <ImageTextBlock block={block.showAction ? block : { ...block, action: undefined }} imageConfig={imageConfig} />;
}

function FullWidthMediaBlockWithOptionalAction({ block, imageConfig }: { block: OptionalFullWidthMediaBlockData; imageConfig?: ImageConfig }) {
  return <FullWidthMediaBlock block={block.showAction ? block : { ...block, action: undefined }} imageConfig={imageConfig} />;
}

export const siteBlockRegistry = createBlockRegistry({
  ctaBlock: DynamicCtaBlock,
  fullWidthMediaBlock: FullWidthMediaBlockWithOptionalAction,
  heroBlock: HeroBlockWithOptionalCta,
  imageTextBlock: ImageTextBlockWithOptionalAction
});
