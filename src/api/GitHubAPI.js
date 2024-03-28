require('dotenv').config();

class GitHubAPI {
  constructor() {
    this.headers = {
      'Authorization': `token ${process.env.GH_TOKEN}`,
    };
  }

  async fetchFileContent(url) {
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) {
      throw new Error(`Error fetching content from ${url}: ${response.statusText}`);
    }
    return await response.text();
  }

  async getFiles(url) {
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.json();
  }
}

module.exports = GitHubAPI;
