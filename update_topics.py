import os
from datetime import datetime

import requests
from jinja2 import Environment, FileSystemLoader

GITHUB_API_URL = "https://api.github.com"
USERNAME = "willemverbuyst"
TOKEN = os.getenv("GH_TOKEN")
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
    """Generate README using Jinja2 templating."""
    env = Environment(loader=FileSystemLoader("."))  # Load template from the current directory
    template = env.get_template("template.md")  # Load the template file

    # Badge examples (can be modified dynamically)
    badges = []

    # create an array with all topics, remove duplicates and sort them
    all_topics = set()
    for topics in repo_topics.values():
      all_topics.update(topics)
    all_topics = sorted(all_topics)
    

    
    for topic in all_topics:
      badge = {
        "alt": topic,
        "src": f"https://img.shields.io/badge/{topic}-informational?style=for-the-badge&logo={topic}&logoColor=white"
      }
      badges.append(badge)

    # Render template with data
    rendered_content = template.render(
        badges=badges,
        date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        repo_topics=repo_topics,
    )

    # Write to README.md
    with open("README.md", "w") as f:
        f.write(rendered_content)

    print("README.md updated successfully!")


if __name__ == "__main__":
    repos = get_repositories()
    repo_topics = {repo["name"]: get_repo_topics(repo["name"]) for repo in repos}
    
    update_readme(repo_topics)
