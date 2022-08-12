const Mustache = require('mustache')
const fs = require('fs')

const README_TEMPLATE = './readme.mustache'
const BADGES = [
  'typescript',
  'javascript',
  'node.js',
  'html5',
  'css3',
  'sass',
  'mui',
  'antdesign',
  'bootstrap',
  'styledcomponents',
  'react',
  'angular',
  'redux',
  'reactquery',
  'chart.js',
  'three.js',
  'jest',
  'cypress',
  'puppeteer',
  'docker',
  'git',
  'npm',
  'githubactions',
  'webpack',
  'bash',
  'powershell',
  'python',
  'fastapi',
  'vba',
  'go',
]

function generateReadMe() {
  fs.readFile(README_TEMPLATE, (err, data) => {
    if (err) throw err
    const DATA = {
      date: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
      badges: BADGES.map((badge) => ({
        alt: badge,
        src: `https://img.shields.io/badge/${badge}-informational?style=for-the-badge&logo=${badge}&logoColor=white`,
      })),
    }
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync('README.md', output)
  })
}

generateReadMe()
