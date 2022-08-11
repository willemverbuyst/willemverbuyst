const Mustache = require('mustache')
const fs = require('fs')

const README_TEMPLATE = './readme.mustache'
const DATA = {
  badges: [
    {
      alt: 'typescript',
      src: 'https://img.shields.io/badge/TYPESCRIPT-informational?style=for-the-badge&logo=TypeScript&logoColor=white',
    },
    {
      alt: 'javascript',
      src: 'https://img.shields.io/badge/JAVASCRIPT-informational?style=for-the-badge&logo=JavaScript&logoColor=white',
    },
    {
      alt: 'nodejs',
      src: 'https://img.shields.io/badge/NODEJS-informational?style=for-the-badge&logo=node.js&logoColor=white',
    },
    {
      alt: 'html',
      src: 'https://img.shields.io/badge/HTML5-informational?style=for-the-badge&logo=HTML5&logoColor=white',
    },
    {
      alt: 'css',
      src: 'https://img.shields.io/badge/CSS3-informational?style=for-the-badge&logo=CSS3&logoColor=white',
    },
    {
      alt: 'sass',
      src: 'https://img.shields.io/badge/SASS-informational?style=for-the-badge&logo=Sass&logoColor=white',
    },
    {
      alt: 'mui',
      src: 'https://img.shields.io/badge/MUI-informational?style=for-the-badge&logo=Mui&logoColor=white',
    },
    {
      alt: 'antdesign',
      src: 'https://img.shields.io/badge/ANT%20DESIGN-informational?style=for-the-badge&logo=Antdesign&logoColor=white',
    },
    {
      alt: 'bootstrap',
      src: 'https://img.shields.io/badge/BOOTSTRAP-informational?style=for-the-badge&logo=Bootstrap&logoColor=white',
    },
    {
      alt: 'styledcomponents',
      src: 'https://img.shields.io/badge/STYLED%20COMPONENTS-informational?style=for-the-badge&logo=Styled-components&logoColor=white',
    },
    {
      alt: 'react',
      src: 'https://img.shields.io/badge/REACT-informational?style=for-the-badge&logo=React&logoColor=white',
    },
    {
      alt: 'angular',
      src: 'https://img.shields.io/badge/ANGULAR-informational?style=for-the-badge&logo=Angular&logoColor=white',
    },
    {
      alt: 'svelte',
      src: 'https://img.shields.io/badge/SVELTE-informational?style=for-the-badge&logo=Svelte&logoColor=white',
    },
    {
      alt: 'redux',
      src: 'https://img.shields.io/badge/REDUX-informational?style=for-the-badge&logo=Redux&logoColor=white',
    },
    {
      alt: 'reactquery',
      src: 'https://img.shields.io/badge/REACTQUERY-informational?style=for-the-badge&logo=ReactQuery&logoColor=white',
    },
    {
      alt: 'chartjs',
      src: 'https://img.shields.io/badge/CHARTJS-informational?style=for-the-badge&logo=chart.js&logoColor=white',
    },
    {
      alt: 'threejs',
      src: 'https://img.shields.io/badge/THREEJS-informational?style=for-the-badge&logo=three.js&logoColor=white',
    },
    {
      alt: 'jest',
      src: 'https://img.shields.io/badge/JEST-informational?style=for-the-badge&logo=Jest&logoColor=white',
    },
    {
      alt: 'cypress',
      src: 'https://img.shields.io/badge/CYPRESS-informational?style=for-the-badge&logo=Cypress&logoColor=white',
    },
    {
      alt: 'puppeteer',
      src: 'https://img.shields.io/badge/PUPPETEER-informational?style=for-the-badge&logo=Puppeteer&logoColor=white',
    },
    {
      alt: 'docker',
      src: 'https://img.shields.io/badge/DOCKER-informational?style=for-the-badge&logo=Docker&logoColor=white',
    },
    {
      alt: 'git',
      src: 'https://img.shields.io/badge/GIT-informational?style=for-the-badge&logo=Git&logoColor=white',
    },
    {
      alt: 'npm',
      src: 'https://img.shields.io/badge/NPM-informational?style=for-the-badge&logo=npm&logoColor=white',
    },
    {
      alt: 'githubactions',
      src: 'https://img.shields.io/badge/GITHUB-ACTIONS-informational?style=for-the-badge&logo=GithubActions&logoColor=white',
    },
    {
      alt: 'webpack',
      src: 'https://img.shields.io/badge/WEBPACK-informational?style=for-the-badge&logo=Webpack&logoColor=white',
    },
    {
      alt: 'bash',
      src: 'https://img.shields.io/badge/BASH-informational?style=for-the-badge&logo=gnu-bash&logoColor=white',
    },
    {
      alt: 'powershell',
      src: 'https://img.shields.io/badge/POWERSHELL-informational?style=for-the-badge&logo=PowerShell&logoColor=white',
    },
    {
      alt: 'python',
      src: 'https://img.shields.io/badge/PYTHON-informational?style=for-the-badge&logo=PYTHON&logoColor=white',
    },
    {
      alt: 'fastapi',
      src: 'https://img.shields.io/badge/FASTAPI-informational?style=for-the-badge&logo=Fastapi&logoColor=white',
    },
    {
      alt: 'vba',
      src: 'https://img.shields.io/badge/VBA-informational?style=for-the-badge&logo=VBA&logoColor=white',
    },
    {
      alt: 'go',
      src: 'https://img.shields.io/badge/GO-informational?style=for-the-badge&logo=Go&logoColor=white',
    },
  ],
}

function generateReadMe() {
  fs.readFile(README_TEMPLATE, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync('README.md', output)
  })
}

generateReadMe()
