# Phase 5: Volt Component Migration

## Goal
Copy Volt design system components from reference project and set up auto-registration plugin.

---

## Prerequisites

- Phase 4 completed (project structure created)
- `app/components/volt/` directory exists
- Access to reference project with Volt components

---

## Steps

### 5.1 Copy Core Volt Components

Copy these components from `{REFERENCE_PROJECT}/app/components/volt/`:

**Priority 1 - Essential UI Components:**
```bash
# Navigate to source project
cd {REFERENCE_PROJECT}/app/components/volt

# Copy core components to qr-art-auth
cp Button.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Toast.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Dialog.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Card.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Panel.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
```

**Priority 2 - Form Components:**
```bash
cp InputText.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Select.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Checkbox.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp TextArea.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Password.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
```

**Priority 3 - Data Display:**
```bash
cp DataTable.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
cp Tabs.vue /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
```

---

### 5.2 Verify Components Copied

```bash
cd /Users/kshitijkarke/Documents/github/qr-art-auth
ls -la app/components/volt/
```

You should see at least 12 `.vue` files.

---

### 5.3 Create Volt Plugin (Auto-Registration)

Create `app/plugins/02.voltComponent.ts`:

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  // Dynamically import all components from ~/components/volt/
  const components = import.meta.glob('~/components/volt/**/*.vue', { eager: true })

  // Register each component globally with "Volt" prefix
  for (const path in components) {
    const componentName = path.split('/').pop()?.replace('.vue', '')

    if (componentName) {
      const voltComponentName = `Volt${componentName}`
      nuxtApp.vueApp.component(voltComponentName, (components[path] as any).default)
    }
  }

  // Also register PrimeVue's Column component for DataTable
  nuxtApp.vueApp.component('Column', (await import('primevue/column')).default)
})
```

**What this does**:
- Uses `import.meta.glob()` to find all `.vue` files in `~/components/volt/`
- Registers them globally with "Volt" prefix (e.g., `Button.vue` → `<VoltButton />`)
- Also registers PrimeVue's `Column` component for DataTable usage

---

### 5.4 Test Volt Components

Update `app/pages/index.vue` to test a Volt component:

Add this to the landing page (inside the `<script setup>` tag):

```typescript
const showDialog = ref(false)
```

Add this button below the "Get Started" buttons:

```vue
<VoltButton
  @click="showDialog = true"
  label="Test Volt Components"
  severity="secondary"
  class="mt-4"
/>

<VoltDialog
  v-model:visible="showDialog"
  header="Volt Dialog Test"
  :style="{ width: '30rem' }"
>
  <p class="text-gray-300">Volt components are working! 🎉</p>
</VoltDialog>
```

---

### 5.5 Verify Volt Components Work

```bash
pnpm dev
```

Visit http://localhost:3000 and:
1. Click "Test Volt Components" button
2. Dialog should open
3. No console errors

---

## Alternative: Copy ALL Volt Components

If you want to copy **all ~70 Volt components** at once:

```bash
# Copy entire volt directory
cp -r {REFERENCE_PROJECT}/app/components/volt/* \
  /Users/kshitijkarke/Documents/github/qr-art-auth/app/components/volt/
```

**Pros**: Complete design system available immediately
**Cons**: Larger bundle size, may include unused components

---

## Verification Checklist

- [ ] At least 12 Volt components copied to `app/components/volt/`
- [ ] `app/plugins/02.voltComponent.ts` created
- [ ] Plugin auto-registers components with "Volt" prefix
- [ ] `<VoltButton />` works on landing page
- [ ] `<VoltDialog />` opens when button clicked
- [ ] No console errors about missing components
- [ ] TypeScript doesn't complain about VoltButton/VoltDialog

---

## File Structure After Phase 5

```
qr-art-auth/
├── app/
│   ├── components/
│   │   └── volt/
│   │       ├── Button.vue         ✅ NEW
│   │       ├── Toast.vue          ✅ NEW
│   │       ├── Dialog.vue         ✅ NEW
│   │       ├── Card.vue           ✅ NEW
│   │       ├── Panel.vue          ✅ NEW
│   │       ├── InputText.vue      ✅ NEW
│   │       ├── Select.vue         ✅ NEW
│   │       ├── Checkbox.vue       ✅ NEW
│   │       ├── TextArea.vue       ✅ NEW
│   │       ├── Password.vue       ✅ NEW
│   │       ├── DataTable.vue      ✅ NEW
│   │       └── Tabs.vue           ✅ NEW
│   ├── plugins/
│   │   └── 02.voltComponent.ts    ✅ NEW
│   └── ...
└── ...
```

---

## Available Volt Components

After copying, you can use:

| Component | Usage | Purpose |
|-----------|-------|---------|
| `<VoltButton />` | Buttons | Primary, secondary, danger buttons |
| `<VoltInputText />` | Text input | Single-line text fields |
| `<VoltPassword />` | Password | Password input with toggle |
| `<VoltTextArea />` | Multi-line | Long text input |
| `<VoltSelect />` | Dropdown | Select from options |
| `<VoltCheckbox />` | Checkbox | Boolean input |
| `<VoltDialog />` | Modal | Popup dialogs |
| `<VoltToast />` | Notifications | Success/error messages |
| `<VoltCard />` | Container | Card layout |
| `<VoltPanel />` | Section | Collapsible panels |
| `<VoltDataTable />` | Table | Data display with pagination |
| `<VoltTabs />` | Tabs | Tabbed navigation |

---

## Troubleshooting

### "Cannot find module 'primevue/column'"
Install PrimeVue if not already:
```bash
pnpm add primevue
```

### TypeScript error: "Cannot find name 'VoltButton'"
This is expected in `.vue` files. The components are registered at runtime.
Add `// @ts-ignore` above the component if needed.

### Components not rendering
Check plugin is loaded:
```bash
# Should see 02.voltComponent.ts in plugins
ls -la app/plugins/
```

### "import.meta.glob is not a function"
Make sure you're using Nuxt 4 and Vite:
```bash
pnpm list nuxt
# Should show 4.2.1+
```

---

## Optional: Copy Additional Components Later

You can copy more components as needed:
- `DatePicker.vue` - Date selection
- `InputMask.vue` - Formatted input (phone, credit card)
- `InputNumber.vue` - Numeric input with +/- buttons
- `AutoComplete.vue` - Searchable dropdown
- `FileUpload.vue` - File upload widget
- `ProgressBar.vue` - Loading indicator
- `Skeleton.vue` - Loading placeholders
- `Badge.vue` - Status badges
- `Tag.vue` - Tags/chips

---

## Next Phase

✅ **Phase 5 Complete!**

Proceed to **[PHASE-6-documentation.md](PHASE-6-documentation.md)** to create progressive disclosure documentation.

---

## What We Accomplished

- ✅ Copied 12 essential Volt components from reference project
- ✅ Created plugin to auto-register Volt components globally
- ✅ Tested VoltButton and VoltDialog on landing page
- ✅ Verified components work without errors

**Files created**: 12 Volt components + `02.voltComponent.ts` plugin
