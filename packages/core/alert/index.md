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
import { AAlert } from "@agufaui/${framework name}";
```

#### Html

`<a-alert />` or `<AAlert />`

#### Configuration

Theme component name: `{{ CAAlertName }}`

## Showcase

- Self-closable
- Examples are using AgufaUI provided theme and Vue
- Last "Password doesn't meet requirements" example is using slot
- This component can be used for "Accept Cookie" alert (Cookie Consent Notification) by using slot

<DocAlert />

::: details Click to see code
<<< @/core/alert/DocAlert.vue#showcase
:::

## Slot

One default slot

## AgufaUI provided Theme Types

`CDefaultType` is just string constant "default"

<<< @/theme/default/AAlert.ts

## Attributes (Properties)

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
