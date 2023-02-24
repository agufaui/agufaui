---
category: Basic
---

<script setup>
import { CARadioName } from '@agufaui/theme'
</script>

# Radio

Basic radio.

## Usage

#### Import

```ts
import { Aradio } from "@agufaui/${framework name}";
```

#### Html

`<aradio />` or `<Aradio />`

#### Configuration

Theme component name: `{{ CARadioName }}`

## Showcase

<DocRadio />

::: details Click to see code
<<< @/core/radio/DocRadio.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ARadio.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/radio/Aradio.vue#props

### Unique

<<< @/theme/types/basic/ARadio.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ARadio.ts#emits
