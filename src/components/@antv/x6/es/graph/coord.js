import { Base } from './base';
import { Dom } from '../util';
import { Point, Rectangle } from '../geometry';
export class CoordManager extends Base {
    getClientMatrix() {
        return Dom.createSVGMatrix(this.view.stage.getScreenCTM());
    }
    /**
     * Returns coordinates of the graph viewport, relative to the window.
     */
    getClientOffset() {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const rect = this.view.svg.getBoundingClientRect();
        return new Point(rect.left, rect.top);
    }
    /**
     * Returns coordinates of the graph viewport, relative to the document.
     */
    getPageOffset() {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        return this.getClientOffset().translate(window.scrollX, window.scrollY);
    }
    snapToGrid(x, y) {
        const p = typeof x === 'number'
            ? this.clientToLocalPoint(x, y)
            : this.clientToLocalPoint(x.x, x.y);
        return p.snapToGrid(this.graph.getGridSize());
    }
    localToGraphPoint(x, y) {
        const localPoint = Point.create(x, y);
        return Dom.transformPoint(localPoint, this.graph.matrix());
    }
    localToClientPoint(x, y) {
        const localPoint = Point.create(x, y);
        return Dom.transformPoint(localPoint, this.getClientMatrix());
    }
    localToPagePoint(x, y) {
        const p = typeof x === 'number'
            ? this.localToGraphPoint(x, y)
            : this.localToGraphPoint(x);
        return p.translate(this.getPageOffset());
    }
    localToGraphRect(x, y, width, height) {
        const localRect = Rectangle.create(x, y, width, height);
        return Dom.transformRectangle(localRect, this.graph.matrix());
    }
    localToClientRect(x, y, width, height) {
        const localRect = Rectangle.create(x, y, width, height);
        return Dom.transformRectangle(localRect, this.getClientMatrix());
    }
    localToPageRect(x, y, width, height) {
        const rect = typeof x === 'number'
            ? this.localToGraphRect(x, y, width, height)
            : this.localToGraphRect(x);
        return rect.translate(this.getPageOffset());
    }
    graphToLocalPoint(x, y) {
        const graphPoint = Point.create(x, y);
        return Dom.transformPoint(graphPoint, this.graph.matrix().inverse());
    }
    clientToLocalPoint(x, y) {
        const clientPoint = Point.create(x, y);
        return Dom.transformPoint(clientPoint, this.getClientMatrix().inverse());
    }
    clientToGraphPoint(x, y) {
        const clientPoint = Point.create(x, y);
        return Dom.transformPoint(clientPoint, this.graph.matrix().multiply(this.getClientMatrix().inverse()));
    }
    pageToLocalPoint(x, y) {
        const pagePoint = Point.create(x, y);
        const graphPoint = pagePoint.diff(this.getPageOffset());
        return this.graphToLocalPoint(graphPoint);
    }
    graphToLocalRect(x, y, width, height) {
        const graphRect = Rectangle.create(x, y, width, height);
        return Dom.transformRectangle(graphRect, this.graph.matrix().inverse());
    }
    clientToLocalRect(x, y, width, height) {
        const clientRect = Rectangle.create(x, y, width, height);
        return Dom.transformRectangle(clientRect, this.getClientMatrix().inverse());
    }
    clientToGraphRect(x, y, width, height) {
        const clientRect = Rectangle.create(x, y, width, height);
        return Dom.transformRectangle(clientRect, this.graph.matrix().multiply(this.getClientMatrix().inverse()));
    }
    pageToLocalRect(x, y, width, height) {
        const graphRect = Rectangle.create(x, y, width, height);
        const pageOffset = this.getPageOffset();
        graphRect.x -= pageOffset.x;
        graphRect.y -= pageOffset.y;
        return this.graphToLocalRect(graphRect);
    }
}
//# sourceMappingURL=coord.js.map