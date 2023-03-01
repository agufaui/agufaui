---
category: Basic
---

<script setup>
import { CASelectName, CASelectoptionName } from '@agufaui/theme'
</script>

# Select

Basic select.

## Usage

#### Import

```ts
import { Aselect, Aselectoption } from "@agufaui/${framework name}";
```

#### Html

`<aselect />` or `<Aselect />` <br/>
`<aselectoption />` or `<Aselectoption />`

#### Configuration

Theme component name: `{{ CASelectName }}` <br/>
Theme component name: `{{ CASelectoptionName }}`

## Showcase

- component **Aselect**

<DocSelect />

::: details Click to see code
<<< @/core/select/DocSelect.vue#showcase
:::

- component **Aselectoption**

<DocSelectoption />

::: details Click to see code
<<< @/core/select/DocSelectoption.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ASelect.ts

## Slot

- component **Aselectoption**

  - One default slot for label.
  - one named slot `initSelectoption` for display when no option is selected

## Attributes (Properties)

#### Default Values

- component **Aselect**

<<< @/vue/components/select/Aselect.vue#props

- component **Aselectoption**

<<< @/vue/components/select/Aselectoption.vue#props

### Unique

<<< @/theme/types/basic/ASelect.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

- component **Aselect**

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ASelect.ts#emits
