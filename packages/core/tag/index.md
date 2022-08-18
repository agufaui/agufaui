---
category: Basic
---

<script setup>
import { CATagName } from '@agufaui/theme'
</script>

# Tag

Basic tag with close icon.

## Usage

#### Import

```ts
import { Atag } from "@agufaui/${framework name}";
```

#### Html

`<atag />` or `<Atag />`

#### Configuration

Theme component name: `{{ CATagName }}`

## Showcase

- Mainly used for search options display
- `close` event will emit `v` property value

<DocTag />

::: details Click to see code
<<< @/core/tag/DocTag.vue#showcase
:::

## Slot

One default slot replace tag content.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/ATag.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/tag/Atag.vue#props

### Unique

<<< @/theme/types/ATag.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

## Events

<<< @/theme/types/ATag.ts#emits