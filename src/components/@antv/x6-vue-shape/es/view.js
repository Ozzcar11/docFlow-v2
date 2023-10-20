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
import { NodeView, Scheduler } from '@antv/x6';
import { isVue2, isVue3, createApp, h, Vue2 } from 'vue-demi';
export class VueShapeView extends NodeView {
    init() {
        super.init();
    }
    getComponentContainer() {
        return this.selectors.foContent;
    }
    confirmUpdate(flag) {
        const ret = super.confirmUpdate(flag);
        return this.handleAction(ret, VueShapeView.action, () => {
            Scheduler.scheduleTask(() => {
                this.renderVueComponent();
            });
        });
    }
    renderVueComponent() {
        this.unmountVueComponent();
        const root = this.getComponentContainer();
        const node = this.cell;
        const graph = this.graph;
        if (root) {
            const component = this.graph.hook.getVueComponent(node);
            if (isVue2) {
                const Vue = Vue2;
                const div = document.createElement('div');
                div.style.width = '100%';
                div.style.height = '100%';
                if (typeof component === 'string') {
                    div.innerHTML = component;
                    this.vm = new Vue({ el: div });
                }
                else {
                    const _a = component, { template } = _a, other = __rest(_a, ["template"]);
                    div.innerHTML = template;
                    this.vm = new Vue(Object.assign({ el: div, provide() {
                            return {
                                getGraph: () => graph,
                                getNode: () => node,
                            };
                        } }, other));
                }
                root.appendChild(this.vm.$el);
            }
            else if (isVue3) {
                this.vm = createApp({
                    render() {
                        return h(component);
                    },
                    provide() {
                        return {
                            getGraph: () => graph,
                            getNode: () => node,
                        };
                    },
                });
                this.vm.mount(root);
            }
        }
    }
    unmountVueComponent() {
        const root = this.getComponentContainer();
        if (this.vm) {
            isVue2 && this.vm.$destroy();
            isVue3 && this.vm.unmount();
            this.vm = null;
        }
        root.innerHTML = '';
        return root;
    }
    unmount() {
        this.unmountVueComponent();
        super.unmount();
        return this;
    }
}
(function (VueShapeView) {
    VueShapeView.action = 'vue';
    VueShapeView.config({
        bootstrap: [VueShapeView.action],
        actions: {
            component: VueShapeView.action,
        },
    });
    NodeView.registry.register('vue-shape-view', VueShapeView, true);
})(VueShapeView || (VueShapeView = {}));
//# sourceMappingURL=view.js.map