# My Updates Website

A simple, markdown-driven website for sharing updates and videos. Built with HTML, CSS, and JavaScript.

## Local Development

To run this site locally, you'll need a local web server due to CORS restrictions when loading local files. Here are a few options:

### Using Python (Python 3)
```bash
python -m http.server 8000
```

### Using Node.js
```bash
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Adding Content

### Posts
1. Add your markdown files to the `content/posts` directory
2. The main post content is loaded from `content/posts/README.md`

### Contact Information
1. Edit `content/contact.md` to update your contact information
2. The contact section automatically loads and renders this markdown file

### Videos
1. Edit `content/videos.json` to add your videos
2. For each video, you'll need:
   - title: Video title
   - embedCode: YouTube embed code (replace SAMPLE_ID with your video ID)
   - description: Video description
   - date: Publication date

## Deploying to GitHub Pages

1. Create a new repository on GitHub
2. If you want to use your GitHub username as the site URL:
   - Name the repository: `username.github.io`
   - Your site will be available at: `https://username.github.io`
3. Or for a project site:
   - Choose any repository name
   - Your site will be available at: `https://username.github.io/repository-name`
4. Push this code to your repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```
5. Go to repository Settings > Pages
6. Under "Source", select your main branch
7. Click Save and wait a few minutes for your site to deploy

## Customization

- Edit `css/styles.css` to customize the site's appearance
- Modify `index.html` to change the page structure
- Update `js/main.js` to adjust content loading behavior
