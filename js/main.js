// Load site configuration
async function loadConfig() {
    try {
        const response = await fetch('mydata.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading site configuration:', error);
        return null;
    }
}

// Utility function to fetch and parse markdown content
async function fetchMarkdown(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return marked.parse(text);
    } catch (error) {
        console.error('Error fetching markdown:', error);
        return '<p>Error loading content</p>';
    }
}

// Load and display posts
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    try {
        const response = await fetch('content/posts/README.md');
        const markdown = await response.text();
        const html = marked.parse(markdown);
        postsContainer.innerHTML = `<div class="post markdown-content">${html}</div>`;
    } catch (error) {
        postsContainer.innerHTML = '<p>No posts available yet.</p>';
    }
}

// Load and display videos
async function loadVideos() {
    const videosContainer = document.getElementById('videos-container');
    try {
        const [videosResponse, configResponse] = await Promise.all([
            fetch('content/videos.json'),
            fetch('mydata.json')
        ]);
        
        const videos = await videosResponse.json();
        const config = await configResponse.json();
        
        // Add YouTube channel information
        const channelInfo = config.socialMedia.youtube;
        videosContainer.innerHTML = `
            <div class="channel-info">
                <h3><a href="${channelInfo.channelUrl}" target="_blank">${channelInfo.channelName}</a></h3>
            </div>
            ${videos.map(video => `
                <div class="video">
                    <h3>${video.title}</h3>
                    <div class="video-embed">
                        ${video.embedCode}
                    </div>
                    <p>${video.description}</p>
                    <p class="video-date">Posted: ${new Date(video.date).toLocaleDateString()}</p>
                </div>
            `).join('')}`;
    } catch (error) {
        videosContainer.innerHTML = '<p>No videos available yet.</p>';
    }
}

// Load and display contact information
async function loadContact() {
    const contactContainer = document.getElementById('contact-container');
    try {
        const [markdownResponse, configResponse] = await Promise.all([
            fetch('content/contact.md'),
            fetch('mydata.json')
        ]);
        
        const markdown = await markdownResponse.text();
        const config = await configResponse.json();
        
        // Replace placeholders with data from mydata.json
        let updatedMarkdown = markdown
            .replace('{{github}}', `[@pleabargain](${config.personalInfo.github})`)
            .replace('{{linkedin}}', `[Dennis G Daniels](${config.personalInfo.linkedin})`)
            .replace('{{telegram}}', `[Telegram](${config.personalInfo.telegram})`)
            .replace('{{email}}', `[${config.personalInfo.email}](mailto:${config.personalInfo.email})`);
        
        const html = marked.parse(updatedMarkdown);
        contactContainer.innerHTML = `<div class="markdown-content">${html}</div>`;
    } catch (error) {
        contactContainer.innerHTML = '<p>Contact information unavailable.</p>';
        console.error('Error loading contact information:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const config = await loadConfig();
    if (config) {
        // Update page title dynamically
        document.title = config.siteContent.siteTitle;
        
        // Update footer text
        const footer = document.querySelector('footer p');
        if (footer) {
            footer.textContent = config.siteContent.footerText;
        }
    }
    
    loadPosts();
    loadVideos();
    loadContact();
});
