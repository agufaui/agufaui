---
category: Basic
---

<script setup>
import { CADropdownName, CADropdownButtonName } from '@agufaui/theme'
</script>

# Dropdown

Basic dropdown.

## Usage

#### Import

```ts
import { Adropdown, Adropdownbutton } from "@agufaui/${framework name}";
```

#### Html

`<adropdown />` or `<Adropdown />` <br/>
`<adropdownbutton />` or `<Adropdownbutton />`

#### Configuration

Theme component name: `{{ CADropdownName }}` <br/>
Theme component name: `{{ CADropdownButtonName }}`

## Showcase

- adropdown

<DocDropdown />

::: details Click to see code
<<< @/core/dropdown/DocDropdown.vue#showcase
:::

- adropdownbutton

<DocDropdownButton />

::: details Click to see code
<<< @/core/dropdown/DocDropdownButton.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ADropdown.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/dropdown/Adropdown.vue#props

### Unique

<<< @/theme/types/basic/ADropdown.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ADropdown.ts#emits
