---
category: Navigation
---

<script setup>
import { CAMsidebarName } from '@agufaui/theme'
</script>

# Menu Sidebar

Menu sidebar.

#### Child Components

- [Menu Dropdown](/core/menuDropdown/)

## Usage

#### Import

```ts
import { Amsidebar } from "@agufaui/${framework name}";
```

#### Html

`<amsidebar />` or `<Amsidebar />`

#### Configuration

Theme component name: `{{ CAMsidebarName }}`

## Showcase

- Example is using two slots "header" and "footer".

<DocMenuSidebar />

::: details Click to see code
<<< @/core/menuSidebar/DocMenuSidebar.vue#showcase
:::

## Slot

Two slots, one named "header", one named "footer".

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AMsidebar.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuSidebar/Amsidebar.vue#props

### Unique

<<< @/theme/types/AMsidebar.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

