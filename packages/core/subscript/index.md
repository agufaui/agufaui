---
category: Basic
---

<script setup>
import { CASubName } from '@agufaui/theme'
</script>

# Subscript

Basic sub with icon.

## Usage

#### Import

```ts
import { Asub } from "@agufaui/${framework name}";
```

#### Html

`<asub />` or `<Asub />`

#### Configuration

Theme component name: `{{ CASubName }}`

## Showcase

<DocSub />

::: details Click to see code
<<< @/core/subscript/DocSub.vue#showcase
:::

## Slot

One default slot replace sub content including icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/ASub.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/subscript/Asub.vue#props

### Unique

<<< @/theme/types/ASub.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
