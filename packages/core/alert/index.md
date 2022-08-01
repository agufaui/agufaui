---
category: Basic
---

# Alert

Basic alert

## Usage

```ts
import { AAlert } from "@agufaui/${framework name}"
```

`<a-alert />` or `<AAlert />`

component name for configuration: `aalert`

## Showcase

<a-alert msg="text" atype="red" />
<a-alert msg="text" atype="green" />
<a-alert msg="text" atype="yellow" />
<a-alert msg="text" atype="gray" />
<a-alert msg="text" atype="blue" />

## Types and Default Values
`ThemeCDefaultType` is just string "default"

<<< @/theme/default/AAlert.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/AAlert.ts#props 

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### inherit from IPropsIcon

<<< @/theme/prop.type.ts#ipropsicon

## Events

<<< @/theme/types/AAlert.ts#emits