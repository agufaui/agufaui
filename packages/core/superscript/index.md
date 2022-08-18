---
category: Basic
---

<script setup>
import { CASupName } from '@agufaui/theme'
</script>

# Superscript

Basic sup with icon.

## Usage

#### Import

```ts
import { Asup } from "@agufaui/${framework name}";
```

#### Html

`<asup />` or `<Asup />`

#### Configuration

Theme component name: `{{ CASupName }}`

## Showcase

<DocSup />

::: details Click to see code
<<< @/core/superscript/DocSup.vue#showcase
:::

## Slot

One default slot replace sup content including icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/ASup.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/superscript/Asup.vue#props

### Unique

<<< @/theme/types/ASup.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
