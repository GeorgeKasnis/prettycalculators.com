// Creates a Contentful blog entry from a markdown file.
//
// Usage:
//   node scripts/publish-post.mjs blog-drafts/my-post.md            → creates a DRAFT
//   node scripts/publish-post.mjs blog-drafts/my-post.md --publish  → creates and publishes
//
// The markdown file must start with frontmatter:
//   ---
//   title: My Post Title
//   slug: my-post-title
//   metaTitle: SEO Title (optional — falls back to title)
//   metaDescription: SEO description, ~150-160 chars (required)
//   tags: fitness            (comma-separated Contentful tag ids: fitness, math, maths, other)
//   ---
//   Markdown body here...
//
// Requires CONTENTFUL_MANAGEMENT_TOKEN in .env (never commit that file).

import { readFileSync, existsSync } from "node:fs"
import { resolve, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "contentful-management"
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown"

const SPACE_ID = "480jcgpwnf1k"
const ENVIRONMENT_ID = "master"
const CONTENT_TYPE_ID = "blog"

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")

// --- read token from .env (no dotenv dependency needed) ---
function loadEnvToken() {
    if (process.env.CONTENTFUL_MANAGEMENT_TOKEN) return process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const envPath = join(projectRoot, ".env")
    if (!existsSync(envPath)) return null
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
        const m = line.match(/^\s*CONTENTFUL_MANAGEMENT_TOKEN\s*=\s*(.+?)\s*$/)
        if (m) return m[1].replace(/^["']|["']$/g, "")
    }
    return null
}

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) fail("Markdown file must start with ---\\ntitle: ...\\nslug: ...\\n--- frontmatter.")
    const meta = {}
    for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^(\w+)\s*:\s*(.+?)\s*$/)
        if (kv) meta[kv[1].toLowerCase()] = kv[2].replace(/^["']|["']$/g, "")
    }
    return { meta, body: m[2].trim() }
}

function fail(msg) {
    console.error(`\n✗ ${msg}\n`)
    process.exit(1)
}

const fileArg = process.argv[2]
const shouldPublish = process.argv.includes("--publish")
if (!fileArg) fail("Usage: node scripts/publish-post.mjs <markdown-file> [--publish]")

const filePath = resolve(process.cwd(), fileArg)
if (!existsSync(filePath)) fail(`File not found: ${filePath}`)

const token = loadEnvToken()
if (!token) fail("CONTENTFUL_MANAGEMENT_TOKEN not found. Add it to .env in the project root:\n  CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxxxxxxx")

const { meta, body } = parseFrontmatter(readFileSync(filePath, "utf8"))
if (!meta.title || !meta.slug) fail("Frontmatter must include both `title:` and `slug:`.")
if (!body) fail("Markdown body is empty.")

// keys are lowercased by the parser; accept snake_case spellings too
const metaTitle = meta.metatitle ?? meta.meta_title ?? meta.title
const metaDescription = meta.metadescription ?? meta.meta_description
if (!metaDescription) fail("Frontmatter must include `metaDescription:` (required field in Contentful).")
const tagIds = (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean)

const client = createClient({ accessToken: token }, { type: "plain" })
const scope = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID }

console.log(`→ Connecting to Contentful space ${SPACE_ID}...`)
const locales = await client.locale.getMany(scope)
const locale = locales.items.find((l) => l.default)?.code ?? "en-US"

// refuse to create a duplicate slug
const existing = await client.entry.getMany({
    ...scope,
    query: { content_type: CONTENT_TYPE_ID, "fields.slug": meta.slug, limit: 1 },
})
if (existing.items.length > 0) {
    fail(`A post with slug "${meta.slug}" already exists (entry ${existing.items[0].sys.id}). Pick another slug.`)
}

// validate tags against the ones that exist in the space
let metadata
if (tagIds.length > 0) {
    const spaceTags = await client.tag.getMany(scope)
    const validIds = new Set(spaceTags.items.map((t) => t.sys.id))
    const unknown = tagIds.filter((t) => !validIds.has(t))
    if (unknown.length > 0) {
        fail(`Unknown tag(s): ${unknown.join(", ")}. Available: ${[...validIds].join(", ")}`)
    }
    metadata = { tags: tagIds.map((id) => ({ sys: { type: "Link", linkType: "Tag", id } })) }
}

console.log("→ Converting markdown to Contentful rich text...")
const richText = await richTextFromMarkdown(body, () => null) // unsupported nodes (e.g. images) are dropped

console.log("→ Creating entry...")
const entry = await client.entry.create({ ...scope, contentTypeId: CONTENT_TYPE_ID }, {
    fields: {
        title: { [locale]: meta.title },
        slug: { [locale]: meta.slug },
        content: { [locale]: richText },
        metaTitle: { [locale]: metaTitle },
        metaDescription: { [locale]: metaDescription },
    },
    ...(metadata ? { metadata } : {}),
})

let status = "DRAFT"
if (shouldPublish) {
    try {
        await client.entry.publish({ ...scope, entryId: entry.sys.id }, entry)
        status = "PUBLISHED"
    } catch (e) {
        console.error(`\n! Publish failed (probably a required field like featuredImage is missing).`)
        console.error(`  The entry was still created as a draft — finish it in the Contentful web app.\n`)
    }
}

console.log(`\n✓ ${status}: "${meta.title}"`)
console.log(`  Slug:  /blog/${meta.slug}`)
console.log(`  Edit:  https://app.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries/${entry.sys.id}\n`)
