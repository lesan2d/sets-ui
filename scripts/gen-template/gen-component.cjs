#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * ============================
 * 1️⃣ 获取组件名称
 * ============================
 */

const componentName = process.argv[2]

if (!componentName) {
  console.log('❌ 请输入组件名称，例如: pnpm gen text')
  process.exit(1)
}

// 只允许 kebab-case
if (!/^[a-z][a-z0-9-]*$/.test(componentName)) {
  console.log('❌ 组件名必须为 kebab-case，例如: text-button')
  process.exit(1)
}

/**
 * ============================
 * 2️⃣ 工具函数
 * ============================
 */

// kebab-case -> PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function renderTemplate(templatePath, data) {
  if (!fs.existsSync(templatePath)) {
    console.log(`❌ 模板文件不存在: ${templatePath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(templatePath, 'utf-8')

  return content.replace(/{{(.*?)}}/g, (_, key) => {
    return data[key.trim()] ?? ''
  })
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath)
  ensureDir(dir)

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  已存在: ${filePath}`)
    return
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅ 创建: ${filePath}`)
}

function appendExport(filePath, componentName) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  入口文件不存在: ${filePath}`)
    return
  }

  const fileText = fs.readFileSync(filePath, 'utf-8')

  const exportLine = `export * from './${componentName}'`

  if (fileText.includes(exportLine)) {
    return
  }

  fs.appendFileSync(filePath, `\n${exportLine}`, 'utf-8')
  console.log('🔗 已自动注册到 components/index.ts')
}

// 自动注册
function appendFile(filePath, content, name) {
  if (!fs.existsSync(filePath)) return

  const fileText = fs.readFileSync(filePath, 'utf-8')

  if (fileText.includes(`'./${name}'`)) {
    return
  }

  fs.appendFileSync(filePath, `\n${content}`)
  console.log(`🔗 已自动注册`)
}

/**
 * ============================
 * 3️⃣ 初始化变量
 * ============================
 */

const name = componentName.toLowerCase()
const PascalName = toPascalCase(name)

const root = process.cwd()
const templateDir = path.join(__dirname, 'templates')

const data = {
  name,
  PascalName
}

/**
 * ============================
 * 4️⃣ 路径定义
 * ============================
 */

const paths = {
  docsMd: path.join(root, `docs/component/${name}.md`),

  demosIndex: path.join(root, `docs/demos/${name}/index.ts`),
  demosBasic: path.join(root, `docs/demos/${name}/${name}-basic.vue`),

  pkgIndex: path.join(root, `packages/components/${name}/index.ts`),
  pkgVue: path.join(root, `packages/components/${name}/src/${name}.vue`),
  pkgTypes: path.join(root, `packages/components/${name}/src/types.ts`),
  pkgStyle: path.join(root, `packages/styles/src/${name}.scss`),

  componentsEntry: path.join(root, `packages/components/index.ts`),
  stylesEntry: path.join(root, `packages/styles/src/index.scss`)
}

/**
 * ============================
 * 5️⃣ 创建文件
 * ============================
 */

const fileMappings = [
  {
    output: paths.docsMd,
    template: 'component/docs/component/index.md'
  },
  {
    output: paths.demosIndex,
    template: 'component/docs/demos/index.ts'
  },
  {
    output: paths.demosBasic,
    template: 'component/docs/demos/basic.vue'
  },
  {
    output: paths.pkgIndex,
    template: 'component/packages/components/index.ts'
  },
  {
    output: paths.pkgVue,
    template: 'component/packages/components/src/component.vue'
  },
  {
    output: paths.pkgTypes,
    template: 'component/packages/components/src/types.ts'
  },
  {
    output: paths.pkgStyle,
    template: 'component/packages/styles/index.scss'
  }
]

fileMappings.forEach(({ output, template }) => {
  writeFile(
    output,
    renderTemplate(path.join(templateDir, template), data)
  )
})

// 引入 ts
appendFile(
  paths.componentsEntry,
  `export * from './${name}'`,
  name
)

// 引入 scss
appendFile(
  paths.stylesEntry,
  `@use './${name}.scss';`,
  name
)

console.log('\n🎉 组件创建完成！\n')
