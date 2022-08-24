---
category: Navigation
---

<script setup>
import { CAMpanelName } from '@agufaui/theme'
</script>

# Menu Panel

Menu panel.

## Usage

#### Import

```ts
import { Ampanel } from "@agufaui/${framework name}";
```

#### Html

`<ampanel />` or `<Ampanel />`

#### Configuration

Theme component name: `{{ CAMpanelName }}`

## Showcase

- Menu links panel.

<DocMenuPanel />

::: details Click to see code
<<< @/core/menuPanel/DocMenuPanel.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AMpanel.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/AMpanel.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

