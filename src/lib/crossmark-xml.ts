import type { InitialFormValues, CorrectionFormValues } from "./crossmark-schema";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const SCHEMA_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<doi_batch version="4.4.2" xmlns="http://www.crossref.org/doi_resources_schema/4.4.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.crossref.org/doi_resources_schema/4.4.2 doi_resources4.4.2.xsd">`;

function buildHead(depositorName: string, email: string): string {
  return [
    `  <head>`,
    `    <doi_batch_id>crossmark_batch</doi_batch_id>`,
    `    <depositor>`,
    `      <depositor_name>${escapeXml(depositorName)}</depositor_name>`,
    `      <email_address>${escapeXml(email)}</email_address>`,
    `    </depositor>`,
    `  </head>`,
  ].join("\n");
}

interface PubHistory {
  submitted?: string;
  finalRevised?: string;
  accepted?: string;
  publishedOnline?: string;
}

function buildCustomMetadata(history: PubHistory): string | null {
  const items: Array<{ name: string; label: string; value: string }> = [];
  if (history.submitted)
    items.push({ name: "submitted", label: "Submitted", value: history.submitted });
  if (history.finalRevised)
    items.push({ name: "final_revised", label: "Final Revised", value: history.finalRevised });
  if (history.accepted)
    items.push({ name: "accepted", label: "Accepted", value: history.accepted });
  if (history.publishedOnline)
    items.push({
      name: "published_online",
      label: "Published Online",
      value: history.publishedOnline,
    });

  if (items.length === 0) return null;

  const lines = [`        <custom_metadata>`];
  items.forEach((item, idx) => {
    lines.push(
      `          <assertion name="${item.name}" label="${escapeXml(item.label)}" group_name="publication_history" group_label="Publication History" order="${idx}">${escapeXml(item.value)}</assertion>`,
    );
  });
  lines.push(`        </custom_metadata>`);
  return lines.join("\n");
}

export function buildInitialXml(data: InitialFormValues): string {
  const lines: string[] = [SCHEMA_HEADER];
  lines.push(buildHead(data.depositorName, data.email));
  lines.push(`  <body>`);

  for (const article of data.articles) {
    lines.push(`    <crossmark_data>`);
    lines.push(`      <doi>${escapeXml(article.doi)}</doi>`);
    lines.push(`      <crossmark>`);
    lines.push(`        <crossmark_version>1</crossmark_version>`);
    lines.push(`        <crossmark_policy>${escapeXml(data.crossmarkPolicy)}</crossmark_policy>`);

    const custom = buildCustomMetadata({
      submitted: article.submitted,
      finalRevised: article.finalRevised,
      accepted: article.accepted,
      publishedOnline: article.publishedOnline,
    });
    if (custom) lines.push(custom);

    lines.push(`      </crossmark>`);
    lines.push(`    </crossmark_data>`);
  }

  lines.push(`  </body>`);
  lines.push(`</doi_batch>`);
  return lines.join("\n") + "\n";
}

export function buildCorrectionXml(data: CorrectionFormValues): string {
  const lines: string[] = [SCHEMA_HEADER];
  lines.push(buildHead(data.depositorName, data.email));
  lines.push(`  <body>`);

  for (const c of data.corrections) {
    let descText = c.description.trim();
    if (c.correctorDoi && c.correctorDoi.trim()) {
      descText += ` Corrigendum: doi.org/${c.correctorDoi.trim()}`;
    }

    lines.push(`    <crossmark_data>`);
    lines.push(`      <doi>${escapeXml(c.targetDoi)}</doi>`);
    lines.push(`      <crossmark>`);
    lines.push(`        <crossmark_policy>${escapeXml(c.crossmarkPolicy)}</crossmark_policy>`);
    lines.push(`        <updates>`);
    lines.push(
      `          <update type="${c.type}" date="${c.date}">${escapeXml(c.targetDoi)}</update>`,
    );
    lines.push(`        </updates>`);
    lines.push(`        <custom_metadata>`);
    lines.push(
      `          <assertion name="correction_item" label="Correction item" group_name="items" group_label="Correction Items" order="0">${escapeXml(descText)}</assertion>`,
    );
    lines.push(`        </custom_metadata>`);
    lines.push(`      </crossmark>`);
    lines.push(`    </crossmark_data>`);
  }

  lines.push(`  </body>`);
  lines.push(`</doi_batch>`);
  return lines.join("\n") + "\n";
}
