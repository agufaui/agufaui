---
category: Navigation
---

<script setup>
import { CAMflyoutName } from '@agufaui/theme'
</script>

# Menu Flyout

Menu flyout.

#### Child Components

- [Menu Panel](/core/menuPanel/)

## Usage

#### Import

```ts
import { Amflyout } from "@agufaui/${framework name}";
```

#### Html

`<amflyout />` or `<Amflyout />`

#### Configuration

Theme component name: `{{ CAMflyoutName }}`

## Showcase

- Hover and click on "Sites" menu to see flyout panel.

<DocMenuFlyout />

::: details Click to see code
<<< @/core/menuFlyout/DocMenuFlyout.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/navigation/AMflyout.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/menuFlyout/Amflyout.vue#props

### Unique

<<< @/theme/types/navigation/AMflyout.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

