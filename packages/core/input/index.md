---
category: Basic
---

<script setup>
import { CAInputName } from '@agufaui/theme'
</script>

# Input

Basic input.

## Usage

#### Import

```ts
import { Ainput } from "@agufaui/${framework name}";
```

#### Html

`<ainput />` or `<Ainput />`

#### Configuration

Theme component name: `{{ CAInputName }}`

## Showcase
- default `maxlength` is 255
- For Vue `v-model`, need to use `v-model:v="variable"`
- 3rd example disabled `t` and styling **unstyled component**.  `px-1` is used to override default positional css `px-3`

<DocInput />

::: details Click to see code
<<< @/core/input/DocInput.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AInput.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/input/Ainput.vue#props

### Unique

<<< @/theme/types/AInput.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/AInput.ts#emits
