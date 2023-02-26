---
category: Basic
---

<script setup>
import { CAModalName } from '@agufaui/theme'
</script>

# Modal

Basic modal

## Usage

#### Import

```ts
import { Amodal } from "@agufaui/${framework name}";
```

#### Html

`<amodal />` or `<Amodal />`

#### Configuration

Theme component name: `{{ CAModalName }}`

## Showcase

<DocModal />

::: details Click to see code
<<< @/core/modal/DocModal.vue#showcase
:::

## Slot

One default slot for modal content

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/AModal.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/modal/Amodal.vue#props

### Unique

<<< @/theme/types/basic/AModal.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

## Events

<<< @/theme/types/basic/AModal.ts#emits
