# How to Add Blog Posts to Your Website

This guide will show you how to add new blog posts to your Money-Printing Press website.

## Overview

Your website uses markdown files (.md) for blog posts. Each post is stored in the `blogs/` directory and registered in a `blogs.json` file. When visitors view your site, JavaScript automatically loads and displays these posts.

## Quick Start: Adding a New Blog Post

Follow these 3 simple steps to add a new blog post:

### Step 1: Create a New Markdown File

1. Navigate to the `blogs/` directory in your project
2. Create a new file with a descriptive name (use lowercase and hyphens)
   - Example: `compound-interest-secrets.md`
   - Example: `venetian-merchants.md`
   - Example: `modern-portfolio-theory.md`

### Step 2: Add Frontmatter and Content

Every blog post must start with **frontmatter** (metadata) followed by your content.

**Template:**

```markdown
---
title: "Your Blog Post Title"
date: 2024-01-20
tags: ["Tag1", "Tag2", "Tag3"]
description: "A brief description of your post that appears in the archive."
featured: false
---

# Your Blog Post Title

Your content starts here...

## Section Heading

Write your post content using standard markdown formatting.

**Bold text** and *italic text* work great.

- Bullet points
- Are supported
- Out of the box

1. Numbered lists
2. Also work
3. Perfectly

> Blockquotes are great for highlighting important points.

Use `inline code` or code blocks:

```
function example() {
    return "Hello World";
}
```

### Subsection

Continue writing your amazing content...
```

**Field Explanations:**

- **title**: The main title of your blog post (will appear as the page heading)
- **date**: Publication date in YYYY-MM-DD format (newer posts appear first)
- **tags**: Array of categories/topics (use existing tags or create new ones)
  - Existing tags: "Historical Wealth", "Banking", "Renaissance", "Economic History", "Trade", "Ancient Rome", "Modern Finance", "Investment Strategy"
- **description**: 1-2 sentence summary (shows in archive listings)
- **featured**: `true` or `false` (featured posts may be highlighted on homepage)

### Step 3: Register Your Post in blogs.json

Open `blogs/blogs.json` and add your new post to the "posts" array:

```json
{
  "posts": [
    {
      "slug": "compound-interest-secrets",
      "title": "The Power of Compound Interest: Einstein's Eighth Wonder",
      "date": "2024-01-20",
      "tags": ["Modern Finance", "Investment Strategy"],
      "description": "Why understanding compound interest is the foundation of all wealth building strategies.",
      "featured": true
    },
    {
      "slug": "medici-bank",
      "title": "The Medici Bank: Renaissance Wealth Creation",
      "date": "2024-01-15",
      "tags": ["Historical Wealth", "Banking", "Renaissance"],
      "description": "Exploring how the Medici family built one of history's most powerful banking empires and transformed Florence into the financial capital of Europe.",
      "featured": true
    }
    // ... existing posts below
  ]
}
```

**Important:**
- The `slug` must match your markdown filename (without the .md extension)
- All other fields should match your markdown frontmatter exactly
- Posts are displayed in the order they appear (newest first is recommended)

---

## Complete Example

Let's walk through adding a complete blog post about compound interest:

### 1. Create the file: `blogs/compound-interest.md`

```markdown
---
title: "The Eighth Wonder: How Compound Interest Builds Empires"
date: 2024-02-01
tags: ["Modern Finance", "Investment Strategy", "Wealth Psychology"]
description: "Albert Einstein allegedly called it the eighth wonder of the world. Learn why compound interest is the most powerful force in wealth creation."
featured: true
---

# The Eighth Wonder: How Compound Interest Builds Empires

"Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." - Often attributed to Albert Einstein

## The Simple Formula That Changed Everything

At its core, compound interest is simple: earnings on your earnings. But this simple concept is responsible for more wealth creation (and destruction) than any other financial principle in history.

### The Math That Matters

Starting with $10,000, investing $500/month at 8% annual return:

- After 10 years: $102,000 (you contributed $70,000)
- After 20 years: $297,000 (you contributed $130,000)
- After 30 years: $745,000 (you contributed $190,000)

Notice the pattern? In the first decade, your returns add $32,000. In the third decade, they add $448,000. Same monthly contribution, exponentially different results.

## The Historical Pattern

Every great fortune in history has understood this principle:

**The Rothschilds**: Built their empire not through single deals, but through reinvesting profits across generations.

**John D. Rockefeller**: His wealth didn't come from finding oil - it came from reinvesting oil profits into more production, then reinvesting those profits again.

**Warren Buffett**: 99% of his wealth was built after age 50, not because he got smarter, but because compound interest had more time to work.

## The Modern Application

Today's lesson is simple but profound: **Time is more valuable than timing.**

- Starting at 25 vs 35 matters more than finding the "perfect" investment
- Consistency beats intensity every single time
- The best time to start was yesterday; the second best time is today

## Your Action Plan

1. **Start now**: Even $100/month compounds into significance
2. **Never interrupt it**: Every withdrawal resets the clock
3. **Reinvest everything**: Dividends, interest, capital gains - let it all compound
4. **Think in decades**: This isn't a sprint; it's generational wealth building

The wealthy don't have a secret formula. They just understand that compound interest rewards patience more than genius.

*How much time are you giving your money to compound?*
```

### 2. Update `blogs/blogs.json`

Add this entry at the beginning of the "posts" array:

```json
{
  "slug": "compound-interest",
  "title": "The Eighth Wonder: How Compound Interest Builds Empires",
  "date": "2024-02-01",
  "tags": ["Modern Finance", "Investment Strategy", "Wealth Psychology"],
  "description": "Albert Einstein allegedly called it the eighth wonder of the world. Learn why compound interest is the most powerful force in wealth creation.",
  "featured": true
}
```

### 3. Test Your Post

Open your website and:
1. Check the homepage - your post should appear in "Latest Insights" (if recent)
2. Visit the Archive page - your post should be listed
3. Click on your post title - it should load and display correctly
4. Test the topic filter - clicking a tag should show/hide your post appropriately

---

## Markdown Formatting Guide

Your posts support standard markdown formatting:

### Headings
```markdown
# Heading 1 (Page Title)
## Heading 2 (Major Section)
### Heading 3 (Subsection)
#### Heading 4 (Minor Section)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Links
```markdown
[Link text](https://example.com)
```

### Blockquotes
```markdown
> This is a quote or important callout
```

### Code Blocks
````markdown
```
function example() {
    return "code here";
}
```
````

---

## Tips for Great Blog Posts

1. **Strong opening**: Hook readers in the first paragraph
2. **Use subheadings**: Break content into scannable sections
3. **Historical + Modern**: Connect past lessons to present applications
4. **Actionable takeaways**: Give readers something they can do today
5. **Engaging questions**: End with a thought-provoking question
6. **Consistent voice**: Match the site's educational yet accessible tone

---

## Troubleshooting

**Post not showing up?**
- Check that the slug in `blogs.json` matches your filename exactly
- Verify the frontmatter is properly formatted with `---` before and after
- Ensure the date format is YYYY-MM-DD
- Check browser console for JavaScript errors (F12 → Console)

**Formatting looks wrong?**
- Make sure there's a blank line after the closing `---` of frontmatter
- Check that all markdown syntax is correct (no missing closing characters)
- Verify quotes around text fields in the frontmatter

**Tags not working?**
- Tags in `blogs.json` must match frontmatter exactly (case-sensitive)
- Tags should be in array format: `["Tag1", "Tag2"]`

---

## File Structure Reference

```
your-project/
├── blogs/
│   ├── blogs.json              ← Register posts here
│   ├── medici-bank.md          ← Example post
│   ├── roman-trade.md          ← Example post
│   └── your-new-post.md        ← Your new posts
├── index.html                  ← Homepage
├── archive.html                ← All posts listing
├── blog-post.html              ← Individual post template
├── styles.css                  ← Styling
└── script.js                   ← Handles loading posts
```

---

## Ready to Publish?

Once you've added your markdown file and updated `blogs.json`:

1. Save all files
2. Refresh your browser
3. Your new post should appear automatically!

No build process, no compilation - just write, save, and publish.

---

## Questions?

If you encounter any issues or need help:
- Check the existing posts (`medici-bank.md` and `roman-trade.md`) as reference examples
- Verify your JSON syntax using a JSON validator
- Make sure all file paths and slugs match exactly

Happy writing! Your historical wealth insights await.
