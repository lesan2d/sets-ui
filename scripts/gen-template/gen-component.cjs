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

/**
 * ============================
 * 3️⃣ 自动生成 components.ts
 * ============================
 */

function generateComponentsEntry(root) {
  const componentsDir = path.join(root, 'packages/components')
  const outputFile = path.join(root, 'packages/main/components.ts')

  const dirs = fs.readdirSync(componentsDir)
    .filter(dir => {
      const fullPath = path.join(componentsDir, dir)
      return fs.statSync(fullPath).isDirectory()
    })
    .sort()

  const imports = dirs.map(dir =>
    `import { S${toPascalCase(dir)} } from '@sets-ui/components/${dir}';`
  )

  const plugins = dirs.map(dir =>
    `  S${toPascalCase(dir)},`
  )

  const content = `
import type { Plugin } from 'vue';

${imports.join('\n')}

export default [
${plugins.join('\n')}
] as Plugin[];
`.trim() + '\n'

  fs.writeFileSync(outputFile, content, 'utf-8')
  console.log('🔄 已自动生成 packages/main/components.ts')
}

/**
 * ============================
 * 4️⃣ 自动生成 styles index.scss
 * ============================
 */

function generateStyleEntry(root) {
  const stylesDir = path.join(root, 'packages/styles/components')
  const outputFile = path.join(stylesDir, 'index.scss')

  if (!fs.existsSync(stylesDir)) return

  const files = fs.readdirSync(stylesDir)
    .filter(file => file.endsWith('.scss') && file !== 'index.scss')
    .sort()

  const imports = files.map(file =>
    `@use './${file}';`
  )

  fs.writeFileSync(outputFile, imports.join('\n') + '\n', 'utf-8')
  console.log('🎨 已自动生成 styles/components/index.scss')
}

/**
 * ============================
 * 5️⃣ 自动生成 demos index.ts
 * ============================
 */

function generateDemosEntry(root) {
  const demosDir = path.join(root, 'docs/demos')
  const outputFile = path.join(demosDir, 'index.ts')

  if (!fs.existsSync(demosDir)) return

  const dirs = fs.readdirSync(demosDir)
    .filter(dir => {
      const fullPath = path.join(demosDir, dir)
      return fs.statSync(fullPath).isDirectory()
    })
    .sort()

  const imports = dirs.map(dir =>
    `import ${toPascalCase(dir)}Demos from './${dir}';`
  )

  const spreads = dirs.map(dir =>
    `  ...${toPascalCase(dir)}Demos,`
  )

  const content = `
${imports.join('\n')}

const demos = [
${spreads.join('\n')}
];

const installer = (plugin: Array<any>) => {
  return {
    install: (app: any) => {
      plugin.forEach((i) => {
        app.use(i);
      });
    },
  };
};

export default installer(demos);
`.trim() + '\n'

  fs.writeFileSync(outputFile, content, 'utf-8')
  console.log('📦 已自动生成 docs/demos/index.ts')
}

/**
 * ============================
 * 6️⃣ 初始化变量
 * ============================
 */

const name = componentName.toLowerCase()
const PascalName = toPascalCase(name)

const root = process.cwd()
const templateDir = path.join(__dirname, 'templates')

const data = { name, PascalName }

/**
 * ============================
 * 7️⃣ 路径定义
 * ============================
 */

const paths = {
  docsMd: path.join(root, `docs/component/${name}.md`),

  demosIndex: path.join(root, `docs/demos/${name}/index.ts`),
  demosBasic: path.join(root, `docs/demos/${name}/${name}-basic.vue`),

  pkgIndex: path.join(root, `packages/components/${name}/index.ts`),
  pkgVue: path.join(root, `packages/components/${name}/src/${name}.vue`),
  pkgTypes: path.join(root, `packages/components/${name}/src/types.ts`),
  pkgStyle: path.join(root, `packages/styles/components/${name}.scss`)
}

/**
 * ============================
 * 8️⃣ 创建文件
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

/**
 * ============================
 * 9️⃣ 自动重新生成所有入口
 * ============================
 */

generateComponentsEntry(root)
generateStyleEntry(root)
generateDemosEntry(root)

console.log('\n🎉 组件创建完成！（组件 / 样式 / demos 已自动注册）\n')