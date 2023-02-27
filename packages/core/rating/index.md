---
category: Utility
---

<script setup>
import { CARatingName } from '@agufaui/theme'
</script>

# Rating

rating

## Usage

#### Import

```ts
import { Arating } from "@agufaui/${framework name}";
```

#### Html

`<arating />` or `<Arating />`

#### Configuration

Theme component name: `{{ CARatingName }}`

## Showcase

- 1st example is readonly
- 2nd example is clickable

<DocRating />

::: details Click to see code
<<< @/core/rating/DocRating.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/utility/ARating.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/rating/Arating.vue#props

### Unique

<<< @/theme/types/utility/ARating.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/utility/ARating.ts#emits
