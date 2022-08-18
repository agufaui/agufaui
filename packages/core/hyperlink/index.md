---
category: Basic
---

<script setup>
import { CAAName } from '@agufaui/theme'
</script>

# Hyperlink

Basic hyperlink with icon and loading.

## Usage

#### Import

```ts
import { Aa } from "@agufaui/${framework name}";
```

#### Html

`<aa />` or `<Aa />`

#### Configuration

Theme component name: `{{ CAAName }}`

## Showcase

- Hyperlink is basically like a button with html hyperlink element `<a>` attributes
- Loading hyperlink is disabled automatically
- Hover and click hyperlink to see different effects, it will open a new browser tab/window

<DocA />

::: details Click to see code
<<< @/core/hyperlink/DocA.vue#showcase
:::

## Slot

One default slot replace hyperlink content including icon and loading icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AA.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/hyperlink/Aa.vue#props

### Unique

<<< @/theme/types/AA.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsLoading

<<< @/theme/prop.type.ts#ipropsloading

## Events

<<< @/theme/types/AA.ts#emits
