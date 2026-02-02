# Testing Standards - QR-Art-Auth

## Testing Strategy

### Not Yet Configured

Testing will be added in future phases using:
- **Vitest** - Unit and integration tests
- **Playwright** - End-to-end tests

---

## Future Setup

### Install Testing Dependencies

```bash
pnpm add -D vitest @nuxt/test-utils @playwright/test
```

### Configure Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

---

## Unit Testing (Vitest)

### Component Test Example

```typescript
// tests/components/QRGenerator.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QRGenerator from '~/components/qr/QRGenerator.vue'

describe('QRGenerator', () => {
  it('renders QR code with correct data', () => {
    const wrapper = mount(QRGenerator, {
      props: {
        qrData: 'https://example.com'
      }
    })

    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('emits update event when QR data changes', async () => {
    const wrapper = mount(QRGenerator)
    await wrapper.find('input').setValue('new data')

    expect(wrapper.emitted('update')).toBeTruthy()
  })
})
```

### Composable Test Example

```typescript
// tests/composables/useQRGenerator.test.ts
import { describe, it, expect, vi } from 'vitest'
import { useQRGenerator } from '~/composables/useQRGenerator'

describe('useQRGenerator', () => {
  it('generates QR code successfully', async () => {
    const { generate, generatedUrl } = useQRGenerator()

    await generate('image-data', 'https://example.com')

    expect(generatedUrl.value).toBeTruthy()
  })
})
```

---

## E2E Testing (Playwright)

### Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000'
  }
})
```

### E2E Test Example

```typescript
// tests/e2e/qr-generation.spec.ts
import { test, expect } from '@playwright/test'

test('user can generate QR code', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Get Started')

  // Upload image
  await page.setInputFiles('input[type="file"]', 'test-image.png')

  // Generate QR
  await page.fill('input[name="qrData"]', 'https://example.com')
  await page.click('text=Generate AI QR')

  // Verify result
  await expect(page.locator('.generated-qr')).toBeVisible()
})
```

---

## Test Organization

```
tests/
├── components/
│   ├── QRGenerator.test.ts
│   └── ImageUploader.test.ts
├── composables/
│   └── useQRGenerator.test.ts
├── stores/
│   └── qr.test.ts
└── e2e/
    ├── qr-generation.spec.ts
    └── mobile-auth.spec.ts
```

---

## Coverage Goals

- **Unit Tests**: 80% coverage
- **E2E Tests**: Critical user flows
  - QR generation
  - Mobile auth
  - Image upload

---

## Running Tests (Future)

```bash
# Unit tests
pnpm test

# Unit tests with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e

# E2E tests in UI mode
pnpm test:e2e:ui
```

---

## Best Practices

1. **Test behavior, not implementation**
2. **Write tests for critical paths first**
3. **Mock external APIs (Replicate, OpenAI)**
4. **Use meaningful test descriptions**
5. **Keep tests isolated and independent**
