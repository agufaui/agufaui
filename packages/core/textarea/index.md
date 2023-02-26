---
category: Basic
---

<script setup>
import { CATextareaName } from '@agufaui/theme'
</script>

# Textarea

Basic textarea.

## Usage

#### Import

```ts
import { Atextarea } from "@agufaui/${framework name}";
```

#### Html

`<atextarea />` or `<Atextarea />`

#### Configuration

Theme component name: `{{ CATextareaName }}`

## Showcase

<DocTextarea />

::: details Click to see code
<<< @/core/textarea/DocTextarea.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ATextarea.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/textarea/Atextarea.vue#props

### Unique

<<< @/theme/types/basic/ATextarea.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/ATextarea.ts#emits
