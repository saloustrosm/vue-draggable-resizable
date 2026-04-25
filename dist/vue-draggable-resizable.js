import { openBlock as y, createElementBlock as v, normalizeStyle as H, normalizeClass as D, Fragment as W, renderList as L, withModifiers as M, renderSlot as T } from "vue";
function B(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Function]";
}
function x(t, e, i, s = 1) {
  const [h, o] = typeof s == "number" ? [s, s] : s, a = Math.round(e / h / t[0]) * t[0], l = Math.round(i / o / t[1]) * t[1];
  return [a, l];
}
function R(t, e, i) {
  return t - e - i;
}
function E(t, e, i) {
  return t - e - i;
}
function f(t, e, i) {
  return e !== null && t < e ? e : i !== null && i < t ? i : t;
}
function k(t, e, i) {
  let s = t;
  const h = [
    "matches",
    "webkitMatchesSelector",
    "mozMatchesSelector",
    "msMatchesSelector",
    "oMatchesSelector"
  ].find((o) => B(s[o]));
  if (!B(s[h]))
    return !1;
  do {
    if (s[h](e))
      return !0;
    if (s === i)
      return !1;
    s = s.parentNode;
  } while (s);
  return !1;
}
function P(t) {
  const e = window.getComputedStyle(t);
  return [
    parseFloat(e.getPropertyValue("width"), 10),
    parseFloat(e.getPropertyValue("height"), 10)
  ];
}
function b(t, e, i) {
  t && (t.attachEvent ? t.attachEvent("on" + e, i) : t.addEventListener ? t.addEventListener(e, i, !0) : t["on" + e] = i);
}
function r(t, e, i) {
  t && (t.detachEvent ? t.detachEvent("on" + e, i) : t.removeEventListener ? t.removeEventListener(e, i, !0) : t["on" + e] = null);
}
const N = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, h] of e)
    i[s] = h;
  return i;
}, w = {
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  },
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  }
}, C = {
  userSelect: "none",
  MozUserSelect: "none",
  WebkitUserSelect: "none",
  MsUserSelect: "none"
}, X = {
  userSelect: "auto",
  MozUserSelect: "auto",
  WebkitUserSelect: "auto",
  MsUserSelect: "auto"
};
let g = w.mouse;
const Y = {
  replace: !0,
  name: "vue-draggable-resizable",
  props: {
    className: {
      type: String,
      default: "vdr"
    },
    classNameDraggable: {
      type: String,
      default: "draggable"
    },
    classNameResizable: {
      type: String,
      default: "resizable"
    },
    classNameDragging: {
      type: String,
      default: "dragging"
    },
    classNameResizing: {
      type: String,
      default: "resizing"
    },
    classNameActive: {
      type: String,
      default: "active"
    },
    classNameHandle: {
      type: String,
      default: "handle"
    },
    disableUserSelect: {
      type: Boolean,
      default: !0
    },
    enableNativeDrag: {
      type: Boolean,
      default: !1
    },
    preventDeactivation: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !1
    },
    draggable: {
      type: Boolean,
      default: !0
    },
    resizable: {
      type: Boolean,
      default: !0
    },
    lockAspectRatio: {
      type: Boolean,
      default: !1
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: (t) => typeof t == "number" ? t > 0 : t === "auto"
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: (t) => typeof t == "number" ? t > 0 : t === "auto"
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (t) => t >= 0
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (t) => t >= 0
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (t) => t >= 0
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (t) => t >= 0
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    z: {
      type: [String, Number],
      default: "auto",
      validator: (t) => typeof t == "string" ? t === "auto" : t >= 0
    },
    handles: {
      type: Array,
      default: () => ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"],
      validator: (t) => {
        const e = /* @__PURE__ */ new Set(["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"]);
        return new Set(t.filter((i) => e.has(i))).size === t.length;
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: "both",
      validator: (t) => ["x", "y", "both"].includes(t)
    },
    grid: {
      type: Array,
      default: () => [1, 1]
    },
    parent: {
      type: Boolean,
      default: !1
    },
    scale: {
      type: [Number, Array],
      default: 1,
      validator: (t) => typeof t == "number" ? t > 0 : t.length === 2 && t[0] > 0 && t[1] > 0
    },
    onDragStart: {
      type: Function,
      default: () => !0
    },
    onDrag: {
      type: Function,
      default: () => !0
    },
    onResizeStart: {
      type: Function,
      default: () => !0
    },
    onResize: {
      type: Function,
      default: () => !0
    }
  },
  data: function() {
    return {
      left: this.x,
      top: this.y,
      right: null,
      bottom: null,
      width: null,
      height: null,
      widthTouched: !1,
      heightTouched: !1,
      aspectFactor: null,
      parentWidth: null,
      parentHeight: null,
      handle: null,
      enabled: this.active,
      resizing: !1,
      dragging: !1,
      dragEnable: !1,
      resizeEnable: !1,
      zIndex: this.z
    };
  },
  created: function() {
    this.maxWidth && this.minWidth > this.maxWidth && console.warn("[Vdr warn]: Invalid prop: minWidth cannot be greater than maxWidth"), this.maxHeight && this.minHeight > this.maxHeight && console.warn("[Vdr warn]: Invalid prop: minHeight cannot be greater than maxHeight"), this.resetBoundsAndMouseState();
  },
  mounted: function() {
    this.enableNativeDrag || (this.$el.ondragstart = () => !1);
    const [t, e] = this.getParentSize();
    this.parentWidth = t, this.parentHeight = e;
    const [i, s] = P(this.$el);
    this.aspectFactor = (this.w !== "auto" ? this.w : i) / (this.h !== "auto" ? this.h : s), this.width = this.w !== "auto" ? this.w : i, this.height = this.h !== "auto" ? this.h : s, this.right = this.parentWidth - this.width - this.left, this.bottom = this.parentHeight - this.height - this.top, this.active && this.$emit("activated"), b(document.documentElement, "mousedown", this.deselect), b(document.documentElement, "touchend touchcancel", this.deselect), b(window, "resize", this.checkParentSize);
  },
  beforeUnmount: function() {
    r(document.documentElement, "mousedown", this.deselect), r(document.documentElement, "touchstart", this.handleUp), r(document.documentElement, "mousemove", this.move), r(document.documentElement, "touchmove", this.move), r(document.documentElement, "mousemove", this.handleResize), r(document.documentElement, "touchmove", this.handleResize), r(document.documentElement, "mouseup", this.handleUp), r(document.documentElement, "touchend", this.handleUp), r(document.documentElement, "touchcancel", this.handleUp), r(document.documentElement, "contextmenu", this.contextMenu), r(document.documentElement, "touchend touchcancel", this.deselect), r(window, "resize", this.checkParentSize);
  },
  methods: {
    resetBoundsAndMouseState() {
      this.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }, this.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      };
    },
    checkParentSize() {
      if (this.parent) {
        const [t, e] = this.getParentSize();
        this.parentWidth = t, this.parentHeight = e, this.right = this.parentWidth - this.width - this.left, this.bottom = this.parentHeight - this.height - this.top;
      }
    },
    getParentSize() {
      if (this.parent) {
        const t = window.getComputedStyle(this.$el.parentNode, null);
        return [
          parseInt(t.getPropertyValue("width"), 10),
          parseInt(t.getPropertyValue("height"), 10)
        ];
      }
      return [null, null];
    },
    elementTouchDown(t) {
      g = w.touch, this.elementDown(t);
    },
    elementMouseDown(t) {
      g = w.mouse, this.elementDown(t);
    },
    elementDown(t) {
      if (t instanceof MouseEvent && t.button !== 0)
        return;
      const e = t.target || t.srcElement;
      if (this.$el.contains(e)) {
        if (this.onDragStart(t) === !1)
          return;
        if (this.dragHandle && !k(e, this.dragHandle, this.$el) || this.dragCancel && k(e, this.dragCancel, this.$el)) {
          this.dragging = !1;
          return;
        }
        this.enabled || (this.enabled = !0, this.$emit("activated"), this.$emit("update:active", !0)), this.draggable && (this.dragEnable = !0), this.mouseClickPosition.mouseX = t.touches ? t.touches[0].pageX : t.pageX, this.mouseClickPosition.mouseY = t.touches ? t.touches[0].pageY : t.pageY, this.mouseClickPosition.left = this.left, this.mouseClickPosition.right = this.right, this.mouseClickPosition.top = this.top, this.mouseClickPosition.bottom = this.bottom, this.parent && (this.bounds = this.calcDragLimits()), b(document.documentElement, g.move, this.move), b(document.documentElement, g.stop, this.handleUp), g === w.mouse && b(document.documentElement, "contextmenu", this.contextMenu);
      }
    },
    calcDragLimits() {
      return {
        minLeft: this.left % this.grid[0],
        maxLeft: Math.floor((this.parentWidth - this.width - this.left) / this.grid[0]) * this.grid[0] + this.left,
        minRight: this.right % this.grid[0],
        maxRight: Math.floor((this.parentWidth - this.width - this.right) / this.grid[0]) * this.grid[0] + this.right,
        minTop: this.top % this.grid[1],
        maxTop: Math.floor((this.parentHeight - this.height - this.top) / this.grid[1]) * this.grid[1] + this.top,
        minBottom: this.bottom % this.grid[1],
        maxBottom: Math.floor((this.parentHeight - this.height - this.bottom) / this.grid[1]) * this.grid[1] + this.bottom
      };
    },
    deselect(t) {
      const e = t.target || t.srcElement, i = new RegExp(this.className + "-([trmbl]{2})", "");
      !this.$el.contains(e) && !i.test(e.className) && (this.enabled && !this.preventDeactivation && (this.enabled = !1, this.$emit("deactivated"), this.$emit("update:active", !1)), r(document.documentElement, g.move, this.handleResize)), this.resetBoundsAndMouseState();
    },
    handleTouchDown(t, e) {
      g = w.touch, this.handleDown(t, e);
    },
    handleDown(t, e) {
      e instanceof MouseEvent && e.button !== 0 || this.onResizeStart(t, e) !== !1 && (e.stopPropagation && e.stopPropagation(), this.lockAspectRatio && !t.includes("m") ? this.handle = "m" + t.substring(1) : this.handle = t, this.resizeEnable = !0, this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX, this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY, this.mouseClickPosition.left = this.left, this.mouseClickPosition.right = this.right, this.mouseClickPosition.top = this.top, this.mouseClickPosition.bottom = this.bottom, this.bounds = this.calcResizeLimits(), b(document.documentElement, g.move, this.handleResize), b(document.documentElement, g.stop, this.handleUp), g === w.mouse && b(document.documentElement, "contextmenu", this.contextMenu));
    },
    calcResizeLimits() {
      let t = this.minW, e = this.minH, i = this.maxW, s = this.maxH;
      const h = this.aspectFactor, [o, a] = this.grid, l = this.width, p = this.height, u = this.left, m = this.top, d = this.right, c = this.bottom;
      this.lockAspectRatio && (t / e > h ? e = t / h : t = h * e, i && s ? (i = Math.min(i, h * s), s = Math.min(s, i / h)) : i ? s = i / h : s && (i = h * s)), i = i - i % o, s = s - s % a;
      const n = {
        minLeft: null,
        maxLeft: null,
        minTop: null,
        maxTop: null,
        minRight: null,
        maxRight: null,
        minBottom: null,
        maxBottom: null
      };
      return this.parent ? (n.minLeft = u % o, n.maxLeft = u + Math.floor((l - t) / o) * o, n.minTop = m % a, n.maxTop = m + Math.floor((p - e) / a) * a, n.minRight = d % o, n.maxRight = d + Math.floor((l - t) / o) * o, n.minBottom = c % a, n.maxBottom = c + Math.floor((p - e) / a) * a, i && (n.minLeft = Math.max(n.minLeft, this.parentWidth - d - i), n.minRight = Math.max(n.minRight, this.parentWidth - u - i)), s && (n.minTop = Math.max(n.minTop, this.parentHeight - c - s), n.minBottom = Math.max(n.minBottom, this.parentHeight - m - s)), this.lockAspectRatio && (n.minLeft = Math.max(n.minLeft, u - m * h), n.minTop = Math.max(n.minTop, m - u / h), n.minRight = Math.max(n.minRight, d - c * h), n.minBottom = Math.max(n.minBottom, c - d / h))) : (n.minLeft = null, n.maxLeft = u + Math.floor((l - t) / o) * o, n.minTop = null, n.maxTop = m + Math.floor((p - e) / a) * a, n.minRight = null, n.maxRight = d + Math.floor((l - t) / o) * o, n.minBottom = null, n.maxBottom = c + Math.floor((p - e) / a) * a, i && (n.minLeft = -(d + i), n.minRight = -(u + i)), s && (n.minTop = -(c + s), n.minBottom = -(m + s)), this.lockAspectRatio && i && s && (n.minLeft = Math.min(n.minLeft, -(d + i)), n.minTop = Math.min(n.minTop, -(s + c)), n.minRight = Math.min(n.minRight, -u - i), n.minBottom = Math.min(n.minBottom, -m - s))), n;
    },
    move(t) {
      if (t instanceof MouseEvent && t.buttons !== void 0 && t.buttons !== 1) {
        this.handleUp(t);
        return;
      }
      this.resizing ? this.handleResize(t) : this.dragEnable && this.handleDrag(t);
    },
    handleDrag(t) {
      if (t instanceof MouseEvent && t.buttons !== void 0 && t.buttons !== 1) {
        this.handleUp(t);
        return;
      }
      const e = this.axis, i = this.grid, s = this.bounds, h = this.mouseClickPosition, o = e && e !== "y" ? h.mouseX - (t.touches ? t.touches[0].pageX : t.pageX) : 0, a = e && e !== "x" ? h.mouseY - (t.touches ? t.touches[0].pageY : t.pageY) : 0, [l, p] = x(i, o, a, this.scale), u = f(h.left - l, s.minLeft, s.maxLeft), m = f(h.top - p, s.minTop, s.maxTop);
      if (this.onDrag(u, m) === !1)
        return;
      const d = f(h.right + l, s.minRight, s.maxRight), c = f(h.bottom + p, s.minBottom, s.maxBottom);
      this.left = u, this.top = m, this.right = d, this.bottom = c, this.$emit("dragging", this.left, this.top), this.dragging = !0;
    },
    moveHorizontally(t) {
      const [e, i] = x(this.grid, t, this.top, 1), s = f(e, this.bounds.minLeft, this.bounds.maxLeft);
      this.left = s, this.right = this.parentWidth - this.width - s;
    },
    moveVertically(t) {
      const [e, i] = x(this.grid, this.left, t, 1), s = f(i, this.bounds.minTop, this.bounds.maxTop);
      this.top = s, this.bottom = this.parentHeight - this.height - s;
    },
    handleResize(t) {
      if (t instanceof MouseEvent && t.buttons !== void 0 && t.buttons !== 1) {
        this.handleUp(t);
        return;
      }
      let e = this.left, i = this.top, s = this.right, h = this.bottom;
      const o = this.mouseClickPosition, a = this.aspectFactor, l = o.mouseX - (t.touches ? t.touches[0].pageX : t.pageX), p = o.mouseY - (t.touches ? t.touches[0].pageY : t.pageY);
      !this.widthTouched && l && (this.widthTouched = !0), !this.heightTouched && p && (this.heightTouched = !0);
      const [u, m] = x(this.grid, l, p, this.scale);
      this.handle.includes("b") ? (h = f(
        o.bottom + m,
        this.bounds.minBottom,
        this.bounds.maxBottom
      ), this.lockAspectRatio && this.resizingOnY && (s = this.right - (this.bottom - h) * a)) : this.handle.includes("t") && (i = f(
        o.top - m,
        this.bounds.minTop,
        this.bounds.maxTop
      ), this.lockAspectRatio && this.resizingOnY && (e = this.left - (this.top - i) * a)), this.handle.includes("r") ? (s = f(
        o.right + u,
        this.bounds.minRight,
        this.bounds.maxRight
      ), this.lockAspectRatio && this.resizingOnX && (h = this.bottom - (this.right - s) / a)) : this.handle.includes("l") && (e = f(
        o.left - u,
        this.bounds.minLeft,
        this.bounds.maxLeft
      ), this.lockAspectRatio && this.resizingOnX && (i = this.top - (this.left - e) / a));
      const d = R(this.parentWidth, e, s), c = E(this.parentHeight, i, h);
      this.onResize(this.handle, e, i, d, c) !== !1 && (this.left = e, this.top = i, this.right = s, this.bottom = h, this.width = d, this.height = c, this.$emit("resizing", this.left, this.top, this.width, this.height), this.resizing = !0);
    },
    changeWidth(t) {
      const [e, i] = x(this.grid, t, 0, 1), s = f(
        this.parentWidth - e - this.left,
        this.bounds.minRight,
        this.bounds.maxRight
      );
      let h = this.bottom;
      this.lockAspectRatio && (h = this.bottom - (this.right - s) / this.aspectFactor);
      const o = R(this.parentWidth, this.left, s), a = E(this.parentHeight, this.top, h);
      this.right = s, this.bottom = h, this.width = o, this.height = a;
    },
    changeHeight(t) {
      const [e, i] = x(this.grid, 0, t, 1), s = f(
        this.parentHeight - i - this.top,
        this.bounds.minBottom,
        this.bounds.maxBottom
      );
      let h = this.right;
      this.lockAspectRatio && (h = this.right - (this.bottom - s) * this.aspectFactor);
      const o = R(this.parentWidth, this.left, h), a = E(this.parentHeight, this.top, s);
      this.right = h, this.bottom = s, this.width = o, this.height = a;
    },
    contextMenu(t) {
      !this.dragEnable && !this.resizeEnable && !this.dragging && !this.resizing || (t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), this.handleUp(t));
    },
    handleUp(t) {
      const e = this.dragging || this.dragEnable, i = this.resizing || this.resizeEnable;
      this.handle = null, this.resetBoundsAndMouseState(), this.dragEnable = !1, this.resizeEnable = !1, this.dragging = !1, this.resizing = !1, i && this.$emit("resizeStop", this.left, this.top, this.width, this.height), e && this.$emit("dragStop", this.left, this.top), r(document.documentElement, g.move, this.move), r(document.documentElement, g.move, this.handleResize), r(document.documentElement, g.stop, this.handleUp), r(document.documentElement, "contextmenu", this.contextMenu);
    }
  },
  computed: {
    style() {
      return {
        transform: `translate(${this.left}px, ${this.top}px)`,
        width: this.computedWidth,
        height: this.computedHeight,
        zIndex: this.zIndex,
        ...this.dragging && this.disableUserSelect ? C : X
      };
    },
    actualHandles() {
      return this.resizable ? this.handles : [];
    },
    computedWidth() {
      return this.w === "auto" && !this.widthTouched ? "auto" : this.width + "px";
    },
    computedHeight() {
      return this.h === "auto" && !this.heightTouched ? "auto" : this.height + "px";
    },
    minW() {
      return this.minWidth;
    },
    minH() {
      return this.minHeight;
    },
    maxW() {
      return this.maxWidth;
    },
    maxH() {
      return this.maxHeight;
    },
    resizingOnX() {
      return !!this.handle && (this.handle.includes("l") || this.handle.includes("r"));
    },
    resizingOnY() {
      return !!this.handle && (this.handle.includes("t") || this.handle.includes("b"));
    },
    isCornerHandle() {
      return !!this.handle && ["tl", "tr", "br", "bl"].includes(this.handle);
    }
  },
  watch: {
    active(t) {
      this.enabled = t, t ? this.$emit("activated") : this.$emit("deactivated");
    },
    z(t) {
      (t >= 0 || t === "auto") && (this.zIndex = t);
    },
    x(t) {
      this.resizing || this.dragging || (this.parent && (this.bounds = this.calcDragLimits()), this.moveHorizontally(t));
    },
    y(t) {
      this.resizing || this.dragging || (this.parent && (this.bounds = this.calcDragLimits()), this.moveVertically(t));
    },
    lockAspectRatio(t) {
      t ? this.aspectFactor = this.width / this.height : this.aspectFactor = void 0;
    },
    w(t) {
      this.resizing || this.dragging || (this.parent && (this.bounds = this.calcResizeLimits()), this.changeWidth(t));
    },
    h(t) {
      this.resizing || this.dragging || (this.parent && (this.bounds = this.calcResizeLimits()), this.changeHeight(t));
    }
  }
}, A = ["onMousedown", "onTouchstart"];
function F(t, e, i, s, h, o) {
  return y(), v("div", {
    style: H(o.style),
    class: D([{
      [i.classNameActive]: t.enabled,
      [i.classNameDragging]: t.dragging,
      [i.classNameResizing]: t.resizing,
      [i.classNameDraggable]: i.draggable,
      [i.classNameResizable]: i.resizable
    }, i.className]),
    onMousedown: e[1] || (e[1] = (...a) => o.elementMouseDown && o.elementMouseDown(...a)),
    onTouchstart: e[2] || (e[2] = (...a) => o.elementTouchDown && o.elementTouchDown(...a)),
    onContextmenu: e[3] || (e[3] = (...a) => o.contextMenu && o.contextMenu(...a))
  }, [
    (y(!0), v(W, null, L(o.actualHandles, (a) => (y(), v("div", {
      key: a,
      class: D([i.classNameHandle, i.classNameHandle + "-" + a]),
      style: H({ display: t.enabled ? "block" : "none" }),
      onMousedown: M((l) => o.handleDown(a, l), ["stop", "prevent"]),
      onTouchstart: M((l) => o.handleTouchDown(a, l), ["stop", "prevent"]),
      onContextmenu: e[0] || (e[0] = M((...l) => o.contextMenu && o.contextMenu(...l), ["stop", "prevent"]))
    }, [
      T(t.$slots, a)
    ], 46, A))), 128)),
    T(t.$slots, "default")
  ], 38);
}
const U = /* @__PURE__ */ N(Y, [["render", F]]);
function S(t) {
  S.installed || (S.installed = !0, t.component("VueDraggableResizable", U));
}
const V = {
  install: S
};
let z = null;
typeof window < "u" ? z = window.Vue : typeof global < "u" && (z = global.Vue);
z && z.use(V);
export {
  U as default,
  S as install
};
