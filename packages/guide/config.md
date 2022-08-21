<script setup>
import { langs } from "../translate/languages/index";
delete langs["auto"]
</script>

# Configuration

AgufaUI configuration is mainly for customizing components.

## Shorthand Properties

There are a few common properties in AgufaUI components, we use shorthand to avoid repetitive typing, save time and energy:

- **`t`** stands for "type" - component type defined in configuration.  Every component has `t` property.
- **`c`** stands for "class" - css classes apply to root html element of a component.  For "basic" category components, it usually is the main html element itself, like `abutton`, `c` applies to `<button>` element, but for `ainput`, it's actually `<div>` container element.  For others, it usually is the container `<div>` or `<span>` element.  Every component has `c` property.
- **`v`** stands for "value" - main data input of a component.  For user input html elements, it's the input value; for content display html elements, it's the content to be displayed.
- **`vc`** stands for "value class" - css classes apply to html element that contains `v` value.  For user input html elements, it's the element itself; for content display html elements, it's usually `<div>` or `<span>` elements.
- **`i`** stands for "icon"
- **`ic`** stands for "icon class" - css classes apply to `<div>` or `<span>` element that contains icon.
- Property name ends with character `c` - css classes apply to html element that contains that property.  Like "loadc" means "load class", apply to `<div>` or `<span>` element that contains loading icon.

There will be different `*c` properties for different elements of a component.

::: info Abutton Elements
Abutton has 4 html elements,

- `c` property for `<button>`
- `vc` property for text `<span>`
- `ic` property for icon `<div>`
- `loadc` property for loading icon `<div>`
:::

You can apply different classes to different elements. Hover and click on below button to see effect

```html
<abutton
  t="focus" // component type "focus" 
  v="Hello" // display text "hello"
  vc="animate-pulse" // css class for html element that contains "hello"
  c="animate-spin text-white bg-blue-6 hover:(animate-fade-in bg-blue-7) focus:(animate-fade-out ring-blue-5)" // css class for button html element
  i="i-ph-anchor" // icon
  ic="animate-spin text-green-3" // css class for html element that contains icon
/>
```

<br />
<abutton v="Hello" vc="animate-pulse" c="animate-spin text-white bg-blue-6 hover:(animate-fade-in bg-blue-7) focus:(animate-fade-out ring-blue-5)" i="i-ph-anchor" ic="animate-spin text-green-3" /><br />

## Customization

There are two ways to customize components:

### Component Instance Level

```html
<abutton v="Hello World" c="text-red hover:bg-blue-2" />
```

### Component Level through Configuration

**`Config`** object is made available to AgufaUI through provide/inject pattern or global variable if your framework doesn't support provide/inject.

**`IUserConfig`** object has property "**theme**", which is used for customizing component.

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

::: details Click to see IUserConfig definition
<<< @/config/src/theme.type.ts
:::

#### Theme

**Type:** ITheme <br />
**Default:** undefined

1. You can find **[component name]** under "Usage" section of each component page.
2. **[component type name]** is user defined.
3. You should provide at least a type called **default** for each component.
4. **default** type will be applied when no `t` property is specified for that component.
5. You can specify `useType: ${type_name}` in each component type declaration to use that type as base to merge. AgufaUI will look for that type in current theme component scope, then in baseTheme component scope if you are using custom theme.
6. If you are using custom theme as baseTheme, you can specify `useType: base:${type_name}` to use base type directly.
7. Configuration values will only apply if property is undefined, aka user didn't specify that property (attribute) in html tag.
8. There is no need to configure **boolean** type properties, because javascript will default boolean type properties to **false**.
9. `t` property is not configurable.  For properties that are not configurable, you'll see "Not configurable" in comment for that property in type definition of component.
10. You can split Theme to smaller files then import and combine them. For example, abutton.ts, aalert.ts, etc..  For Typescript, you'll need to `import { TComponent } from '@agufaui/config'`, then do a Type Assertion `theme: { abutton: AButtonConfig as TComponent }` 

Here's an example, suppose you are using AgufaUI provided theme as baseTheme:

```ts
/**
 * CDefaultType is just string constant "default"
 * CUseType is just string constant "useType"
 * CBase is just string constant "base:"
 *
 * If you're using Vue, you can import from '@agufaui/vue'
 */
import { IUserConfig, Theme, CDefaultType, CUseType, CBase } from "@agufaui/config";

const userConfig: IUserConfig = {
	// custom theme from 3rd party
	baseTheme: Theme,
	// user defined theme
	theme: {
		abutton: {
			[CDefaultType]: {
				// user defined default type, replace default type in baseTheme
				[CUseType]: CDefaultType, // merge with default type in baseTheme
				c: "bg-red-5 hover:(bg-red-6 text-white)",
				loadc: "text-green",
			},
			blue: {
				// user defined blue type
				[CUseType]: CBase + CDefaultType, // merge with default type in baseTheme
				c: "bg-red-5 hover:(bg-red-6 text-white)",
				loadc: "text-blue",
			},
			green: {
				// user defined green type
				[CUseType]: CDefaultType, // merge with above user defined default type
				c: "text-white",
			},
			yellow: {
				// user defined yellow type
				[CUseType]: "green", // merge with above user defined green type
				c: "text-white",
			},
		},
	},
};
```

##### Merge Rules

1. User defined theme component type will override same component type that exits in baseTheme directly without merging.
2. To merge with baseTheme or other type, you need to define `useType`:

```ts
theme: {
  abutton: {
    default: {
      useType: "default", // or "base:default"
      c: "bg-red-5 hover:bg-red-6",
      loadc: "text-green",
    },
  }
}
```

3. Only one `useType` value can be defined.
4. `useType` component type properties will fall through to calling type:

```ts
{
  baseTheme: {
    abutton: {
      default: {
        loadc: "text-white",
      },
    },
  },
  theme: {
    abutton: {
      default: {
        useType: "default",
        c: "text-green",
      },
    }
  }
}
```

will become

```ts
theme: {
  abutton: {
    default: {
      loadc: "text-white",
      c: "text-green",
    },
  }
}
```

5. Duplicate properties with name ends with character "c" (class) will be concatenated:

```ts
{
  baseTheme: {
    abutton: {
      default: {
        loadc: "text-red",
        c: "text-white",
      },
    },
  },
  theme: {
    abutton: {
      default: {
        useType: "default",
        loadc: "text-red",
        c: "text-green",
      },
    }
  }
}
```

will become

```ts
theme: {
  abutton: {
    default: {
      loadc: "text-red text-red",
      c: "text-white text-green",
    },
  }
}
```

> **Simple concatenation of classnames is chosen over replacement for performance reasons. It's up to you to avoid duplicate classnames like above example `loadc: "text-red text-red"` or duplicate utility specificity classnames like `loadc: "text-green text-red"`.**

6. Duplicate properties with name not ends with character "c" (not class) will be overrided:

```ts
{
  baseTheme: {
    abutton: {
      default: {
        spacex: "space-x-1.5",
      },
    },
  },
  theme: {
    abutton: {
      default: {
        useType: "default",
        spacex: "space-x-1.2",
      },
    }
  }
}
```

will become

```ts
theme: {
  abutton: {
    default: {
      spacex: "space-x-1.2",
    },
  }
}
```

#### baseTheme

**Type:** ITheme <br />
**Default:** undefined

Specify custom theme you want to use. If baseTheme is not set, you are programming with **unstyled components** with only positional and browser reset CSS.

- AgufaUI provides a minimum style theme.

###### Vue

```ts
import { Theme, CConfigProvideName } from '@agufaui/vue';

import '@agufaui/vue/theme.css';

app.provide<Config>(CConfigProvideName, new Config({
  baseTheme: Theme,
  theme: {...},
}));
```

###### Svelte

```ts
import { Theme } from '@agufaui/theme';

import '@agufaui/svelte/theme.css';

configStore.set(
  new Config({
    baseTheme: Theme,
    theme: {...},
  })
);
```

- If you don't want to use whole AgufaUI provided theme, but just want to use specific component or component type

###### Vue

```ts
import { CConfigProvideName, DAAlert, DAButtonCircle } from '@agufaui/vue';

import '@agufaui/vue/theme.css';

app.provide<Config>(CConfigProvideName, new Config({
  theme: {
    abutton: {
      circle: DAButtonCircle,
      ...
    },
    aalert: DAAlert,
    ...
  },
}));
```

###### Svelte

```ts
import { DAAlert, DAButtonCircle } from '@agufaui/theme';

import '@agufaui/svelte/theme.css';

configStore.set(
  new Config({
    theme: {
      abutton: {
        circle: DAButtonCircle,
        ...
      },
      aalert: DAAlert,
      ...
    },
  })
);
```

- If you are programming with **unstyled components**, you need to specify child components types for composed components.

For example, `AaLertError` has child component `Aalert`.  In AgufaUI provided theme, `AalertError` default type is:

```ts
theme: {
  aalertError: {
    default: {
      errorAAlertType: "red",
      successAAlertType: "green",
    }
  }
}
```

"red" is `Aalert` red type, and "green" is `Aalert` green type in AgufaUI provided theme:

```ts
theme: {
  aalert: {
    red: { ... },
    green: { ... },
  }
}
```

#### locale

**Type:** string | object (`string` or `Ref<string>` for Vue or `Writable<string>` for Svelte) <br />
**Default:** "en"

[ISO 639-1 Codes](i18n#supported).  If you only need 1 language, just specify string value.  If you need more than 1 language, need to make field reactive.  For Vue, `locale: ref<string>("en")`; for Svelte, `locale: writable<string>("en")`.  For usage, see [I18n](i18n).

#### locales

**Type:** TLang[] (`TLang` type is imported from `@agufaui/vue` for Vue or `@agufaui/locale` for Svelte) <br />
**Default:** [en] (`en` TLang is imported from `@agufaui/vue` for Vue or `@agufaui/locale` for Svelte)

`locales` field is required when you need more than 1 language or want to use another language other than `en` as default.  Manually import and input language files is required because it doesn't make sense to bundle all {{ Object.keys(langs).length }} language files.  For usage, see [I18n](i18n).

## Component Instance Level Customization with Configuration defined

1. For duplicate component properties with name ends with character "c" (class), values will be concatenated:

```ts
// configuration without baseTheme
new Config({
	theme: {
		abutton: {
			default: {
				c: "text-white bg-blue-5 hover:bg-blue-6",
			},
		},
	},
});
```

```html
<abutton v="Hello World" c="focus:ring-blue-4" />
```

will compile to

```html
<button class="text-white bg-blue-5 hover:bg-blue-6 focus:ring-blue-4">Hello World</button>
```

2. For duplicate component properties with name not ends with character "c" (not class), values will be overrided:

```ts
// configuration without baseTheme
new Config({
	theme: {
		abutton: {
			default: {
				spacex: "space-x-1.5",
			},
		},
	},
});
```

```html
<abutton v="Hello World" i="i-ph-anchor" spacex="space-x-1.2" />
```

will compile to

```html
<button ...>
	<div class="... space-x-1.2">...</div>
</button>
```

3. For non-duplicate component properties, both component instance level and component configuration level values will apply.

::: tip Disable configuration value for property names not ends with character "c" (not class)
To disable configuration value for a property with name not ends with character "c", simply assign its value to empty string

```html
<abutton v="Hello World" spacex="" />
```

or disable it in configuration

```ts
abutton: {
  default: {
    useType: "default",
    spacex: ""
  }
}
```

:::

### `c` Property

- Behaves the same as `class` attribute of a html element

```html
<button class=""></button>
```

is same as

```html
<abutton c=""></abutton>
```

- `c` is applied last in order, so it will override any overlapping classes for that component. It's useful in very rare cases if you want to override AgufaUI default positional and browser reset CSS. You might need to mark classes as **important** depending on your CSS framework's order of rules. For example:

  1. Suppose agufaui.css has `cursor-wait` rule, if you import `agufaui.css`, it will be in its own css layer.
  2. You used `cursor-wait` somewhere in your own code.
  3. Then you want to override `cursor-wait` with `cursor-pointer`, resulting class is `class="cursor-wait cursor-pointer"`
  4. If your CSS framework order of rules is Alphabetic, your own code css layer will be

  ```css
  .cursor-pointer {
  	cursor: pointer;
  }
  .cursor-wait {
  	cursor: wait;
  }
  ```

  because you have used `cursor-wait` somewhere in your code, it will be scanned and included in your own code css layer <br /> 
  5. Now `cursor-wait` will be applied because it comes after `cursor-pointer` in generated css code

However, if you don't use `cursor-wait` in your own code, `cursor-pointer` will override `cursor-wait` correctly.  Or just simply mark it important `class="!cursor-pointer"`.

If mark it important can't solve your problem, create a new component type in configuration.

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
	@apply hover:(border-2 border-blue);
}
```

then

```html
<abutton v="Hello" c="btn"></abutton>
```

::: warning Not Recommended
Using shortcuts or @apply is easier at first, but other people will have a hard time reading your code. Even yourself if you get back to it after a while and forgot how you did it.
:::

### Attribute Inheritance

If your framework supports [Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html), every attribute or event listener that's applicable to the original html element will also be applicable to corresponding AgufaUI component.

```html
<button width="10px" height="10px" ... />
```

is same as

```html
<abutton width="10px" height="10px" ... />
```

These attributes will only fall through to the main element of a component, not applicable to other elements of the component, and can only fall through one level down from parent to child.
