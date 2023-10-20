"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueShapeView = void 0;
var x6_1 = require("@antv/x6");
var vue_demi_1 = require("vue-demi");
var VueShapeView = /** @class */ (function (_super) {
    __extends(VueShapeView, _super);
    function VueShapeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VueShapeView.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    VueShapeView.prototype.getComponentContainer = function () {
        return this.selectors.foContent;
    };
    VueShapeView.prototype.confirmUpdate = function (flag) {
        var _this = this;
        var ret = _super.prototype.confirmUpdate.call(this, flag);
        return this.handleAction(ret, VueShapeView.action, function () {
            x6_1.Scheduler.scheduleTask(function () {
                _this.renderVueComponent();
            });
        });
    };
    VueShapeView.prototype.renderVueComponent = function () {
        this.unmountVueComponent();
        var root = this.getComponentContainer();
        var node = this.cell;
        var graph = this.graph;
        if (root) {
            var component_1 = this.graph.hook.getVueComponent(node);
            if (vue_demi_1.isVue2) {
                var Vue_1 = vue_demi_1.Vue2;
                var div = document.createElement('div');
                div.style.width = '100%';
                div.style.height = '100%';
                if (typeof component_1 === 'string') {
                    div.innerHTML = component_1;
                    this.vm = new Vue_1({ el: div });
                }
                else {
                    var _a = component_1, template = _a.template, other = __rest(_a, ["template"]);
                    div.innerHTML = template;
                    this.vm = new Vue_1(__assign({ el: div, provide: function () {
                            return {
                                getGraph: function () { return graph; },
                                getNode: function () { return node; },
                            };
                        } }, other));
                }
                root.appendChild(this.vm.$el);
            }
            else if (vue_demi_1.isVue3) {
                this.vm = (0, vue_demi_1.createApp)({
                    render: function () {
                        return (0, vue_demi_1.h)(component_1);
                    },
                    provide: function () {
                        return {
                            getGraph: function () { return graph; },
                            getNode: function () { return node; },
                        };
                    },
                });
                this.vm.mount(root);
            }
        }
    };
    VueShapeView.prototype.unmountVueComponent = function () {
        var root = this.getComponentContainer();
        if (this.vm) {
            vue_demi_1.isVue2 && this.vm.$destroy();
            vue_demi_1.isVue3 && this.vm.unmount();
            this.vm = null;
        }
        root.innerHTML = '';
        return root;
    };
    VueShapeView.prototype.unmount = function () {
        this.unmountVueComponent();
        _super.prototype.unmount.call(this);
        return this;
    };
    return VueShapeView;
}(x6_1.NodeView));
exports.VueShapeView = VueShapeView;
(function (VueShapeView) {
    VueShapeView.action = 'vue';
    VueShapeView.config({
        bootstrap: [VueShapeView.action],
        actions: {
            component: VueShapeView.action,
        },
    });
    x6_1.NodeView.registry.register('vue-shape-view', VueShapeView, true);
})(VueShapeView = exports.VueShapeView || (exports.VueShapeView = {}));
exports.VueShapeView = VueShapeView;
//# sourceMappingURL=view.js.map