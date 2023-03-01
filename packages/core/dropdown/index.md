---
category: Basic
---

<script setup>
import { CADropdownName, CADropdownButtonName, CADropdownSelectName, CADropdownDecoName, CADropdownControlName } from '@agufaui/theme'
</script>

# Dropdown

Basic dropdown.

## Usage

#### Import

```ts
import { Adropdown, Adropdownbutton, Adropdownselect, Adropdowndeco, Adropdowncontrol } from "@agufaui/${framework name}";
```

#### Html

`<adropdown />` or `<Adropdown />` <br/>
`<adropdownbutton />` or `<Adropdownbutton />` <br/>
`<adropdownselect />` or `<Adropdownselect />` <br/>
`<adropdowndeco />` or `<Adropdowndeco />` <br/>
`<adropdowncontrol />` or `<Adropdowncontrol />` <br/>

#### Configuration

Theme component name: `{{ CADropdownName }}` <br/>
Theme component name: `{{ CADropdownButtonName }}` <br/>
Theme component name: `{{ CADropdownSelectName }}` <br/>
Theme component name: `{{ CADropdownDecoName }}` <br/>
Theme component name: `{{ CADropdownControlName }}` <br/>

## Showcase

- component **Adropdown**

<DocDropdown />

::: details Click to see code
<<< @/core/dropdown/DocDropdown.vue#showcase
:::

- component **Adropdownbutton**

<DocDropdownButton />

::: details Click to see code
<<< @/core/dropdown/DocDropdownButton.vue#showcase
:::

- component **Adropdownselect**

<DocDropdownSelect />

::: details Click to see code
<<< @/core/dropdown/DocDropdownSelect.vue#showcase
:::

- component **Adropdowndeco**

<DocDropdownDeco />

::: details Click to see code
<<< @/core/dropdown/DocDropdownDeco.vue#showcase
:::

- component **Adropdowncontrol**

<DocDropdownControl />

::: details Click to see code
<<< @/core/dropdown/DocDropdownControl.vue#showcase
:::

## Slot

- component **Adropdownselect**
  * One default slot for button text

- component **Adropdowndeco**
  * One default slot for panel content
  * One named slot `label` for button text

- component **Adropdowncontrol**
  * One default slot for button text

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ADropdown.ts

## Attributes (Properties)

#### Default Values

- component **Adropdown**

<<< @/vue/components/dropdown/Adropdown.vue#props

- component **Adropdownbutton**

<<< @/vue/components/dropdown/Adropdownbutton.vue#props

- component **Adropdownselect**

<<< @/vue/components/dropdown/Adropdownselect.vue#props

- component **Adropdowndeco**

<<< @/vue/components/dropdown/Adropdowndeco.vue#props

- component **Adropdowncontrol**

<<< @/vue/components/dropdown/Adropdowncontrol.vue#props

### Unique

<<< @/theme/types/basic/ADropdown.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

- component **Adropdownbutton** and **Adropdownselect** and **Adropdowncontrol**

<<< @/theme/types/basic/ADropdown.ts#emits
