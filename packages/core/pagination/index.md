---
category: Table
---

<script setup>
import { CAPaginationName } from '@agufaui/theme'
</script>

# Pagination

Table pagination

## Usage

#### Import

```ts
import { Apagination } from "@agufaui/${framework name}";
```

#### Html

`<apagination />` or `<Apagination />`

#### Configuration

Theme component name: `{{ CAPaginationName }}`

## Showcase

<DocPagination />

::: details Click to see code
<<< @/core/pagination/DocPagination.vue#showcase
:::

## Slot

- One named slot 'previous' for 'Previous' word
- One named slot 'next' for 'Next' word

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/table/APagination.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/table/Apagination.vue#props

### Unique

<<< @/theme/types/table/APagination.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

## Events

<<< @/theme/types/table/APagination.ts#emits
