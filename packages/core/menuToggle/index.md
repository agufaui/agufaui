---
category: Navigation
---

<script setup>
import { CAMtoggleName } from '@agufaui/theme'
</script>

# Menu Toggle

Menu toggle icon.

## Usage

#### Import

```ts
import { Amtoggle } from "@agufaui/${framework name}";
```

#### Html

`<amtoggle />` or `<Amtoggle />`

#### Configuration

Theme component name: `{{ CAMtoggleName }}`

## Showcase

- Hover and click mobile menu to see different effects

<DocMenuToggle />

::: details Click to see code
<<< @/core/menuToggle/DocMenuToggle.vue#showcase
:::

## Slot

One default slot replace mobile icon and text.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AMtoggle.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuToggle/Amtoggle.vue#props

### Unique

<<< @/theme/types/AMtoggle.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

## Events

<<< @/theme/types/AMtoggle.ts#emits
