---
category: Table
---

<script setup>
import { CATableName } from '@agufaui/theme'
</script>

# Table

Basic table

#### Child Components

- [Table panel](/core/tablePanel/)
- [Pagination](/core/pagination/)
- [Dropdown Select](/core/dropdown/)
- [Select Option](/core/select/)
- [Search](/core/search/)
- [Button](/core/button/)
- [Tag](/core/tag/)
- [ALert Error](/core/alertError/)

## Usage

#### Import

```ts
import { Atable } from "@agufaui/${framework name}";
```

#### Html

`<atable />` or `<Atable />`

#### Configuration

Theme component name: `{{ CATableName }}`

## Showcase

<DocTable />

::: details Click to see code
<<< @/core/table/DocTable.vue#showcase
:::

## Slot

- one named slot 'records' for number records per page options label
- one named slot 'actions' for actions for the table
- one named slot 'filterPanel' for filters panel

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/table/ATable.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/table/Atable.vue#props

### Unique

<<< @/theme/types/table/ATable.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

## Events

- events from [Table Panel](/core/tablePanel/) will be dispatched
- for `action` event, `TTpanelEmit type` field values are:
  - `recordsPerPageChange` for changing number of records to show per page
  - `toggleColumn` for hiding or displaying column
  - `search` for searching
  - `searchInput` for user typing
  - `pageChange` when use change page

<<< @/theme/types/table/ATable.ts#emits
