---
category: Basic
available: Vue
---

<script setup>
import { CAButtonName } from '@agufaui/theme'
</script>

# Button

Basic button with icon and loading.

## Usage

#### Import

```ts
import { AButton } from "@agufaui/${framework name}";
```

#### Html

`<a-button />` or `<AButton />`

#### Configuration

Theme component name: `{{ CAButtonName }}`

## Showcase

- Loading button is disabled automatically
- Examples are using AgufaUI provided theme and Vue
- Hover and click button to see different effects

<DocButton />

::: details Click to see code
<<< @/core/button/DocButton.vue#showcase
:::

## Slot

One default slot

## AgufaUI provided Theme Types

`CDefaultType` is just string constant "default"

<<< @/theme/default/AButton.ts

## Attributes (Properties)

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
