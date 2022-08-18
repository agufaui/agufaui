---
category: Basic
---

<script setup>
import { CAAlertName } from '@agufaui/theme'
</script>

# Alert

Basic alert

## Usage

#### Import

```ts
import { Aalert } from "@agufaui/${framework name}";
```

#### Html

`<aalert />` or `<Aalert />`

#### Configuration

Theme component name: `{{ CAAlertName }}`

## Showcase

- Self-closable
- 2nd example is wrapped in `div` because the `div` container of these examples is styled "flex flex-col", which makes direct children full width.   
- The last "Password doesn't meet requirements" example is using slot
- This component can be used for "Accept Cookie" alert (Cookie Consent Notification) by using slot

<DocAlert />

::: details Click to see code
<<< @/core/alert/DocAlert.vue#showcase
:::

## Slot

One default slot for message `span` html element

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AAlert.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/alert/Aalert.vue#props

### Unique

<<< @/theme/types/AAlert.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### Inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

## Events

<<< @/theme/types/AAlert.ts#emits
