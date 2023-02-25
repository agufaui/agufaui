---
category: Basic
---

<script setup>
import { CASelectName } from '@agufaui/theme'
</script>

# Select

Basic select.

## Usage

#### Import

```ts
import { Aselect } from "@agufaui/${framework name}";
```

#### Html

`<aselect />` or `<Aselect />`

#### Configuration

Theme component name: `{{ CASelectName }}`

## Showcase

<DocSelect />

::: details Click to see code
<<< @/core/select/DocSelect.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ASelect.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/select/Aselect.vue#props

### Unique

<<< @/theme/types/basic/ASelect.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ASelect.ts#emits
