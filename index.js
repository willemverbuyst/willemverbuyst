const puppeteer = require("puppeteer");
const Mustache = require("mustache");
const fs = require("fs");

const README_TEMPLATE = "./readme.mustache";
const NUMBER_OF_PAGES = 3;

async function scrapeTopics(page, url) {
  await page.goto(url);
  const topics = await page.evaluate(() =>
    [...document.querySelectorAll(".topic-tag")].map((tag) => tag.innerText),
  );
  return topics;
}

async function runPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const baseUrl = "https://github.com/willemverbuyst?tab=repositories";
  let allTopics = [];

  for (let i = 1; i <= NUMBER_OF_PAGES; i++) {
    const url = i === 1 ? baseUrl : `${baseUrl}&page=${i}`;
    const topics = await scrapeTopics(page, url);
    allTopics = allTopics.concat(topics);
  }

  await page.close();
  await browser.close();

  return allTopics;
}

function removeDuplicates(topics) {
  topics.sort(
    (a, b) =>
      topics.filter((topic) => topic === b).length -
      topics.filter((topic) => topic === a).length,
  );
  return [...new Set(topics)];
}

function cleanupTopics(topics) {
  return topics.map((topic) => topic.replace(/-/g, "."));
}

async function generateReadMe() {
  fs.readFile(README_TEMPLATE, (err, data) => {
    if (err) throw err;
    runPuppeteer().then((topics) => {
      const uniqueTopics = removeDuplicates(topics);
      const topicsCleaned = cleanupTopics(uniqueTopics);
      const DATA = {
        date: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
        badges: topicsCleaned.map((badge) => ({
          alt: badge,
          src: `https://img.shields.io/badge/${badge}-informational?style=for-the-badge&logo=${badge}&logoColor=white`,
        })),
      };
      const output = Mustache.render(data.toString(), DATA);
      fs.writeFileSync("README.md", output);
    });
  });
}

generateReadMe();
