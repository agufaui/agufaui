---
category: Basic
---

<script setup>
import { CABadgeName } from '@agufaui/theme'
</script>

# Badge

Basic badge with icon.

## Usage

#### Import

```ts
import { Abadge } from "@agufaui/${framework name}";
```

#### Html

`<abadge />` or `<Abadge />`

#### Configuration

Theme component name: `{{ CABadgeName }}`

## Showcase

<DocBadge />

::: details Click to see code
<<< @/core/badge/DocBadge.vue#showcase
:::

## Slot

One default slot replace badge content including icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/ABadge.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/badge/Abadge.vue#props

### Unique

<<< @/theme/types/ABadge.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
