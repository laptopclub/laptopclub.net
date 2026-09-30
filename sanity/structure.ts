import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem().title("Pages").schemaType("page").child(S.documentTypeList("page").title("Pages")),
      ...S.documentTypeListItems().filter((item) => !["siteSettings", "page"].includes(item.getId() ?? ""))
    ]);
