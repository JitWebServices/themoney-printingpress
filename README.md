# The Money-Printing Press

A historical wealth and finance blog built with pure HTML, CSS, and JavaScript.

## About

This website explores timeless principles of wealth creation through the lens of history, from the Medici Bank to modern financial strategies.

## Features

- **Blog System**: Markdown-based blog posts with automatic rendering
- **Archive with Filtering**: Browse posts by topic/tag
- **Financial Calculators**: Interactive retirement planning calculator
- **Responsive Design**: Mobile-friendly Victorian-inspired theme
- **No Build Process**: Just HTML, CSS, and JavaScript - no compilation needed

## Running the Website Locally

You can run this website locally using any static web server. Here are several options:

### Option 1: Python (Recommended)

If you have Python installed (comes pre-installed on Mac/Linux):

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser to: `http://localhost:8000`

### Option 2: Node.js

If you have Node.js installed:

```bash
npx http-server -p 8000
```

Or install globally:
```bash
npm install -g http-server
http-server -p 8000
```

Then open your browser to: `http://localhost:8000`

### Option 3: PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open your browser to: `http://localhost:8000`

### Option 4: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Adding Blog Posts

See [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md) for detailed instructions on adding new blog posts.

### Quick Summary:

1. Create a markdown file in `blogs/` directory (e.g., `blogs/my-post.md`)
2. Add frontmatter with title, date, tags, and description
3. Write your content in markdown
4. Register the post in `blogs/blogs.json`
5. Refresh your browser - it appears automatically!

## Project Structure

```
.
├── index.html              # Homepage with latest posts
├── archive.html            # All posts with topic filtering
├── about.html              # About page
├── calculators.html        # Financial calculators
├── blog-post.html          # Individual blog post template
├── styles.css              # All styling
├── script.js               # Blog loading and interactivity
├── blogs/                  # Blog posts directory
│   ├── blogs.json         # Blog posts registry
│   ├── medici-bank.md     # Example blog post
│   └── roman-trade.md     # Example blog post
├── HOW_TO_ADD_BLOG_POSTS.md  # Detailed guide for adding posts
└── README.md              # This file
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **Vanilla JavaScript**: No frameworks, just pure JS
- **Markdown**: Blog post content format
- **Google Fonts**: Playfair Display & Cormorant Garamond

## Design Theme

Victorian/historical aesthetic with:
- Burgundy and maroon gradients
- Warm cream and tan backgrounds
- Gold accents
- Elegant serif typography

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #9C272E;      /* Main burgundy */
    --color-accent: #B08A30;       /* Gold accent */
    --color-bg: #F2ECE1;           /* Cream background */
    /* ... etc */
}
```

### Navigation

Edit the nav menu in each HTML file's header section:

```html
<nav>
    <ul class="nav-menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="archive.html">Archive</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="calculators.html">Calculators</a></li>
    </ul>
</nav>
```

### Footer

Update footer links and social media in each HTML file's footer section.

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`) and root folder
4. Save and wait for deployment

Your site will be at: `https://yourusername.github.io/repository-name`

### Other Hosting

This is a static site, so it works with any static hosting:
- Netlify (drag and drop your folder)
- Vercel (connect your GitHub repo)
- AWS S3 + CloudFront
- Any traditional web hosting (upload via FTP)

## Contributing

This is a personal project, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright © 2024 The Money-Printing Press. All rights reserved.

## Contact

For questions or feedback, reach out via the contact form on the website.

---

Built with care, inspired by history.
