import { createSchemaTypes } from "@laptopclub/foundation-cms";
import { createElement, type SVGProps } from "react";
import { defineArrayMember, defineField, defineType, type SchemaTypeDefinition } from "sanity";

function CtaIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    { "aria-hidden": true, viewBox: "0 0 24 24", ...props },
    createElement("path", {
      d: "M4 5h16v10H8l-4 4V5Z",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.8"
    }),
    createElement("path", { d: "M8 9h8M8 12h5", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.8" })
  );
}

const contentFieldset = { name: "content", title: "Content", options: { collapsible: true, collapsed: false } };
const designFieldset = { name: "design", title: "Design", options: { collapsible: true, collapsed: true } };
const advancedFieldset = { name: "advanced", title: "Advanced", options: { collapsible: true, collapsed: true } };

const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA section",
  type: "object",
  icon: CtaIcon,
  fieldsets: [contentFieldset, designFieldset, advancedFieldset],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", fieldset: "content" }),
    defineField({ name: "title", title: "CTA heading", type: "string", fieldset: "content", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Supporting text", type: "text", fieldset: "content", rows: 3 }),
    defineField({
      name: "ctaItems",
      title: "CTA content",
      type: "array",
      fieldset: "content",
      description: "Optional. Add buttons, a newsletter sign-up, a form embed, social links, or leave empty.",
      of: [
        defineArrayMember({
          name: "buttonGroup",
          title: "Buttons",
          type: "object",
          fields: [
            defineField({
              name: "buttons",
              title: "Buttons",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
              validation: (rule) => rule.min(1)
            })
          ],
          preview: {
            select: { buttons: "buttons" },
            prepare: ({ buttons }: { buttons?: unknown[] }) => ({
              title: "Buttons",
              subtitle: buttons?.length ? `${buttons.length} button${buttons.length === 1 ? "" : "s"}` : "No buttons"
            })
          }
        }),
        defineArrayMember({
          name: "newsletterSignup",
          title: "Newsletter sign-up",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Supporting text", type: "text", rows: 2 }),
            defineField({ name: "formActionUrl", title: "Form action URL", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
            defineField({ name: "emailFieldName", title: "Email field name", type: "string", initialValue: "email" }),
            defineField({ name: "placeholder", title: "Placeholder", type: "string", initialValue: "Email address" }),
            defineField({ name: "buttonLabel", title: "Button label", type: "string", initialValue: "Sign up" })
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Newsletter sign-up" }) }
        }),
        defineArrayMember({
          name: "formEmbed",
          title: "Form embed",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Supporting text", type: "text", rows: 2 }),
            defineField({ name: "embedUrl", title: "Embed URL", type: "url", description: "Use a form provider URL that allows embedding.", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) })
          ],
          preview: { select: { title: "title", embedUrl: "embedUrl" }, prepare: ({ title, embedUrl }) => ({ title: title || "Form embed", subtitle: embedUrl }) }
        }),
        defineArrayMember({
          name: "socialLinks",
          title: "Social icons",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [defineArrayMember({ type: "link" })], validation: (rule) => rule.min(1) })
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }: { title?: string; links?: unknown[] }) => ({ title: title || "Social icons", subtitle: links?.length ? `${links.length} link${links.length === 1 ? "" : "s"}` : "No links" })
          }
        })
      ]
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      fieldset: "design",
      initialValue: "plain",
      options: { list: ["plain", "light", "brand", "dark"].map((value) => ({ title: value, value })) }
    }),
    defineField({
      name: "spacing",
      title: "Spacing",
      type: "string",
      fieldset: "design",
      initialValue: "none",
      options: { list: ["none", "compact", "standard", "tall"].map((value) => ({ title: value, value })) }
    }),
    defineField({
      name: "width",
      title: "Content width",
      type: "string",
      fieldset: "design",
      initialValue: "standard",
      options: { list: ["narrow", "standard", "wide"].map((value) => ({ title: value, value })) }
    }),
    defineField({
      name: "textAlign",
      title: "Text alignment",
      type: "string",
      fieldset: "design",
      initialValue: "center",
      options: { list: ["left", "center", "right"].map((value) => ({ title: value, value })) }
    }),
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      fieldset: "advanced",
      description: "Optional anchor ID for linking to this section. Use letters, numbers and hyphens.",
      validation: (rule) => rule.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { invert: false }).warning("Use lowercase letters, numbers and hyphens only.")
    })
  ],
  preview: {
    select: { title: "title", items: "ctaItems" },
    prepare: ({ title, items }: { title?: string; items?: unknown[] }) => ({
      title: title || "CTA section",
      subtitle: items?.length ? `${items.length} content item${items.length === 1 ? "" : "s"}` : "No CTA content"
    })
  }
});

type FieldLike = {
  name?: string;
  fieldset?: string;
  hidden?: unknown;
};

type ObjectSchemaLike = SchemaTypeDefinition & {
  fields?: FieldLike[];
};

function withOptionalAction(schemaType: SchemaTypeDefinition, actionFieldName: "action" | "cta", toggleFieldName: "showAction" | "showCta"): SchemaTypeDefinition {
  const objectSchema = schemaType as ObjectSchemaLike;
  const fields = objectSchema.fields;

  if (!fields) {
    return schemaType;
  }

  const actionField = fields.find((field) => field.name === actionFieldName);

  if (!actionField) {
    return schemaType;
  }

  const toggleField = defineField({
    name: toggleFieldName,
    title: "Show call to action",
    type: "boolean",
    fieldset: actionField.fieldset,
    initialValue: false
  });

  return {
    ...objectSchema,
    fields: fields.flatMap((field) => {
      if (field.name === toggleFieldName) {
        return [];
      }

      if (field.name !== actionFieldName) {
        return [field];
      }

      return [
        toggleField,
        {
          ...field,
          hidden: ({ parent }: { parent?: Record<string, unknown> }) => parent?.[toggleFieldName] !== true
        }
      ];
    })
  } as SchemaTypeDefinition;
}

const schemaTypes = createSchemaTypes({
  additionalPageBlockTypes: [],
  additionalTypes: []
});

export const siteSchemaTypes = schemaTypes.map((schemaType) => {
  if (schemaType.name === "ctaBlock") {
    return ctaBlock;
  }

  if (schemaType.name === "heroBlock") {
    return withOptionalAction(schemaType, "cta", "showCta");
  }

  if (schemaType.name === "imageTextBlock" || schemaType.name === "fullWidthMediaBlock") {
    return withOptionalAction(schemaType, "action", "showAction");
  }

  return schemaType;
}) as SchemaTypeDefinition[];
