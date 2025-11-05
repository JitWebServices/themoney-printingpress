// Blog Posts Data
// This array will store all blog posts metadata
// Posts are loaded from the 'blogs/' directory
let allPosts = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Setup newsletter form
    setupNewsletterForm();

    // Load posts based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        loadLatestPosts();
    } else if (currentPage === 'archive.html') {
        loadAllPosts();
        setupTopicFilter();
    } else if (currentPage === 'blog-post.html') {
        loadBlogPost();
    } else if (currentPage === 'calculators.html') {
        setupRetirementCalculator();
    }
});

// Fetch and parse blog posts from blogs.json
async function fetchPosts() {
    try {
        const response = await fetch('blogs/blogs.json');
        if (!response.ok) {
            throw new Error('Failed to load blog posts');
        }
        const data = await response.json();
        allPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        return allPosts;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// Load latest posts for homepage
async function loadLatestPosts() {
    const posts = await fetchPosts();
    const latestPosts = posts.slice(0, 3);
    const container = document.getElementById('latest-posts-container');

    if (latestPosts.length === 0) {
        container.innerHTML = '<p class="no-posts">No posts available yet. Check back soon!</p>';
        return;
    }

    container.innerHTML = latestPosts.map(post => createPostCard(post)).join('');
}

// Load all posts for archive page
async function loadAllPosts() {
    const posts = await fetchPosts();
    displayPosts(posts);
}

// Display posts in the archive
function displayPosts(posts) {
    const container = document.getElementById('archive-posts-container');
    const noPostsMessage = document.getElementById('no-posts-message');

    if (posts.length === 0) {
        container.innerHTML = '';
        noPostsMessage.style.display = 'block';
        return;
    }

    noPostsMessage.style.display = 'none';
    container.innerHTML = posts.map(post => createPostCard(post)).join('');
}

// Create HTML for a post card
function createPostCard(post) {
    const tags = post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <article class="post-card">
            <h3><a href="blog-post.html?slug=${post.slug}">${post.title}</a></h3>
            <div class="post-meta">
                ${tags}
            </div>
            <time class="post-date">${date}</time>
            <p class="post-description">${post.description}</p>
        </article>
    `;
}

// Setup topic filter for archive page
function setupTopicFilter() {
    const topicButtons = document.querySelectorAll('.topic-tag');

    topicButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            topicButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            const tag = this.dataset.tag;
            if (tag === 'all') {
                displayPosts(allPosts);
            } else {
                const filtered = allPosts.filter(post => post.tags.includes(tag));
                displayPosts(filtered);
            }
        });
    });
}

// Load individual blog post
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        document.getElementById('blog-content').innerHTML = '<p>Blog post not found.</p>';
        return;
    }

    try {
        // Load the markdown file
        const response = await fetch(`blogs/${slug}.md`);
        if (!response.ok) {
            throw new Error('Post not found');
        }

        const markdown = await response.text();

        // Parse frontmatter and content
        const { frontmatter, content } = parseFrontmatter(markdown);

        // Update page title
        document.title = `${frontmatter.title} - The Money-Printing Press`;

        // Display post metadata
        document.getElementById('post-title').textContent = frontmatter.title;
        document.getElementById('post-date').textContent = new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Display tags
        const tagsContainer = document.getElementById('post-tags');
        tagsContainer.innerHTML = frontmatter.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');

        // Render markdown content
        document.getElementById('blog-content').innerHTML = renderMarkdown(content);

    } catch (error) {
        console.error('Error loading blog post:', error);
        document.getElementById('blog-content').innerHTML = '<p>Error loading blog post. Please try again later.</p>';
    }
}

// Parse frontmatter from markdown
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: markdown };
    }

    const frontmatterText = match[1];
    const content = match[2];

    // Parse YAML frontmatter (simple parser)
    const frontmatter = {};
    frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');

            // Parse arrays (tags)
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
            }

            // Parse booleans
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            frontmatter[key] = value;
        }
    });

    return { frontmatter, content };
}

// Simple markdown renderer
function renderMarkdown(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Blockquotes
    html = html.replace(/^&gt; (.+)/gim, '<blockquote>$1</blockquote>');
    html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

    // Lists
    html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');

    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/g, match => {
        return '<ul>' + match + '</ul>';
    });

    // Paragraphs
    const lines = html.split('\n');
    let inParagraph = false;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip if line is empty or already wrapped in a tag
        if (line === '' || line.match(/^<[^>]+>/)) {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            result.push(line);
        } else {
            if (!inParagraph) {
                result.push('<p>');
                inParagraph = true;
            } else {
                result.push('<br>');
            }
            result.push(line);
        }
    }

    if (inParagraph) {
        result.push('</p>');
    }

    return result.join('\n');
}

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const message = document.getElementById('newsletter-message');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            message.textContent = 'Thank you for subscribing!';
            message.className = 'newsletter-message success';
            form.reset();
        } else {
            message.textContent = 'Please enter a valid email address.';
            message.className = 'newsletter-message error';
        }

        // Clear message after 5 seconds
        setTimeout(() => {
            message.textContent = '';
            message.className = 'newsletter-message';
        }, 5000);
    });
}

// Retirement Calculator
function setupRetirementCalculator() {
    const form = document.getElementById('retirement-form');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const annualIncome = parseFloat(document.getElementById('annual-income').value);
        const yearsToRetirement = parseFloat(document.getElementById('years-to-retirement').value);
        const expectedReturn = parseFloat(document.getElementById('expected-return').value) / 100;
        const withdrawalRate = parseFloat(document.getElementById('withdrawal-rate').value) / 100;

        // Calculate target corpus
        const targetCorpus = annualIncome / withdrawalRate;

        // Calculate monthly savings required using future value of annuity formula
        // FV = PMT * (((1 + r)^n - 1) / r)
        // Solving for PMT: PMT = FV / (((1 + r)^n - 1) / r)
        const monthlyRate = expectedReturn / 12;
        const months = yearsToRetirement * 12;

        let monthlySavings;
        if (monthlyRate === 0) {
            monthlySavings = targetCorpus / months;
        } else {
            monthlySavings = targetCorpus / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
        }

        const totalContributions = monthlySavings * months;
        const interestEarned = targetCorpus - totalContributions;

        // Display results
        document.getElementById('target-corpus').textContent = formatCurrency(targetCorpus);
        document.getElementById('monthly-savings').textContent = formatCurrency(monthlySavings);
        document.getElementById('total-contributions').textContent = formatCurrency(totalContributions);
        document.getElementById('interest-earned').textContent = formatCurrency(interestEarned);

        // Show results section
        document.getElementById('results-section').style.display = 'block';
    });
}

// Format number as currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
