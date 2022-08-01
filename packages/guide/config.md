# Configurations

AgufaUI configuration is solely for customizing components.

## Customization

There are two ways to customize components:

- **Component Instance Level**

```html
<a-button text="Hello" color="text-red" if-hover="hover:bg-blue-200"></a-button>
```

- **Component Level** through configuration

**`Config`** object is made available to AgufaUI through provide/inject pattern or global variable if your framework doesn't support provide/inject.  

**`IUserConfig`** object only has one property "**theme**" right now, which is used for customizing component.

```ts{2,3,4,5}
// structure
theme: {
    [component name]: {
        [component type name]: {
            [property name]: [property value]
            ...
        }
        ...
    }
    ...
}
```

::: tip Theme
1. You can find **[component name]** under "Usage" section of each component page.  
2. **[component type name]** is user defined.  
3. For most components, AgufaUI provides at least a type called "**default**".
4. Some components have more types provided (eg. AAlert)
5. Some components don't have any type provided. (eg. AAlertError)
6. You can split Theme to smaller files then import and combine them.  For example, abutton.ts, aalert.ts, etc.
:::

::: details Click to see IUserConfig definition
<<< @/config/src/theme.type.ts
:::

### Customization Rules:
::: tip Important
1. For component properties that user defined type doesn't cover, AgufaUI will use their default values if they are defined in "**default**" type
2. You can override AgufaUI provided types
3. If you only override some values for AgufaUI provided types, values you didn't override will still apply 
4. If you override AgufaUI "**default**" type for a component,  values your override will be applied across application for that component 
:::
**Let's take a look at an example:**
```ts {#config}
// typescript
import { Config, IUserConfig } from "@agufaui/${framework name}"

const userConfig:IUserConfig = {
  theme: {
    abutton: {  // name for component AButton
      red: {  // user defined "red" type for component AButton 
        bg: "bg-red-600/50",
        icon: ""
      },
      default: {  // override "default" type of component AButton
        bg: "bg-red-400", // override property "bg" default value
        round: "", // don't want to use default value of "round"
      }
    },
    aalert: {
      ...
    }
  }
}

const aConfig = new Config(userConfig)
```

- Component **AButton** only has one "**default**" type

::: details Click to see AButton default values
<<< @/theme/default/AButton.ts
:::

> **ThemeCDefaultType** is just string "default"

- Before above configuration applied, to achieve "**red**" type effect

```html
<a-button text="Hello" icon="i-ph-anchor" bg="bg-red-600/50" />
```
<a-button text="Hello" icon="i-ph-anchor" bg="bg-red-600/50" round=""></a-button><br />

After above configuration applied

```html
<a-button text="Hello" a-type="red" />
```

<a-button text="Hello" icon="i-ph-anchor" bg="bg-red-600/50" round=""></a-button><br />

Note that "**default**" type override **`round: ""`** is also applied, if we didn't override **default** `round` property, button would have round corners

<a-button text="Hello" icon="i-ph-anchor" bg="bg-red-600/50"></a-button><br />

::: tip Disable default value
To disable default value or any value for a property, simply assign it's value to empty string
```html
<a-button text="Hello" round="" />
```
or disable it in configuration like above example, and you don't need to type `round=""` again
```ts
abutton: {
  default: {
    round: ""
  }
}
```
> This doesn't work for `aType` property, it will always default to "**default**" type
:::

### `aType` and `aClass` properties

Every component will have `aType` and `aClass` properties

#### aType
Component type property.  For above example, user defined "**red**" type:
```html
<a-button text="Hello" a-type="red" />
```

#### aClass
- Behaves the same as `class` attribute of a html element
```html
<button class=""></button>
```
is same as
```html
<a-button a-class=""></button>
```
- `aClass` applies to root element of an AgufaUI component.  There will also be different `*Class` properties for different elements of a component.

::: info AButton Elements
AButton contains 3 html elements, 
- `aClass` property for `<button/>`
- `iconClass` property for icon `<div/>` 
- `loadingClass` property for loading icon `<div/>`
:::

You can apply different classes to different elements.  Hover and click on below button to see effect

```html
<a-button text="hello" a-class="animate-spin hover:animate-fade-in focus:animate-fade-out" icon="i-ph-anchor" iconClass="animate-spin text-green-3"></a-button>
```
<br />
<a-button text="hello" a-class="animate-spin hover:animate-fade-in focus:animate-fade-out" icon="i-ph-anchor" iconClass="animate-spin text-green-3"></a-button><br /><br /><br />

- `aClass` is applied last in order, so it will override any overlapping classes for that component
```html
<a-button text="hello" a-class="bg-red-600" bg="bg-green-400/60"/>
```
<a-button text="hello" a-class="bg-red-600" bg="bg-green-400/60"/><br />

`bg-red-600` class will be applied to this button and `bg-green-400/60` will be discarded.

- You can just use `aClass` to apply classes instead of specifying attributes (properties)

```html
<a-button text="circle" size="text-xs" round="rounded-1/2" bg="bg-red-600/60" hover="hover:bg-red-600" focus="focus:ring-red-400" a-class="m-2 h-2.5rem w-2.5rem" />
```
is same as
```html
<a-button text="circle" a-class="text-xs rounded-1/2 bg-red-600/60 hover:bg-red-600 focus:ring-red-400 m-2 h-2.5rem w-2.5rem" />
```

<a-button text="circle" a-class="text-xs rounded-1/2 bg-red-600/60 hover:bg-red-600 focus:ring-red-400 m-2 h-2.5rem w-2.5rem" />

difference is that default values of size, round, bg, hover, focus will also be applied for `aClass` version, their values just got overridden by `aClass` values

- Only same overlapping utility class names can be overridden, `bg-blue-700` can only be overridden by `bg-${color}-*`.

If you want to apply different utility classes, you'll need to disable default value

For example, default value for AButton `hover` is `bg-blue-700`, say you want to show border for hover effect

```html
<a-button text="Hello" hover="" aClass="hover:(border-2 border-blue)"></a-button>
```

<a-button text="Hello" hover="" aClass="hover:border-2 hover:border-blue"></a-button>

or just disable `hover` default value completely in configuration

::: warning Variant Group
Should have used variant group syntax `hover: (border-2 border-blue)`.  But this site is using Unocss, and Unocss auto split variant group syntax because it scans whole file.  There is no way for Unocss to ignore single lines as of now, so you will not see variant group syntax in this site, even though the actual code is written in variant group syntax.
:::

- You can use your CSS framework features instead of configuration

For example, if you are using Unocss, you can use Shortcuts or @apply

```ts
// unocss.config.ts
export default defineConfig {
  shortcuts: {
    "btn": "hover:(border-2 border-blue)"
  }
}
```
or

```css
.btn {
  @apply hover:(border-2 border-blue)
}
```
then
```html
<a-button text="Hello" hover="" aClass="btn"></a-button>
```
::: warning Not Recommended
Using shortcuts or @apply is easier at first, but other people will have a hard time reading your code.  Even yourself if you get back to it after a while and forgot how you did it.
:::

### Attribute Inheritance

If your framework supports [Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html), every attribute or event listener that's applicable to the original html element will also be applicable to corresponding AgufaUI component.

```html
<button width="10px" height="10px" ... />
```
is same as
```html
<a-button width="10px" height="10px" ... />
```
These attributes will only fall through to the top element of AgufaUI component, not applicable to other elements of the component.  And can only fall through one level down from parent to child, so will not work for composed component.