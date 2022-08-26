---
category: Navigation
---

<script setup>
import { CAMdropdownName } from '@agufaui/theme'
</script>

# Menu Dropdown

Menu dropdown.

#### Child Components

- [Menu Panel](/core/menuPanel/)

## Usage

#### Import

```ts
import { Amdropdown } from "@agufaui/${framework name}";
```

#### Html

`<amdropdown />` or `<Amdropdown />`

#### Configuration

Theme component name: `{{ CAMdropdownName }}`

## Showcase

- Hover and click on "Sites" menu to see dropdown panel.

<DocMenuDropdown />

::: details Click to see code
<<< @/core/menuDropdown/DocMenuDropdown.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AMdropdown.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuDropdown/Amdropdown.vue#props

### Unique

<<< @/theme/types/AMdropdown.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
