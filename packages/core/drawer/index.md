---
category: Basic
---

<script setup>
import { CADrawerName } from '@agufaui/theme'
</script>

# Drawer

Basic Drawer.

## Usage

#### Import

```ts
import { Adrawer } from "@agufaui/${framework name}";
```

#### Html

`<adrawer />` or `<Adrawer />`

#### Configuration

Theme component name: `{{ CADrawerName }}`

## Showcase

<DocDrawer />

::: details Click to see code
<<< @/core/drawer/DocDrawer.vue#showcase
:::

## Slot

One default slot for content.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ADrawer.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/drawer/Adrawer.vue#props

### Unique

<<< @/theme/types/basic/ADrawer.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

## Events

<<< @/theme/types/basic/ADrawer.ts#emits

