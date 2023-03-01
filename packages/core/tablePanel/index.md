---
category: Table
---

<script setup>
import { CATpanelName } from '@agufaui/theme'
</script>

# Table Panel

basic table panel

#### Child Components

- [Checkbox](/core/checkbox/)
- [DropdownButton](/core/dropdown/)

## Usage

#### Import

```ts
import { Atpanel } from "@agufaui/${framework name}";
```

#### Html

`<atpanel />` or `<Atpanel />`

#### Configuration

Theme component name: `{{ CATpanelName }}`

## Showcase

- first example added 'pb-8' (padding bottom) to avoid table scrollbar from showing when click bottom actions dropdown button

<DocTpanel />

::: details Click to see code
<<< @/core/tablePanel/DocTpanel.vue#showcase
:::

## Slot

- One named slot 'empty' for display when table is empty

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/table/ATpanel.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/table/Atpanel.vue#props

### Unique

<<< @/theme/types/table/ATpanel.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsLoading

<<< @/theme/prop.type.ts#ipropsloading

## Events

- You'll need to write a `switch` statement in your code to handle different `TTpanelEmit type` field values based on your needs.
- for `action` event, `type` field values are:
  - `selectall` if `multiSelect` is true
  - `selectrow` if `multiSelect` is true
  - `sort` when user click on the headers to sort columns
- for 'ope' (operation) event, `type` field values are user defined, either the value of `actions`, or the `event` value of headings

<<< @/theme/types/table/ATpanel.ts#emits
