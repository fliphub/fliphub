import ChainedMap from './ChainedMap';
import { addPrefix, removePrefix, arrToObj } from '../../util';
class ChainedMapExtendable extends ChainedMap {
    // @TODO: should use merge?
    decorateParent(decorations) {
        if (!this.decorated)
            this.decorated = new ChainedMap(this.parent);
        decorations.forEach(decoration => {
            const method = decoration.method;
            const returnee = decoration.return || this.parent;
            const key = decoration.key || method;
            this.parent[method] = (data) => {
                this.set(key, data);
                return returnee;
            };
        });
    }
    addChain(name, Chain) {
        // making name available as a property on chainable
        if (typeof name !== 'string')
            Chain = name;
        const chained = new Chain(this);
        name = chained.name || name;
        this[name] = chained;
        this.chains.push(name);
        return this;
    }
    // @TODO: extendBool which would add `no` firstChar.toUpperCase() + rest()
    extendBool(methods, val, prefix = 'no') {
        this.extendWith(methods, val);
        this.extendWith(methods.map(method => addPrefix(method, prefix)), !val, prefix);
    }
    extendWith(methods, val, prefix) {
        const objMethods = arrToObj(methods, val);
        const keys = Object.keys(objMethods);
        this.shorthands = [...this.shorthands, ...keys];
        keys.forEach(method => {
            this[method] = (value = objMethods[method]) => {
                return this.set(removePrefix(method, 'no'), value);
            };
        });
    }
    extendFalse(methods) {
        this.extendWith(methods, false);
    }
    extendTrue(methods) {
        this.extendWith(methods, true);
    }
    extendDefault(methods) {
        this.shorthands = [...this.shorthands, ...methods];
        Object.keys(methods).forEach(method => {
            this[method] = (value = methods[method]) => this.set(method, value);
        });
    }
}
export { ChainedMapExtendable };
export default ChainedMapExtendable;
//# sourceMappingURL=ChainedMapExtendable.js.map