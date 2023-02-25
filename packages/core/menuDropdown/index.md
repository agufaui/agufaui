---
category: Navigation
---

<script setup>
import { CAMdropdownName } from '@agufaui/theme'
</script>

# Menu Dropdown

Menu dropdown.

#### Child Components

- [Menu Link](/core/menuLink/)

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

## Slot

One default slot for badge, superscript or subscript of title text.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/navigation/AMdropdown.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuDropdown/Amdropdown.vue#props

### Unique

<<< @/theme/types/navigation/AMdropdown.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
