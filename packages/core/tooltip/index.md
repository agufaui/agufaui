---
category: Basic
---

<script setup>
import { CATooltipName } from '@agufaui/theme'
</script>

# Tooltip

Basic tooltip

## Usage

#### Import

```ts
import { Atooltip } from "@agufaui/${framework name}";
```

#### Html

`<atooltip />` or `<Atooltip />`

#### Configuration

Theme component name: `{{ CATooltipName }}`

## Showcase

- Hover over icon to see tooltip

<DocTooltip />

::: details Click to see code
<<< @/core/tooltip/DocTooltip.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ATooltip.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/tooltip/Atooltip.vue#props

### Unique

<<< @/theme/types/basic/ATooltip.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
