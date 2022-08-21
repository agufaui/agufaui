---
category: Navigation
---

<script setup>
import { CAMobileName } from '@agufaui/theme'
</script>

# Mobile

Mobile menu icon.

## Usage

#### Import

```ts
import { Amobile } from "@agufaui/${framework name}";
```

#### Html

`<amobile />` or `<Amobile />`

#### Configuration

Theme component name: `{{ CAMobileName }}`

## Showcase

- Hover and click mobile menu to see different effects

<DocMobile />

::: details Click to see code
<<< @/core/mobile/DocMobile.vue#showcase
:::

## Slot

One default slot replace mobile icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AMobile.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/mobile/Amobile.vue#props

### Unique

<<< @/theme/types/AMobile.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

## Events

<<< @/theme/types/AMobile.ts#emits
