const puppeteer = require('puppeteer')
const Mustache = require('mustache')
const fs = require('fs')

const README_TEMPLATE = './readme.mustache'

async function runPuppeteer() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://github.com/willemverbuyst?tab=repositories')
  const frame = page.mainFrame()
  const topics = await frame.evaluate(() =>
    [...document.querySelectorAll('.topic-tag')].map((tag) => tag.innerText)
  )
  await page.close()
  await browser.close()

  return topics
}

function removeDuplicates(topics) {
  return [...new Set(topics)]
}

function cleanupTopics(topics) {
  return topics.map((topic) => topic.replace(/-/g, '.'))
}

async function generateReadMe() {
  fs.readFile(README_TEMPLATE, (err, data) => {
    if (err) throw err
    runPuppeteer().then((topics) => {
      const uniqueTopics = removeDuplicates(topics)
      const topicsCleaned = cleanupTopics(uniqueTopics)
      const DATA = {
        date: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
        badges: topicsCleaned.map((badge) => ({
          alt: badge,
          src: `https://img.shields.io/badge/${badge}-informational?style=for-the-badge&logo=${badge}&logoColor=white`,
        })),
      }
      const output = Mustache.render(data.toString(), DATA)
      fs.writeFileSync('README.md', output)
    })
  })
}

generateReadMe()
