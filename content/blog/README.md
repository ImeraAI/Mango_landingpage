# Publishing a blog post

You do not need a developer, an account on a CMS, or anything installed. A post
is one file in this folder. Add the file, and the post page, the listing on
`/blog`, and the sitemap entry all appear on their own.

Pictures all live together in the `images` folder, right here beside the posts.

```
content/blog/
  _template.mdx                        ← copy this to start a post
  what-a-missed-call-actually-costs.mdx   ← a post
  after-hours-calls-without-hiring.mdx
  images/                              ← every picture, for every post
    dispatch-board.jpg
```

## Add a post from the GitHub website

1. Open this folder on GitHub (`content/blog`).
2. Click **Add file → Create new file**.
3. Name the file after the URL you want, ending in `.mdx`.
   `content/blog/how-to-price-a-callout.mdx` becomes
   `mango.ai/blog/how-to-price-a-callout`.
   Use lowercase letters, numbers and hyphens only — no spaces, no capitals.
4. Open `_template.mdx` in this folder, click the copy icon at the top right,
   paste it into your new file, and write your post over it. Don't start from a
   blank file — the template already has every field you need.
5. Click **Commit changes**. The site rebuilds and the post is live in a few
   minutes.

Never rename a post once it is published. The filename is the URL, so renaming
it breaks every link anyone has ever shared to that post.

## Template

This is what `_template.mdx` contains. Copy the whole block, including the
`---` lines.

```
---
title: How to price a callout without losing the job
excerpt: One or two sentences. This is what shows on the blog listing and in Google results.
category: Running the business
date: 2026-08-04
author: The Mango team
image: dispatch-board.jpg
imageAlt: A dispatcher looking at the schedule board on a Monday morning
---

Write the post here in plain Markdown. If you have no banner picture, delete
the `image` and `imageAlt` lines above — the post then gets a coloured cover
drawn from its category, which is perfectly normal.

## A heading

A paragraph. **Bold** and *italic* work as you would expect, and so do
[links](/pricing) and bullet lists:

- first point
- second point

![A picture inside the post — this sentence is also its caption](dispatch-board.jpg)
```

## The frontmatter fields

Everything between the two `---` lines is settings, not content.

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | The headline, on the post and in the browser tab. |
| `excerpt` | Yes | The summary under the title on `/blog` and in search results. Keep it to one or two sentences. |
| `category` | Yes | Must be one of the categories below, spelled exactly. |
| `date` | Yes | Publish date as `YYYY-MM-DD`, e.g. `2026-08-04`. Posts sort newest first. |
| `author` | Yes | Shown at the bottom of the post. Usually `The Mango team`. |
| `featured` | No | `featured: true` pins the post to the big slot at the top of `/blog`. Only put it on one post at a time — remove it from the old one when you promote a new one. |
| `image` | No | The banner picture. Just the filename, e.g. `image: dispatch-board.jpg`. See **Images** below. |
| `imageAlt` | No | One sentence describing the banner, for screen readers and for Google. Write it whenever you set `image`. |

If a required field is missing or misspelled, the site build fails and names
your file, rather than publishing a broken page. If that happens, fix the field
and commit again.

You do **not** set the reading time. It is counted from the post itself.

## The categories

Use one of these exactly, including capitalisation:

| Category | Use it for |
| --- | --- |
| `Missed calls` | Calls that ring out, after-hours cover, what a missed call costs. |
| `Booking and scheduling` | Filling the diary, callbacks, cancellations, dispatch. |
| `Running the business` | Pricing, marketing spend, hiring, the numbers side. |
| `Operations` | How the day actually runs: intake scripts, routing, admin. |
| `On the tools` | Advice for the techs doing the work. |
| `Customer experience` | Follow-up, reviews, how the customer feels about the call. |
| `Product` | Mango itself — new features and how to use them. |

Anything else fails the build. The category also picks the colour and icon on
the post's card, so choose the one that actually fits. If you need a new
category, ask a developer to add it — it is a small change.

## Drafts

Put an underscore at the front of the filename and the post is invisible:
`_half-finished-idea.mdx` will not appear anywhere on the site. Rename it to
drop the underscore when it is ready to publish. That is the whole drafts
system — there is nothing else to toggle.

## Images

Two kinds: the banner at the top of the post, and pictures inside the body.
Both are optional. Leave the banner out and the post gets a coloured cover
drawn for it from its category — so the cards on `/blog` all still match, and
you never have to go hunting for a photo just to publish. Skipping it is a
perfectly normal way to post; add a banner when you have a picture worth
showing, not out of obligation.

### Step 1 — upload the picture

Every picture, for every post, lives in one folder: **`images`, right here
beside the posts**.

1. Open the [`images`](./images) folder in this repository.
2. **Add file → Upload files**, drag your picture in.
3. Commit it on the **same branch as your post**, so both land together.

Name it in lowercase with hyphens, and say what it actually shows:
`dispatch-board.jpg`, not `IMG_4821.JPG`. Every post shares this folder, so a
name like `hero.jpg` will collide with someone else's.

Use `.jpg` for photographs and `.png` for screenshots. Aim for about 1600
pixels wide and keep the file under roughly 500 KB — a 6 MB photo straight off
a phone makes the page slow. The site resizes and optimises whatever you give
it, but it cannot undo a huge original.

### Step 2 — the banner

Add two lines to the frontmatter. The banner shows at the top of the post, on
the post's card on `/blog`, and in the preview when someone shares the link.

```
image: dispatch-board.jpg
imageAlt: A dispatcher looking at the schedule board on a Monday morning
```

Just the filename — no folders, no slashes. Widescreen shapes work best,
roughly twice as wide as tall. A tall portrait photo gets cropped on the cards.

### Step 3 — pictures inside the post

In the body, on its own line, with a blank line above and below it:

```
![A dispatcher looking at the schedule board](dispatch-board.jpg)
```

The text in the square brackets is both the description for screen readers and
the caption printed under the picture — write a real sentence. Leave the
brackets empty, `![](divider.png)`, for a purely decorative picture that should
have no caption.

The same picture can be the banner and appear in the body; upload it once and
name it in both places.

### A picture hosted somewhere else

Instead of uploading, you can paste a full web address starting with `https://`
in either place. It works, but the picture disappears from our site if it is
ever deleted or moved at the other end, and it will not be resized or
optimised. Prefer uploading.

### If a picture does not show up

The post still publishes — a missing picture is left out rather than breaking
the page. Check that the file is in the `images` folder and that the name matches
exactly: capitals count, and `.JPG` is not `.jpg`.

If you delete a post, delete its pictures from the `images` folder too, once you have
checked no other post uses them.

## What you can write

Ordinary Markdown, all of it styled to match the site automatically:

- `## Heading` and `### Subheading`
- paragraphs, **bold**, *italic*
- bullet lists (`- item`) and numbered lists (`1. item`)
- `> quotes` for a pull quote
- `---` on its own line for a divider
- tables, using the pipe format shown above
- pictures: `![description](dispatch-board.jpg)` — see **Images** above
- links: `[text](/pricing)` for pages on this site, `[text](https://example.com)`
  for anywhere else (those open in a new tab automatically)

Never write HTML or CSS classes. The styling is handled for you, and hand-styled
posts will look wrong the next time the site design changes.
