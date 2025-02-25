import os

import requests

# GitHub API details
GITHUB_API_URL = "https://api.github.com"
USERNAME = "willemverbuyst"
TOKEN = os.getenv("GITHUB_TOKEN")

# Headers for authentication and preview API version
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "X-GitHub-Api-Version": "2022-11-28",
    "Accept": "application/vnd.github+json"
}

def get_repositories():
    """Fetch all repositories of the authenticated user."""
    url = f"{GITHUB_API_URL}/users/{USERNAME}/repos?per_page=100"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        print("Error fetching repositories:", response.json())
        return []

    return response.json()

def get_repo_topics(repo_name):
    """Fetch topics for a given repository."""
    url = f"{GITHUB_API_URL}/repos/{USERNAME}/{repo_name}/topics"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        return []

    return response.json().get("names", [])

def update_readme(repo_topics):
    """Update the README file with repository topics."""
    readme_path = "README.md"

    with open(readme_path, "w") as f:
        f.write("# 📌 Repository Topics\n\n")
        for repo, topics in repo_topics.items():
            topics_str = ", ".join(topics) if topics else "No topics"
            f.write(f"- **{repo}**: {topics_str}\n")

    print("README.md updated successfully!")

if __name__ == "__main__":
    repos = get_repositories()
    repo_topics = {repo["name"]: get_repo_topics(repo["name"]) for repo in repos}
    
    update_readme(repo_topics)
