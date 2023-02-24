---
category: Navigation
---

<script setup>
import { CAMmsidebarName } from '@agufaui/theme'
</script>

# Menu Mobile Sidebar

Menu mobile sidebar.

#### Child Components

- [Menu Dropdown](/core/menuDropdown/)

## Usage

#### Import

```ts
import { Ammsidebar } from "@agufaui/${framework name}";
```

#### Html

`<ammsidebar />` or `<Ammsidebar />`

#### Configuration

Theme component name: `{{ CAMmsidebarName }}`

## Showcase

- Example is using two slots "header" and "footer".

<iframe src="/core/menuMobileSidebar/showcase" class="w-full" height="500"></iframe>

::: details Click to see code
<<< @/core/menuMobileSidebar/DocMenuMobileSidebar.vue#showcase
:::

## Slot

Two slots, one named "header", one named "footer".

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/navigation/AMmsidebar.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuMobileSidebar/Ammsidebar.vue#props

### Unique

<<< @/theme/types/navigation/AMmsidebar.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

