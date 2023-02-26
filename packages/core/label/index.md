---
category: Basic
---

<script setup>
import { CALabelName } from '@agufaui/theme'
</script>

# Label

Basic label

#### Child Components

- [Tooltip](/core/tooltip/)

## Usage

#### Import

```ts
import { Alabel } from "@agufaui/${framework name}";
```

#### Html

`<alabel />` or `<Alabel />`

#### Configuration

Theme component name: `{{ CALabelName }}`

## Showcase

<DocLabel />

::: details Click to see code
<<< @/core/label/DocLabel.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/basic/ALabel.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/label/Alabel.vue#props

### Unique

<<< @/theme/types/basic/ALabel.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops
