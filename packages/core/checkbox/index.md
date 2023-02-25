---
category: Basic
---

<script setup>
import { CACheckboxName } from '@agufaui/theme'
</script>

# Checkbox

Basic checkbox.

## Usage

#### Import

```ts
import { Acheckbox } from "@agufaui/${framework name}";
```

#### Html

`<acheckbox />` or `<Acheckbox />`

#### Configuration

Theme component name: `{{ CACheckboxName }}`

## Showcase

<DocCheckbox />

::: details Click to see code
<<< @/core/checkbox/DocCheckbox.vue#showcase
:::

## Slot

One default slot replace label.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ACheckbox.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/checkbox/Acheckbox.vue#props

### Unique

<<< @/theme/types/basic/ACheckbox.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ACheckbox.ts#emits
