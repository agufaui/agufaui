---
category: Navigation
---

<script setup>
import { CAMlinkName } from '@agufaui/theme'
</script>

# Menu Link

Menu link with icon and subtitle.

## Usage

#### Import

```ts
import { Amlink } from "@agufaui/${framework name}";
```

#### Html

`<amlink />` or `<Amlink />`

#### Configuration

Theme component name: `{{ CAMlinkName }}`

## Showcase

- Hover and click menu link to see different effects, it will open a new browser tab/window

<DocMenuLink />

::: details Click to see code
<<< @/core/menuLink/DocMenuLink.vue#showcase
:::

## Slot

Two slots.  One default slot replace menu link content including icon.  One named slot "badge" for badge, superscript or subscript of title text.

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/navigation/AMlink.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/navigation/AMlink.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon
