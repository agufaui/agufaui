---
category: Basic
available: Vue
---

# Button

Basic button with icon and loading

## Usage


```ts
import { AButton } from "@agufaui/${framework name}"
```

`<a-button />` or `<AButton />`

component name for configuration: `abutton`

## Showcase
  
<a-button text="Button" aclass="m-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" />
<a-button text="circle" size="text-xs" round="rounded-1/2" bg="bg-red-600/60" hover="hover:bg-red-600" focus="focus:ring-red-400" a-class="m-2 h-2.5rem w-2.5rem" />
<a-button text="Button" icon="i-ph-anchor" aclass="m-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" />

### Hover and Focus
<a-button text="Hello" hover="" aClass="hover:(border-2 border-blue)"></a-button>

## Types and Default Values
`ThemeCDefaultType` is just string "default"

<<< @/theme/default/AButton.ts

## Attributes (Properties)

### Unique

<<< @/theme/types/AButton.ts#props 

### Inherit from IProps

<<< @/theme/prop.type.ts#iprops

### Inherit from IPropsForm

<<< @/theme/prop.type.ts#ipropsform

### Inherit from IPropsComposeX

<<< @/theme/prop.type.ts#ipropscomposex

### inherit from IPropsLoading

<<< @/theme/prop.type.ts#ipropsloading

## Events

<<< @/theme/types/AButton.ts#emits