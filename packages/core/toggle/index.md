---
category: Basic
---

<script setup>
import { CAToggleName } from '@agufaui/theme'
</script>

# Toggle

Toggle button.

#### Child Components

- [Badge](/core/badge/)

## Usage

#### Import

```ts
import { Atoggle } from "@agufaui/${framework name}";
```

#### Html

`<atoggle />` or `<Atoggle />`

#### Configuration

Theme component name: `{{ CAToggleName }}`

## Showcase

<DocToggle />

::: details Click to see code
<<< @/core/toggle/DocToggle.vue#showcase
:::

## Slot

One default slot replace label.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/AToggle.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/toggle/Atoggle.vue#props

### Unique

<<< @/theme/types/basic/AToggle.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropsform

## Events

<<< @/theme/types/basic/AToggle.ts#emits
