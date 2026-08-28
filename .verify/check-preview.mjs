import { chromium } from 'playwright-core'
import { mkdirSync } from 'fs'
import { join } from 'path'

const outDir = 'c:/Users/dahye/Desktop/연금마켓/.verify'
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
page.setDefaultTimeout(20000)

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: '1분 진단 시작하기' }).click()
await page.getByRole('button', { name: /2030/ }).click()
await page.getByRole('button', { name: /월 300만 원 이하/ }).click()
await page.getByRole('button', { name: /국민연금만 보유/ }).click()
await page.getByRole('button', { name: /소박한 일상형/ }).click()
await page.waitForSelector('text=실제 신청 페이지 미리보기')

const preview = page.locator('img[alt*="프리미엄 1:1"]')
await preview.scrollIntoViewIfNeeded()
await page.waitForTimeout(400)

const info = await preview.evaluate((el) => {
  const s = getComputedStyle(el)
  const r = el.getBoundingClientRect()
  return {
    objectPosition: s.objectPosition,
    objectFit: s.objectFit,
    width: r.width,
    height: r.height,
  }
})
console.log('preview_css', JSON.stringify(info))

await preview.screenshot({ path: join(outDir, 'consult-preview-crop.png') })
await page.screenshot({
  path: join(outDir, 'consult-preview-context.png'),
  fullPage: false,
})

await browser.close()
console.log('ok')
