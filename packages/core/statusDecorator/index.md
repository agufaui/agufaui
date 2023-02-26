---
category: Form
---

<script setup>
import { CASdName } from '@agufaui/theme'
</script>

# Status Decorator

Add label, and show error, success and info messages for components (dynamic components)

## Usage

#### Import

```ts
import { Asd } from "@agufaui/${framework name}";
```

#### Html

`<asd />` or `<Asd />`

#### Configuration

Theme component name: `{{ CASdName }}`

## Showcase

- `v` is component name, eg. `v="button"` stands for `Abutton`, `v="input"` stands for `Ainput`.  Just any AgufaUI component name without first character `A`
- component interface definition must extends `IProps` interface `IASdProps<T extends IProps>`
- because of fall through attributes, properties of `Asd` is renamed to includes characters `asd`, so `v` becomes `vasd`, to differ from dynamic component's `v` property

<DocSd />

::: details Click to see code
<<< @/core/statusDecorator/DocSd.vue#showcase
:::

## AgufaUI provided Theme

`CDefaultType` is just string constant "default"

<<< @/theme/default/form/ASd.ts

## Attributes (Properties)

#### Default Values

<<< @/vue/components/statusDecorator/Asd.vue#props

### Unique

<<< @/theme/types/form/ASd.ts#props

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops
