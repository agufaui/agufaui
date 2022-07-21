# Get Started

AgufaUI is a collection of UI components. We assume you are already familiar with the basic ideas of Atomic/Utility First CSS before you continue.

## Installation

```bash
npm i @agufaui/vue
```

> From v1.0, AgufaUI requires `vue` >= v3.2 or `@vue/composition-api` >= v1.1

### CDN

```html
<script src="https://unpkg.com/@agufaui/use"></script>
<script src="https://unpkg.com/@agufaui/vue"></script>
```

It will be exposed to global as `window.AgufaUI`

### Nuxt

From v7.2.0, we shipped a Nuxt module to enable auto importing for Nuxt 3 and Nuxt Bridge.

```bash
npm i -D @agufaui/nuxt @agufaui/vue
```

Nuxt 3
```ts
// nuxt.config.ts
export default {
  modules: [
    '@agufaui/nuxt',
  ],
}
```

And then use AgufaUI function anywhere in your Nuxt app. For example:

```vue
<template>
<a-button text="hello world" />
</template>
```

## Usage Example

Simply importing the components you need from `@agufaui/vue`

```ts
import { AButton } from '@agufaui/vue'

Refer to [components list](/vue/) for more details.
