---
category: Navigation
---

<script setup>
import { CAMitemName } from '@agufaui/theme'
</script>

# Menu Item

Menu Item.  It's either dropdown or link.

#### Child Components

- [Menu Dropdown](/core/menuDropdown/)
- [Menu Link](/core/menuLink/)

## Usage

#### Import

```ts
import { AmItem } from "@agufaui/${framework name}";
```

#### Html

`<amitem />` or `<Amitem />`

#### Configuration

Theme component name: `{{ CAMitemName }}`

## Showcase

- Hover and click menu Item to see different effects

<DocMenuItem />

::: details Click to see code
<<< @/core/menuItem/DocMenuItem.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/navigation/AMitem.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/navigation/AMitem.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

