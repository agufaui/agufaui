---
category: Basic
---

<script setup>
import { CASearchName } from '@agufaui/theme'
</script>

# Search

Basic search.

## Usage

#### Import

```ts
import { Asearch } from "@agufaui/${framework name}";
```

#### Html

`<asearch />` or `<Asearch />`

#### Configuration

Theme component name: `{{ CASearchName }}`

## Showcase
- default `maxlength` is 255
- For Vue `v-model`, need to use `v-model:v="variable"`

<DocSearch />

::: details Click to see code
<<< @/core/search/DocSearch.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ASearch.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/search/Asearch.vue#props

### Unique

<<< @/theme/types/basic/ASearch.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ASearch.ts#emits
