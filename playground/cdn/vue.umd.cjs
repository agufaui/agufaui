(function (r, e) {
  typeof exports == "object" && typeof module < "u"
    ? e(exports, require("vue"))
    : typeof define == "function" && define.amd
    ? define(["exports", "vue"], e)
    : ((r = typeof globalThis < "u" ? globalThis : r || self), e((r.AgufaUI = {}), r.Vue));
})(this, function (r, e) {
  "use strict";
  const se = "",
    ce = "",
    ie = "",
    b = "default",
    $ = {
      [b]: {
        show: !0,
        icon: "i-heroicons-solid:information-circle",
        iconColor: "text-blue-600",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        color: "text-gray-600",
        size: "text-sm",
        font: "font-medium",
        autoCloseDelaySeconds: 5,
        spaceX: "space-x-1.2",
        maxWidth: "max-w-sm",
      },
      red: {
        show: !0,
        icon: "i-majesticons:exclamation-circle",
        iconColor: "text-red-400",
        color: "text-red-600",
        aClass: "rounded-md bg-red-50 p-4",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        size: "text-sm",
        font: "font-medium",
        spaceX: "space-x-1.5",
        maxWidth: "w-full",
      },
      green: {
        show: !0,
        icon: "i-material-symbols:check-circle",
        iconColor: "text-green-400",
        color: "text-green-600",
        aClass: "rounded-md bg-green-50 p-4",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        size: "text-sm",
        font: "font-medium",
        spaceX: "space-x-1.5",
        maxWidth: "w-full",
      },
      yellow: {
        show: !0,
        icon: "i-ic:outline-warning",
        iconColor: "text-yellow-400",
        color: "text-yellow-600",
        aClass: "rounded-md bg-yellow-50 p-4",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        size: "text-sm",
        font: "font-medium",
        spaceX: "space-x-1.5",
        maxWidth: "w-full",
      },
      gray: {
        show: !0,
        icon: "i-heroicons-solid:information-circle",
        iconColor: "text-blue-400",
        color: "text-gray-600",
        aClass: "rounded-md bg-gray-50 p-4",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        size: "text-sm",
        font: "font-medium",
        spaceX: "space-x-1.5",
        maxWidth: "w-full",
      },
      blue: {
        show: !0,
        icon: "i-heroicons-solid:information-circle",
        iconColor: "text-blue-400",
        color: "text-gray-600",
        aClass: "rounded-md bg-blue-50 p-4",
        iconMargin: "mt-0.4",
        iconPosition: "left",
        size: "text-sm",
        font: "font-medium",
        spaceX: "space-x-1.5",
        maxWidth: "w-full",
      },
    },
    z = { [b]: {} },
    j = {
      [b]: {
        type: "button",
        py: "py-2",
        px: "px-4",
        size: "text-sm",
        color: "text-white",
        round: "rounded-md",
        bg: "bg-blue-600",
        hover: "hover:bg-blue-700",
        focus: "focus:ring-blue-500",
        iconPosition: "left",
        loadingIcon: "i-eos-icons:loading",
        spaceX: "space-x-1.5",
      },
    };
  function W() {
    function n(o) {
      return Array.isArray(o)
        ? o.map((t) => n(t))
        : o instanceof Date
        ? new Date(o.getTime())
        : o instanceof Map
        ? new Map(Array.from(o.entries()).map(([t, l]) => [t, n(l)]))
        : o && typeof o == "object"
        ? Object.getOwnPropertyNames(o).reduce(
            (t, l) => (
              Object.defineProperty(t, l, Object.getOwnPropertyDescriptor(o, l)),
              (t[l] = n(o[l])),
              t
            ),
            Object.create(Object.getPrototypeOf(o))
          )
        : o;
    }
    return { deepClone: n };
  }
  function D() {
    function n(t) {
      return t
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
        .replace(/^./, (l) => l.toUpperCase())
        .trim();
    }
    function o(t) {
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
    return { pascalCaseToSpace: n, firstLetterToUpper: o };
  }
  const F = "default";
  function x() {
    function n(o, t, l, c) {
      const i = {},
        m = e.toRef(o, "aType"),
        { firstLetterToUpper: d } = D();
      for (const s in o) {
        if (["aType", "text", "msg"].includes(s)) continue;
        const p = e.toRef(o, s),
          g = "c" + d(s);
        i[g] = e.computed(() => {
          var a, f, u, y, C;
          return (C =
            (u = (a = p.value) != null ? a : l == null ? void 0 : l.getDefault(t, m.value, s)) !=
            null
              ? u
              : (f = c[m.value]) == null
              ? void 0
              : f[s]) != null
            ? C
            : (y = c[F]) == null
            ? void 0
            : y[s];
        });
      }
      return i;
    }
    return { getComputedPropertiesFromProps: n };
  }
  const L = ["type", "disabled"],
    H = { key: 0 },
    R = { key: 1 },
    Z = { key: 2 },
    q = { key: 3 },
    G = { name: "AButton", inheritAttrs: !1 },
    I = e.defineComponent({
      ...G,
      props: {
        icon: null,
        iconPosition: null,
        iconClass: null,
        disabled: { type: Boolean },
        spaceX: null,
        aType: null,
        aClass: null,
        type: null,
        text: null,
        py: null,
        px: null,
        size: null,
        color: null,
        round: null,
        bg: null,
        hover: null,
        focus: null,
        full: { type: Boolean },
        loading: { type: Boolean },
        loadingIcon: null,
        loadingClass: null,
      },
      emits: ["click"],
      setup(n, { emit: o }) {
        const t = n;
        let l = e.inject("agufaUIConfig");
        const c = "abutton",
          { getComputedPropertiesFromProps: i } = x(),
          m = i(t, c, l, j),
          {
            cType: d,
            cPx: s,
            cPy: p,
            cSize: g,
            cColor: a,
            cRound: f,
            cBg: u,
            cHover: y,
            cFocus: C,
            cFull: P,
            cDisabled: S,
            cAClass: E,
            cIcon: w,
            cIconPosition: A,
            cIconClass: _,
            cLoading: h,
            cLoadingIcon: B,
            cLoadingClass: U,
            cSpaceX: te,
          } = m,
          le = (T) => {
            o("click", T);
          };
        return (T, X) => (
          e.openBlock(),
          e.createElementBlock(
            "button",
            e.mergeProps({ role: "button", type: e.unref(d) }, T.$attrs, {
              onClick: X[0] || (X[0] = e.withModifiers((re) => le(re), ["stop"])),
              "u-pos": "relative",
              "u-flex": "inline",
              "u-justify": "center items-center",
              "u-border": "~ transparent",
              "u-font": "medium",
              "u-outline": "focus:none",
              "u-ring": "focus:2 focus:offset-2",
              "u-opacity": "disabled:70",
              "u-select": "none",
              "u-cursor": "pointer",
              disabled: e.unref(S) || e.unref(h),
              class: [
                e.unref(s),
                e.unref(p),
                e.unref(g),
                e.unref(a),
                e.unref(f),
                e.unref(u),
                e.unref(y),
                e.unref(C),
                { "w-full": e.unref(P) },
                e.unref(E),
              ],
            }),
            [
              e.renderSlot(T.$slots, "default", {}, () => [
                e.createElementVNode(
                  "div",
                  {
                    class: e.normalizeClass([
                      "flex justify-center justify-items-center",
                      e.unref(te),
                    ]),
                  },
                  [
                    n.text && e.unref(A) === "right"
                      ? (e.openBlock(),
                        e.createElementBlock("span", H, e.toDisplayString(n.text), 1))
                      : e.createCommentVNode("", !0),
                    e.unref(h)
                      ? (e.openBlock(),
                        e.createElementBlock("span", R, [
                          e.createElementVNode(
                            "div",
                            {
                              class: e.normalizeClass([
                                "animate-spin preserve-3d text-lg",
                                [e.unref(B), { "h-full": n.text }, e.unref(U)],
                              ]),
                            },
                            null,
                            2
                          ),
                        ]))
                      : e.unref(w)
                      ? (e.openBlock(),
                        e.createElementBlock("span", Z, [
                          e.createElementVNode(
                            "div",
                            {
                              class: e.normalizeClass([
                                e.unref(w),
                                { "h-full": n.text },
                                e.unref(_),
                              ]),
                            },
                            null,
                            2
                          ),
                        ]))
                      : e.createCommentVNode("", !0),
                    n.text && e.unref(A) === "left"
                      ? (e.openBlock(),
                        e.createElementBlock("span", q, e.toDisplayString(n.text), 1))
                      : e.createCommentVNode("", !0),
                  ],
                  2
                ),
              ]),
            ],
            16,
            L
          )
        );
      },
    }),
    J = { name: "AAlert", inheritAttrs: !1 },
    M = e.defineComponent({
      ...J,
      props: {
        icon: null,
        iconPosition: null,
        iconClass: null,
        spaceX: null,
        aType: null,
        aClass: null,
        show: { type: Boolean },
        msg: null,
        iconColor: null,
        iconMargin: null,
        color: null,
        size: null,
        font: null,
        msgClass: null,
        closeable: { type: Boolean },
        autoClose: { type: Boolean },
        autoCloseDelaySeconds: null,
        autoCloseAnime: null,
        maxWidth: null,
      },
      emits: ["closea"],
      setup(n, { emit: o }) {
        const t = n;
        let l = e.inject("agufaUIConfig");
        const c = "aalert",
          { getComputedPropertiesFromProps: i } = x(),
          m = i(t, c, l, $),
          {
            cShow: d,
            cColor: s,
            cSize: p,
            cFont: g,
            cAClass: a,
            cIcon: f,
            cIconColor: u,
            cIconMargin: y,
            cIconPosition: C,
            cIconClass: P,
            cMsgClass: S,
            cCloseable: E,
            cSpaceX: w,
            cMaxWidth: A,
          } = m,
          _ = (h) => {
            o("closea", h);
          };
        return (h, B) =>
          e.unref(d)
            ? (e.openBlock(),
              e.createElementBlock(
                "div",
                e.mergeProps({ key: 0 }, h.$attrs, {
                  "u-flex": "~",
                  "u-justify": "items-start",
                  class: [e.unref(w), e.unref(a)],
                }),
                [
                  e.unref(C) === "left"
                    ? (e.openBlock(),
                      e.createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: e.normalizeClass([e.unref(f), e.unref(y), e.unref(u), e.unref(P)]),
                        },
                        null,
                        2
                      ))
                    : e.createCommentVNode("", !0),
                  e.createElementVNode(
                    "span",
                    {
                      class: e.normalizeClass([
                        "block",
                        [e.unref(s), e.unref(p), e.unref(g), e.unref(A), e.unref(S)],
                      ]),
                    },
                    [
                      e.renderSlot(h.$slots, "default", {}, () => [
                        e.createTextVNode(e.toDisplayString(n.msg), 1),
                      ]),
                    ],
                    2
                  ),
                  e.unref(C) === "right"
                    ? (e.openBlock(),
                      e.createElementBlock(
                        "div",
                        {
                          key: 1,
                          class: e.normalizeClass(["mt-0.4", [e.unref(f), e.unref(u), e.unref(P)]]),
                        },
                        null,
                        2
                      ))
                    : e.createCommentVNode("", !0),
                  e.unref(E)
                    ? (e.openBlock(),
                      e.createElementBlock("div", {
                        key: 2,
                        class: "i-typcn:delete",
                        "u-flex": "shrink-0",
                        "u-text": "xl gray-400",
                        "u-cursor": "pointer",
                        onClick: B[0] || (B[0] = (U) => _(!1)),
                      }))
                    : e.createCommentVNode("", !0),
                ],
                16
              ))
            : e.createCommentVNode("", !0);
      },
    }),
    K = { name: "AAlertError", inheritAttrs: !1 },
    V = e.defineComponent({
      ...K,
      props: {
        spaceX: null,
        aType: null,
        aClass: null,
        show: { type: Boolean },
        error: { type: Boolean },
        msg: null,
      },
      emits: ["closea"],
      setup(n, { emit: o }) {
        const t = n;
        let l = e.inject("agufaUIConfig");
        const c = "aalertError",
          { getComputedPropertiesFromProps: i } = x(),
          m = i(t, c, l, z),
          { cShow: d, cError: s, cAClass: p } = m,
          g = (a) => {
            o("closea", a);
          };
        return (a, f) => {
          const u = e.resolveComponent("a-alert");
          return (
            e.openBlock(),
            e.createBlock(
              u,
              e.mergeProps({ show: e.unref(d) }, a.$attrs, {
                "a-Type": e.unref(s) ? "red" : "green",
                closeable: !0,
                "a-class": e.unref(p),
                onClosea: f[0] || (f[0] = (y) => g(!1)),
              }),
              {
                default: e.withCtx(() => [
                  e.renderSlot(a.$slots, "default", {}, () => [
                    e.createTextVNode(e.toDisplayString(n.msg), 1),
                  ]),
                ]),
                _: 3,
              },
              16,
              ["show", "a-Type", "a-class"]
            )
          );
        };
      },
    }),
    Q = Object.freeze(
      Object.defineProperty(
        { __proto__: null, AButton: I, AAlert: M, AAlertError: V },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Y = {
      install(n, o) {
        for (const [t, l] of Object.entries(Q)) n.component(l.name, l);
      },
    };
  var N = (n, o, t) => {
      if (!o.has(n)) throw TypeError("Cannot " + t);
    },
    v = (n, o, t) => (N(n, o, "read from private field"), t ? t.call(n) : o.get(n)),
    ee = (n, o, t) => {
      if (o.has(n)) throw TypeError("Cannot add the same private member more than once");
      o instanceof WeakSet ? o.add(n) : o.set(n, t);
    },
    oe = (n, o, t, l) => (N(n, o, "write to private field"), l ? l.call(n, t) : o.set(n, t), t);
  const O = "default";
  var k;
  class ne {
    constructor(o = {}) {
      ee(this, k, void 0), oe(this, k, o.theme || {});
    }
    getDefault(o, t, l) {
      var c, i;
      return (i = (c = v(this, k)[o]) == null ? void 0 : c[t != null ? t : O]) == null
        ? void 0
        : i[l];
    }
  }
  (k = new WeakMap()),
    (r.AAlert = M),
    (r.AAlertError = V),
    (r.AButton = I),
    (r.Config = ne),
    (r.DAAlert = $),
    (r.DAAlertError = z),
    (r.DAButton = j),
    (r.DefaultType = O),
    (r.ThemeDefaultType = b),
    (r.VuePlugin = Y),
    (r.aUseDeepClone = W),
    (r.aUseStringUtils = D),
    (r.aUseVueComponent = x),
    Object.defineProperties(r, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: "Module" },
    });
});
