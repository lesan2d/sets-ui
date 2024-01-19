import { defineComponent as s, openBlock as o, createElementBlock as r, renderSlot as c } from "vue";
function l(t) {
  const e = t;
  return e.install = (n) => {
    n.component(e.name, t);
  }, t;
}
const i = { class: "s-grid" }, d = /* @__PURE__ */ s({
  name: "SGrid",
  __name: "Grid",
  setup(t) {
    return (e, n) => (o(), r("div", i, [
      c(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), m = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, _] of e)
    n[a] = _;
  return n;
}, p = /* @__PURE__ */ m(d, [["__scopeId", "data-v-bbe0192f"]]), u = l(p), f = { class: "s-cell" }, h = /* @__PURE__ */ s({
  name: "SCell",
  __name: "Cell",
  setup(t) {
    return (e, n) => (o(), r("div", f, [
      c(e.$slots, "default")
    ]));
  }
}), v = l(h), C = [u, v], S = (t) => ({
  install: (e) => {
    t.forEach((n) => {
      e.use(n);
    });
  }
}), G = S(C);
export {
  v as SCell,
  u as SGrid,
  G as default
};
