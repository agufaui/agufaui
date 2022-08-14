# Configuration

AgufaUI configuration is solely for customizing components.

## Customization

There are two ways to customize components:

### Component Instance Level

```html
<a-button text="Hello World" aclass="text-red hover:bg-blue-2" />
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

#### Theme

1. You can find **[component name]** under "Usage" section of each component page.
2. **[component type name]** is user defined.
3. You should provide at least a type called **default** for each component.
4. **default** type will be applied when no `atype` property is specified for that component.
5. You can specify `useType: ${type_name}` in each component type declaration to use that type as base to merge. AgufaUI will look for that type in current theme component scope, then in baseTheme component scope if you are using custom theme.
6. If you are using custom theme as baseTheme, you can specify `useType: base:${type_name}` to use base type directly.
7. Configuration values will only apply if property is undefined, aka user didn't specify that property (attribute) in html tag.
8. There is no need to configure **boolean** type properties, because javascript will default boolean type properties to **false**.
9. `atype` property is not configurable.  For properties that are not configurable, you'll see "Not configurable" in comment for that property in type definition of component.
10. You can split Theme to smaller files then import and combine them. For example, abutton.ts, aalert.ts, etc.

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
				aclass: "bg-red-5 hover:(bg-red-6 text-white)",
				lclass: "text-green",
			},
			blue: {
				// user defined blue type
				[CUseType]: CBase + CDefaultType, // merge with default type in baseTheme
				aclass: "bg-red-5 hover:(bg-red-6 text-white)",
				lclass: "text-blue",
			},
			green: {
				// user defined green type
				[CUseType]: CDefaultType, // merge with above user defined default type
				aclass: "text-white",
			},
			yellow: {
				// user defined yellow type
				[CUseType]: "green", // merge with above user defined green type
				aclass: "text-white",
			},
		},
	},
};
```

::: details Click to see IUserConfig definition
<<< @/config/src/theme.type.ts
:::

##### Merge Rules

1. User defined theme component type will override same component type that exits in baseTheme directly without merging.
2. To merge with baseTheme or other type, you need to define `useType`:

```ts
theme: {
  abutton: {
    default: {
      useType: "default", // or "base:default"
      aclass: "bg-red-5 hover:bg-red-6",
      lclass: "text-green",
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
        lclass: "text-white",
      },
    },
  },
  theme: {
    abutton: {
      default: {
        useType: "default",
        aclass: "text-green",
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
      lclass: "text-white",
      aclass: "text-green",
    },
  }
}
```

5. Duplicate properties with name ends with "class" will be concatenated:

```ts
{
  baseTheme: {
    abutton: {
      default: {
        lclass: "text-red",
        aclass: "text-white",
      },
    },
  },
  theme: {
    abutton: {
      default: {
        useType: "default",
        lclass: "text-red",
        aclass: "text-green",
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
      lclass: "text-red text-red",
      aclass: "text-white text-green",
    },
  }
}
```

> **Simple concatenation of classnames is chosen over replacement for performance reasons. It's up to you to avoid duplicate classnames like above example `lclass: "text-red text-red"` or duplicate utility specificity classnames like `lclass: "text-green text-red"`.**

6. Duplicate properties with name not ends with "class" will be overrided:

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

For example, `AALertError` has child component `AAlert`.  In AgufaUI provided theme, `AAlertError` default type is:

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

"red" is `AAlert` red type, and "green" is `AAlert` green type in AgufaUI provided theme:

```ts
theme: {
  aalert: {
    red: { ... },
    green: { ... },
  }
}
```

## Component Instance Level Customization with Configuration defined

1. For duplicate component properties with name ends with "class", values will be concatenated:

```ts
// configuration without baseTheme
new Config({
	theme: {
		abutton: {
			default: {
				aclass: "text-white bg-blue-5 hover:bg-blue-6",
			},
		},
	},
});
```

```html
<a-button text="Hello World" aclass="focus:ring-blue-4" />
```

will compile to

```html
<button class="text-white bg-blue-5 hover:bg-blue-6 focus:ring-blue-4">Hello World</button>
```

2. For duplicate component properties with name not ends with "class", values will be overrided:

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
<a-button text="Hello World" icon="i-ph-anchor" spacex="space-x-1.2" />
```

will compile to

```html
<button ...>
	<div class="... space-x-1.2">...</div>
</button>
```

3. For non-duplicate component properties, both component instance level and component configuration level values will apply.

::: tip Disable configuration value for property names not ends with "class"
To disable configuration value for a property with name not ends with "class", simply assign its value to empty string

```html
<a-button text="Hello World" spacex="" />
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

### `atype` and `aclass` properties

Every component will have `atype` and `aclass` properties

#### atype

Component type property. For user defined "**red**" type for `abutton` in configuration:

```html
<a-button text="Hello" atype="red" />
```

#### aclass

- Behaves the same as `class` attribute of a html element

```html
<button class=""></button>
```

is same as

```html
<a-button aclass=""></a-button>
```

- `aclass` applies to root element of an AgufaUI component. There will also be different `*class` properties for different elements of a component.

::: info AButton Elements
AButton contains 4 html elements,

- `aclass` property for `<button>`
- `tclass` property for text `<span>`
- `iclass` property for icon `<div>`
- `lclass` property for loading icon `<div>`
  :::

You can apply different classes to different elements. Hover and click on below button to see effect

```html
// using AgufaUI provided theme
<a-button
	text="Hello"
	tclass="animate-pulse"
	aclass="animate-spin text-white bg-blue-6 hover:(animate-fade-in bg-blue-7) focus:(animate-fade-out ring-blue-5)"
	icon="i-ph-anchor"
	iclass="animate-spin text-green-3"
/>
```

<br />
<a-button text="Hello" tclass="animate-pulse" aclass="animate-spin text-white bg-blue-6 hover:(animate-fade-in bg-blue-7) focus:(animate-fade-out ring-blue-5)" icon="i-ph-anchor" iclass="animate-spin text-green-3" /><br /><br /><br />

- `aclass` is applied last in order, so it will override any overlapping classes for that component. It's useful in rare cases if you want to override AgufaUI default positional and browser reset CSS. However, whether it works depends on your CSS framework's order of rules. For example:

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

  because you have used `cursor-wait` somewhere in your code, it will be scanned and included in your own code css layer <br /> 5. Now `cursor-wait` will be applied because it comes after `cursor-pointer` in generated css code

However, if you don't use `cursor-wait` in your own code, `cursor-pointer` will override `cursor-wait` correctly.

::: tip
"text-xs" will always override "text-sm" according to Alphabetic order of rules. So you can put least privileged css classname in your configuration, then you can override it easily later on.
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
	@apply hover:(border-2 border-blue);
}
```

then

```html
<a-button text="Hello" aclass="btn"></a-button>
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
<a-button width="10px" height="10px" ... />
```

These attributes will only fall through to the top element of AgufaUI component, not applicable to other elements of the component, and can only fall through one level down from parent to child.
