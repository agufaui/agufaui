---
category: Utility
---

<script setup>
import { CAAlertErrorName } from '@agufaui/theme'
</script>

# AlertError

Alert message if there is error or show success message.

#### Child Components

- [Alert](/core/alert/)

## Usage

#### Import

```ts
import { AalertError } from "@agufaui/${framework name}";
```

#### Html

`<aalert-error />` or `<AalertError />`

#### Configuration

Theme component name: `{{ CAAlertErrorName }}`

## Showcase

- Self-closable

<doc-alert-error />

::: details Click to see code
<<< @/core/alertError/DocAlertError.vue#showcase
:::

## Slot

One default slot for message `span` html element

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/AAlertError.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/AAlertError.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

## Events

<<< @/theme/types/AAlertError.ts#emits
