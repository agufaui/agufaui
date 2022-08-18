---
category: Basic
---

<script setup>
import { CAButtonName } from '@agufaui/theme'
</script>

# Button

Basic button with icon and loading.

## Usage

#### Import

```ts
import { Abutton } from "@agufaui/${framework name}";
```

#### Html

`<abutton />` or `<Abutton />`

#### Configuration

Theme component name: `{{ CAButtonName }}`

## Showcase

- Loading button is disabled automatically
- Hover and click button to see different effects

<DocButton />

::: details Click to see code
<<< @/core/button/DocButton.vue#showcase
:::

## Slot

One default slot replace button content including icon and loading icon.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AButton.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/button/Abutton.vue#props

### Unique

<<< @/theme/types/AButton.ts#props

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

<<< @/theme/types/AButton.ts#emits
