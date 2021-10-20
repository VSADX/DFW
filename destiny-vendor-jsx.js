function composeTemplateString(strings, props) {
    return strings.reduce((result, string, i)=>`${result}${String(props[i - 1])}${string}`
    );
}
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _WeakMultiRef_cleanup, _WeakMultiRef_finalizationGroup;
const refs = new Set();
class WeakMultiRef {
    constructor(keys){
        Object.defineProperty(this, "weakKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        _WeakMultiRef_finalizationGroup.set(this, new FinalizationRegistry(__classPrivateFieldGet(WeakMultiRef, _a, "f", _WeakMultiRef_cleanup)));
        keys.forEach((key)=>{
            const ref = new WeakRef(key);
            this.weakKeys.add(ref);
            __classPrivateFieldGet(this, _WeakMultiRef_finalizationGroup, "f").register(key, {
                set: this.weakKeys,
                ref,
                target: this
            }, ref);
        });
        refs.add(this);
    }
}
_a = WeakMultiRef, _WeakMultiRef_finalizationGroup = new WeakMap();
_WeakMultiRef_cleanup = {
    value: ({ set , ref , target  })=>{
        set.delete(ref);
        if (!set.size) {
            refs.delete(target);
        }
    }
};
var __classPrivateFieldGet1 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a1, _IterableWeakMap_cleanup, _IterableWeakMap_weakMap, _IterableWeakMap_refSet, _IterableWeakMap_finalizationGroup;
class IterableWeakMap {
    constructor(iterable = []){
        _IterableWeakMap_weakMap.set(this, new WeakMap());
        _IterableWeakMap_refSet.set(this, new Set());
        _IterableWeakMap_finalizationGroup.set(this, new FinalizationRegistry(__classPrivateFieldGet1(IterableWeakMap, _a1, "f", _IterableWeakMap_cleanup)));
        for (const [key, value] of iterable){
            this.set(key, value);
        }
    }
    set(key, value) {
        const currentValue = __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").get(key);
        if (currentValue) {
            currentValue.value = value;
            return;
        }
        const ref = new WeakRef(key);
        __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").set(key, {
            value,
            ref
        });
        __classPrivateFieldGet1(this, _IterableWeakMap_refSet, "f").add(ref);
        __classPrivateFieldGet1(this, _IterableWeakMap_finalizationGroup, "f").register(key, {
            set: __classPrivateFieldGet1(this, _IterableWeakMap_refSet, "f"),
            ref
        }, ref);
    }
    get(key) {
        return __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").get(key)?.value;
    }
    delete(key) {
        const entry = __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").get(key);
        if (!entry) return false;
        __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").delete(key);
        __classPrivateFieldGet1(this, _IterableWeakMap_refSet, "f").delete(entry.ref);
        __classPrivateFieldGet1(this, _IterableWeakMap_finalizationGroup, "f").unregister(entry.ref);
        return true;
    }
    has(key) {
        return __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").has(key);
    }
    forEach(cb) {
        for (const [key, value] of this){
            cb(value, key, this);
        }
    }
    clear() {
        for (const key of this.keys()){
            this.delete(key);
        }
    }
    emplace(key, options) {
        const heldValue = __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").get(key);
        if (!heldValue && options.insert) {
            const newValue = options.insert(key, this);
            this.set(key, newValue);
            return newValue;
        } else if (heldValue && options.update) {
            const newValue = options.update(heldValue.value, key, this);
            this.set(key, newValue);
            return newValue;
        } else {
            return heldValue?.value;
        }
    }
    get size() {
        let size = 0;
        for (const ref of __classPrivateFieldGet1(this, _IterableWeakMap_refSet, "f")){
            if (ref.deref()) size++;
        }
        return size;
    }
    [(_IterableWeakMap_weakMap = new WeakMap(), _IterableWeakMap_refSet = new WeakMap(), _IterableWeakMap_finalizationGroup = new WeakMap(), Symbol.hasInstance)](instance) {
        return instance instanceof IterableWeakMap || instance instanceof WeakMap;
    }
    *[Symbol.iterator]() {
        for (const key of this.keys()){
            const { value  } = __classPrivateFieldGet1(this, _IterableWeakMap_weakMap, "f").get(key);
            yield [
                key,
                value
            ];
        }
    }
    entries() {
        return this[Symbol.iterator]();
    }
    *keys() {
        for (const ref of __classPrivateFieldGet1(this, _IterableWeakMap_refSet, "f")){
            const key = ref.deref();
            if (!key) console.log("key", key);
            if (!key) continue;
            yield key;
        }
    }
    *values() {
        for (const [, value] of this){
            yield value;
        }
    }
}
_a1 = IterableWeakMap;
_IterableWeakMap_cleanup = {
    value: ({ set , ref  })=>{
        set.delete(ref);
    }
};
function* concatIterators(...iterators) {
    for (const iterator of iterators){
        yield* iterator;
    }
}
class PassReactiveValue {
    constructor(ref){
        Object.defineProperty(this, "deref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.deref = ref;
    }
}
var __classPrivateFieldGet2 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _inner, _a2;
const internalSetReactiveValue = new (_a2 = class {
    constructor(){
        _inner.set(this, new WeakMap());
    }
    get(key) {
        return __classPrivateFieldGet2(this, _inner, "f").get(key);
    }
    set(key, value) {
        __classPrivateFieldGet2(this, _inner, "f").set(key, value);
    }
}, _inner = new WeakMap(), _a2);
const stronglyHeldDependencies = new Map();
const weaklyHeldDependencies = new IterableWeakMap();
var __classPrivateFieldGet3 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
let computedConsumer;
var __classPrivateFieldSet1 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ReactiveValue_readonly;
var __classPrivateFieldGet4 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReadonlyReactiveValue_instances, _ReadonlyReactiveValue_value, _ReadonlyReactiveValue_callbacks, _ReadonlyReactiveValue_consumers, _ReadonlyReactiveValue_set;
class ReadonlyReactiveValue1 {
    constructor(initialValue){
        _ReadonlyReactiveValue_instances.add(this);
        _ReadonlyReactiveValue_value.set(this, void 0);
        _ReadonlyReactiveValue_callbacks.set(this, new Set);
        _ReadonlyReactiveValue_consumers.set(this, new IterableWeakMap());
        Object.defineProperty(this, "dependencies", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        __classPrivateFieldSet(this, _ReadonlyReactiveValue_value, initialValue, "f");
        internalSetReactiveValue.set(this, (...args)=>__classPrivateFieldGet4(this, _ReadonlyReactiveValue_instances, "m", _ReadonlyReactiveValue_set).call(this, ...args)
        );
    }
    valueOf() {
        return this.value;
    }
    [(_ReadonlyReactiveValue_value = new WeakMap(), _ReadonlyReactiveValue_callbacks = new WeakMap(), _ReadonlyReactiveValue_consumers = new WeakMap(), _ReadonlyReactiveValue_instances = new WeakSet(), _ReadonlyReactiveValue_set = function _ReadonlyReactiveValue_set(value, options) {
        const { noUpdate , force ,  } = {
            noUpdate: [],
            force: false,
            ...options
        };
        if (force || !Object.is(value, __classPrivateFieldGet4(this, _ReadonlyReactiveValue_value, "f"))) {
            __classPrivateFieldSet(this, _ReadonlyReactiveValue_value, value, "f");
            const callbacks = concatIterators(__classPrivateFieldGet4(this, _ReadonlyReactiveValue_callbacks, "f").values(), __classPrivateFieldGet4(this, _ReadonlyReactiveValue_consumers, "f").values());
            for (const callback of callbacks){
                if (!noUpdate.includes(callback)) {
                    callback(value);
                }
            }
        }
        return this;
    }, Symbol.toPrimitive)]() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
    get [Symbol.toStringTag]() {
        return `${this.constructor.name}<${typeof __classPrivateFieldGet4(this, _ReadonlyReactiveValue_value, "f")}>`;
    }
    async *[Symbol.asyncIterator]() {
        while(true){
            yield await this.nextUpdate;
        }
    }
    get nextUpdate() {
        return new Promise((resolve)=>{
            const cb = (v)=>{
                resolve(v);
                __classPrivateFieldGet4(this, _ReadonlyReactiveValue_callbacks, "f").delete(cb);
            };
            __classPrivateFieldGet4(this, _ReadonlyReactiveValue_callbacks, "f").add(cb);
        });
    }
    bind(callback, options = {
    }) {
        if (!options.noFirstRun) callback(this.value);
        if (options.dependents?.length) {
            const key = new WeakMultiRef(options.dependents);
            __classPrivateFieldGet4(this, _ReadonlyReactiveValue_consumers, "f").set(key, callback);
            weaklyHeldDependencies.set(key, this);
        } else {
            __classPrivateFieldGet4(this, _ReadonlyReactiveValue_callbacks, "f").add(callback);
            stronglyHeldDependencies.set(callback, this);
        }
        return this;
    }
    unbind(callback) {
        __classPrivateFieldGet4(this, _ReadonlyReactiveValue_callbacks, "f").delete(callback);
        stronglyHeldDependencies.delete(callback);
        return this;
    }
    get value() {
        if (computedConsumer) {
            const { fn , consumer  } = computedConsumer;
            consumer.dependencies.set(this, fn);
            __classPrivateFieldGet4(this, _ReadonlyReactiveValue_consumers, "f").set(consumer, fn);
        }
        return __classPrivateFieldGet4(this, _ReadonlyReactiveValue_value, "f");
    }
    pipe(callback) {
        const reactor = new ReadonlyReactiveValue1(callback(__classPrivateFieldGet4(this, _ReadonlyReactiveValue_value, "f")));
        const fn = ()=>internalSetReactiveValue.get(reactor)(callback(__classPrivateFieldGet4(this, _ReadonlyReactiveValue_value, "f")))
        ;
        reactor.dependencies.set(this, fn);
        __classPrivateFieldGet4(this, _ReadonlyReactiveValue_consumers, "f").set(reactor, fn);
        return reactor;
    }
    truthy(valueWhenTruthy, valueWhenFalsy) {
        return this.pipe((v)=>v ? valueWhenTruthy : valueWhenFalsy
        );
    }
    falsy(valueWhenFalsy, valueWhenTruthy) {
        return this.pipe((v)=>v ? valueWhenTruthy : valueWhenFalsy
        );
    }
    get pass() {
        return new PassReactiveValue(this);
    }
}
class ReactiveValue1 extends ReadonlyReactiveValue1 {
    constructor(){
        super(...arguments);
        _ReactiveValue_readonly.set(this, void 0);
    }
    update() {
        this.set(this.value, {
            force: true
        });
        return this;
    }
    set(value, options) {
        internalSetReactiveValue.get(this)(value, options);
        return this;
    }
    get value() {
        return super.value;
    }
    set value(value) {
        this.set(value);
    }
    get readonly() {
        return __classPrivateFieldGet3(this, _ReactiveValue_readonly, "f") ?? __classPrivateFieldSet1(this, _ReactiveValue_readonly, this.pipe((v)=>v
        ), "f");
    }
}
_ReactiveValue_readonly = new WeakMap();
const hold = new WeakMap();
function computed1(callback, ...props) {
    if ("raw" in callback) {
        return computed1(()=>composeTemplateString(callback, props)
        );
    }
    const cb = callback;
    const consumer = new ReactiveValue1(undefined);
    fn();
    function fn() {
        computedConsumer = {
            fn,
            consumer
        };
        const newValue = cb();
        computedConsumer = undefined;
        consumer.value = newValue;
    }
    const [options] = props;
    if (options?.dependents?.length) {
        hold.set(new WeakMultiRef([
            consumer,
            ...options.dependents
        ]), fn);
    } else {
        hold.set(consumer, fn);
    }
    return consumer.readonly;
}
function throwExpression(message, ErrorType = Error) {
    throw new ErrorType(message);
}
const deferredElements = new Map();
const nonRenderedValues = new Set([
    undefined,
    null,
    true,
    false, 
]);
const shouldBeRendered = (input)=>!nonRenderedValues.has(input)
;
const stringifyValue = (input)=>shouldBeRendered(input) ? String(input) : ""
;
function nodeToFragment(node) {
    const fragment = new DocumentFragment;
    fragment.append(node);
    return fragment;
}
const reactivePropertiesFlag = Symbol("reactivePropertiesFlag");
function resolveSlotPropIndex(value) {
    return value.startsWith("__internal_") ? Number(value.slice(11, -1)) : -1;
}
const validNamespaces = [
    "attribute",
    "prop",
    "on",
    "destiny"
];
function isValidNamespace(input) {
    return validNamespaces.includes(input);
}
function isValidAttributePair(input) {
    return input.length === 2 && isValidNamespace(input[0]);
}
function parseAttributeName(input) {
    const split = input.split(":");
    if (split.length === 1) {
        split.unshift("attribute");
    }
    if (!isValidAttributePair(split)) {
        throw new Error("Invalid namespace");
    }
    return split;
}
function safeStringifyObject(input) {
    try {
        const string = String(input);
        if (string.startsWith("[")) {
            return string;
        } else {
            return `[object ${input.constructor.name} (${string})]`;
        }
    } catch  {
        return "[unstringifiable object]";
    }
}
function describeType(input) {
    if (input === null || input === undefined) {
        return `[${String(input)}]`;
    } else if (typeof input === "object") {
        return safeStringifyObject(input);
    } else {
        return `[${typeof input} ${String(input)}]`;
    }
}
class ElementData {
    constructor(data){
        Object.defineProperty(this, "prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "on", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "destiny", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "attribute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        if (data) Object.assign(this, data);
    }
}
var __classPrivateFieldSet2 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet5 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ref_resolve, _Ref_promise;
class Ref1 {
    constructor(){
        _Ref_resolve.set(this, void 0);
        _Ref_promise.set(this, new Promise((resolve)=>{
            __classPrivateFieldSet2(this, _Ref_resolve, resolve, "f");
        }));
        console.warn("Refs are deprecated and will be removed in v0.8. Use a ReactiveValue instead.");
    }
    set value(element) {
        __classPrivateFieldGet5(this, _Ref_resolve, "f").call(this, element);
    }
    then(callbackFn) {
        __classPrivateFieldSet2(this, _Ref_promise, __classPrivateFieldGet5(this, _Ref_promise, "f").then(callbackFn), "f");
        return this;
    }
    catch(callbackFn) {
        __classPrivateFieldSet2(this, _Ref_promise, __classPrivateFieldGet5(this, _Ref_promise, "f").then(callbackFn), "f");
        return this;
    }
    finally(callbackFn) {
        __classPrivateFieldGet5(this, _Ref_promise, "f").finally(callbackFn);
        return this;
    }
}
_Ref_resolve = new WeakMap(), _Ref_promise = new WeakMap();
function isObject(input) {
    return !!input && typeof input === "object";
}
function destinyRef(element, value) {
    if (!(value instanceof ReactiveValue1 || value instanceof Ref1)) {
        throw new TypeError(`Attribute value for destiny:ref must be a ReactiveValue, but it was [${isObject(value) ? `${value.constructor.name} (Object)` : `${String(value)} (${typeof value})`}] in \n${element.outerHTML}`);
    }
    queueMicrotask(()=>{
        value.value = element;
    });
}
function destinyUnmount(element, value) {
    deferredElements.set(element, value);
}
function destinyMount(element, value) {
    if (!(value instanceof Function)) {
        throw new TypeError("Value of destiny:mount must be a function");
    }
    queueMicrotask(()=>queueMicrotask(()=>void value(element)
        )
    );
}
const propToWatcherMap = {
    value: "input",
    checked: "change",
    valueAsDate: "input",
    valueAsNumber: "input"
};
function matchChangeWatcher(attributeName) {
    return propToWatcherMap[attributeName] ?? "";
}
function doOrBind(element, key, value, whatToDo) {
    if (value instanceof ReactiveValue1) {
        const changeWatcher = matchChangeWatcher(key);
        if (changeWatcher) {
            element.addEventListener(changeWatcher, (e)=>{
                value.set(e.currentTarget?.[key], {
                    noUpdate: [
                        whatToDo
                    ]
                });
            });
        }
        value.bind(whatToDo, {
            dependents: [
                element
            ]
        });
    } else if (value instanceof ReadonlyReactiveValue1) {
        value.bind(whatToDo, {
            dependents: [
                element
            ]
        });
    } else if (value instanceof PassReactiveValue) {
        whatToDo(value.deref);
    } else {
        whatToDo(value);
    }
}
function prop(props, element) {
    for (const [key, value] of props){
        doOrBind(element, key, value, (item)=>element[key] = item
        );
    }
}
const elementDataStore = new WeakMap();
function getElementData1(element) {
    return elementDataStore.get(element);
}
function emplace(map, key, options) {
    const heldValue = map.get(key);
    if (!heldValue && options.insert) {
        const newValue = options.insert(key, map);
        map.set(key, newValue);
        return newValue;
    } else if (heldValue && options.update) {
        const newValue = options.update(heldValue, key, map);
        map.set(key, newValue);
        return newValue;
    } else {
        return heldValue;
    }
}
function concat(mapTarget, mapSource) {
    for (const [key, value] of mapSource){
        mapTarget.set(key, value);
    }
    return mapTarget;
}
function destinyProps(element, input) {
    if (typeof input !== "object" || !input) {
        throw new TypeError(`Incorrect attribute value type ${describeType(input)} provided for destiny:props`);
    }
    const map = input instanceof Map ? input : new Map(Object.entries(input));
    emplace(elementDataStore, element, {
        insert: ()=>new ElementData({
                prop: map
            })
        ,
        update: (oldData)=>(concat(oldData.prop, map), oldData)
    });
    prop(map, element);
}
function attribute(attributes, element) {
    for (const [key, value] of attributes){
        doOrBind(element, key, value, (value)=>element.setAttribute(key, String(value))
        );
    }
}
function on(eventListeners, element) {
    for (const [key, value] of eventListeners){
        if (Array.isArray(value)) {
            element.addEventListener(key, ...value);
        } else {
            element.addEventListener(key, value);
        }
    }
}
function assignElementData1(element, data, options = {
}) {
    if (!options.elementDataAlreadySet) {
        emplace(elementDataStore, element, {
            insert: ()=>data
            ,
            update: (oldData)=>{
                for (const namespace of validNamespaces){
                    concat(oldData[namespace], data[namespace]);
                }
                return oldData;
            }
        });
    }
    attribute(data.attribute, element);
    destiny(data.destiny, element);
    prop(data.prop, element);
    on(data.on, element);
}
function destinyData1(element, input) {
    if (typeof input === "undefined") return;
    if (typeof input !== "object" || !input) {
        throw new TypeError(`Invalid value ${describeType(input)} provided for destiny:data`);
    }
    assignElementData1(element, new ElementData(input));
}
const opMap = {
    ref: destinyRef,
    mount: destinyMount,
    unmount: destinyUnmount,
    props: destinyProps,
    data: destinyData1
};
function destiny(data, element) {
    for (const [key, value] of data){
        const op = opMap[key] ?? throwExpression(`Invalid property "destiny:${key}" on element:\n${element.outerHTML}.`);
        op(element, value);
    }
}
function hookAttributeSlotsUp(templ, props) {
    const attributeSlots = Object.values(templ.querySelectorAll("[destiny\\:attr],[data-capture-props]"));
    for (const element of attributeSlots){
        const { captureProps  } = element.dataset;
        const values = new ElementData;
        for (const { name , value  } of element.attributes){
            const propIndex = resolveSlotPropIndex(value);
            if (propIndex === -1) {
                if (captureProps && name !== "destiny:attr") {
                    const [namespace, attributeName] = parseAttributeName(name);
                    values[namespace].set(attributeName, value);
                }
                continue;
            }
            const attrVal = props[propIndex];
            const [namespace, attributeName] = parseAttributeName(name);
            values[namespace].set(attributeName, attrVal);
        }
        elementDataStore.set(element, values);
        if (!captureProps) {
            assignElementData1(element, values, {
                elementDataAlreadySet: true
            });
        }
    }
}
class Renderable {
}
const stronglyHeldDependencies1 = new Map();
const weaklyHeldDependencies1 = new IterableWeakMap();
var __classPrivateFieldGet6 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _inner1, _a3;
const internalArrays = new (_a3 = class {
    constructor(){
        _inner1.set(this, new WeakMap());
    }
    get(key) {
        return __classPrivateFieldGet6(this, _inner1, "f").get(key);
    }
    set(key, value) {
        __classPrivateFieldGet6(this, _inner1, "f").set(key, value);
    }
}, _inner1 = new WeakMap(), _a3);
var __classPrivateFieldGet7 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _inner2, _a4;
const splicers = new (_a4 = class {
    constructor(){
        _inner2.set(this, new WeakMap());
    }
    get(key) {
        return __classPrivateFieldGet7(this, _inner2, "f").get(key);
    }
    set(key, value) {
        __classPrivateFieldGet7(this, _inner2, "f").set(key, value);
    }
}, _inner2 = new WeakMap(), _a4);
const processUpdateQueue = (updateQueue, filteredArray)=>{
    if (!updateQueue.length) return;
    const addedItems = [];
    let deleteCount = 0;
    for (const item of updateQueue){
        if (item.show) {
            addedItems.push(item.value);
        } else {
            deleteCount++;
        }
    }
    const startEditingAt = updateQueue.find((v)=>v.show
    )?.index ?? updateQueue[0].index + 1;
    filteredArray.splice(startEditingAt, deleteCount, ...addedItems);
    updateQueue.splice(0, updateQueue.length);
};
const updateFilteredArray = (callback, sourceArray, filteredArray, maskArray)=>{
    let newIndex = -1;
    const updateQueue = [];
    for (const [i, item] of sourceArray.entries()){
        const showThis = callback(item, i, sourceArray);
        if (showThis) {
            newIndex++;
        }
        if (showThis !== (maskArray[i]?.show ?? throwExpression("Internal error: failed to filter", RangeError))) {
            const current = {
                index: newIndex,
                show: showThis,
                value: item
            };
            updateQueue.push(current);
            maskArray[i] = current;
        } else {
            processUpdateQueue(updateQueue, filteredArray);
        }
    }
    processUpdateQueue(updateQueue, filteredArray);
};
var __classPrivateFieldSet3 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldSet4 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldSet5 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet8 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TemplateResult_template, _TemplateResult_props;
class TemplateResult extends Renderable {
    constructor(template, props){
        super();
        _TemplateResult_template.set(this, void 0);
        _TemplateResult_props.set(this, void 0);
        __classPrivateFieldSet5(this, _TemplateResult_template, template, "f");
        __classPrivateFieldSet5(this, _TemplateResult_props, props, "f");
    }
    get content() {
        const content = __classPrivateFieldGet8(this, _TemplateResult_template, "f").content.cloneNode(true);
        hookSlotsUp(content, __classPrivateFieldGet8(this, _TemplateResult_props, "f"));
        return content;
    }
}
const specialCaseObjects = [
    Function,
    Date,
    RegExp,
    DocumentFragment,
    TemplateResult,
    Node, 
];
function isSpecialCaseObject(input) {
    const type = typeof input;
    if (type === "function") return true;
    else if (type !== "object") return false;
    else return specialCaseObjects.some((constr)=>input instanceof constr
    );
}
function makeNonPrimitiveItemsReactive(items, parent) {
    return items.map((v)=>{
        return isReactive(v) || !isObject(v) || isSpecialCaseObject(v) ? v : reactive1(v, {
            parent: parent
        });
    });
}
function reactive1(initialValue, options = {
}) {
    if (isReactive(initialValue)) {
        return initialValue;
    }
    const { parent  } = options;
    let ref;
    if (isObject(initialValue)) {
        if (Array.isArray(initialValue)) {
            ref = new ReactiveArray1(...initialValue);
        } else if (initialValue instanceof Promise) {
            const temp = new ReactiveValue1(options.fallback);
            void initialValue.then((value)=>temp.value = value
            );
            ref = temp;
        } else if (isSpecialCaseObject(initialValue)) {
            ref = new ReactiveValue1(initialValue);
        } else {
            return reactiveProperties1(initialValue, options.parent);
        }
    } else {
        ref = new ReactiveValue1(initialValue);
    }
    if (parent) {
        ref.bind(()=>parent.update()
        );
    }
    return ref;
}
function reactiveProperties1(input, parent) {
    if (![
        null,
        Object
    ].includes(input.constructor)) {
        throw new TypeError(`Illegal object ${describeType(input)} passed to \`reactiveProperties()\`. You must either pass in objects that have \`Object\` or \`null\` as their prototype, or wrap the objects using \`ReactiveValue\`.`);
    }
    const result = Object.fromEntries(Object.entries(input).map((entry)=>(entry[1] = reactive1(entry[1], {
            parent
        }), entry)
    ));
    result[reactivePropertiesFlag] = true;
    return Object.freeze(result);
}
function hookSlotsUp(template, props) {
    hookAttributeSlotsUp(template, props);
    hookContentSlotsUp(template, props);
}
var __classPrivateFieldGet9 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet6 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _SlotArray_instances, _SlotArray_startAnchor, _SlotArray_endAnchor, _SlotArray_source, _SlotArray_domArray, _SlotArray_insertToDom, _SlotArray_removeFromDom;
class SlotArray1 {
    constructor(placeholderNode, source){
        _SlotArray_instances.add(this);
        _SlotArray_startAnchor.set(this, new Comment("<DestinyArray>"));
        _SlotArray_endAnchor.set(this, new Comment("</DestinyArray>"));
        _SlotArray_source.set(this, void 0);
        _SlotArray_domArray.set(this, []);
        Object.defineProperty(this, "update", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index, deleteCount, ...items)=>{
                __classPrivateFieldGet9(this, _SlotArray_instances, "m", _SlotArray_removeFromDom).call(this, index, deleteCount);
                __classPrivateFieldGet9(this, _SlotArray_instances, "m", _SlotArray_insertToDom).call(this, index, ...items);
            }
        });
        placeholderNode.replaceWith(__classPrivateFieldGet9(this, _SlotArray_startAnchor, "f"), __classPrivateFieldGet9(this, _SlotArray_endAnchor, "f"));
        __classPrivateFieldSet6(this, _SlotArray_source, source, "f");
        __classPrivateFieldGet9(this, _SlotArray_source, "f").bind(this.update, {
            dependents: [
                this
            ]
        });
    }
}
function hookContentSlotsUp(templ, props) {
    const contentSlots = Object.values(templ.querySelectorAll("[destiny\\:content]"));
    for (const contentSlot of contentSlots){
        const index = contentSlot.getAttribute("destiny:content");
        const item = props[Number(index)];
        if (item instanceof ReadonlyReactiveValue1) {
            const slot = new Slot(contentSlot);
            item.bind((value)=>{
                slot.update(valueToFragment(value));
            }, {
                dependents: [
                    slot
                ]
            });
        } else if (item instanceof ReadonlyReactiveArray1) {
            new SlotArray1(contentSlot, item);
        } else {
            new Slot(contentSlot, valueToFragment(item));
        }
    }
}
var __classPrivateFieldGet10 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReadonlyReactiveArray_instances, _ReadonlyReactiveArray___value, _ReadonlyReactiveArray_value_get, _ReadonlyReactiveArray_indices, _ReadonlyReactiveArray_callbacks, _ReadonlyReactiveArray_consumers, _ReadonlyReactiveArray_length, _ReadonlyReactiveArray_nextUpdate, _ReadonlyReactiveArray_argsForFullUpdate, _ReadonlyReactiveArray_splice, _ReadonlyReactiveArray_dispatchUpdateEvents, _ReadonlyReactiveArray_adjustIndices;
class ReadonlyReactiveArray1 {
    constructor(...input){
        _ReadonlyReactiveArray_instances.add(this);
        _ReadonlyReactiveArray___value.set(this, void 0);
        _ReadonlyReactiveArray_indices.set(this, void 0);
        _ReadonlyReactiveArray_callbacks.set(this, new Set);
        _ReadonlyReactiveArray_consumers.set(this, new IterableWeakMap());
        _ReadonlyReactiveArray_length.set(this, void 0);
        __classPrivateFieldSet4(this, _ReadonlyReactiveArray___value, makeNonPrimitiveItemsReactive(input, this), "f");
        __classPrivateFieldSet4(this, _ReadonlyReactiveArray_length, computed1(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length
        ), "f");
        __classPrivateFieldSet4(this, _ReadonlyReactiveArray_indices, input.map((_, i)=>new ReactiveValue1(i)
        ), "f");
        splicers.set(this, (...args)=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(this, ...args)
        );
        internalArrays.set(this, __classPrivateFieldGet10(this, _ReadonlyReactiveArray___value, "f"));
    }
    toJSON() {
        return this.value;
    }
    *[(_ReadonlyReactiveArray___value = new WeakMap(), _ReadonlyReactiveArray_indices = new WeakMap(), _ReadonlyReactiveArray_callbacks = new WeakMap(), _ReadonlyReactiveArray_consumers = new WeakMap(), _ReadonlyReactiveArray_length = new WeakMap(), _ReadonlyReactiveArray_instances = new WeakSet(), _ReadonlyReactiveArray_value_get = function _ReadonlyReactiveArray_value_get() {
        if (computedConsumer) {
            const { fn , consumer  } = computedConsumer;
            consumer.dependencies.set(this, fn);
            __classPrivateFieldGet10(this, _ReadonlyReactiveArray_consumers, "f").set(consumer, fn);
        }
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray___value, "f");
    }, Symbol.iterator)]() {
        yield* __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get);
    }
    async *[Symbol.asyncIterator]() {
        while(true){
            yield await __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_nextUpdate).call(this);
        }
    }
    get length() {
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_length, "f");
    }
    get value() {
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).slice(0);
    }
    set value(items) {
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(this, 0, __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length, ...items);
    }
    get(index) {
        const i = index < 0 ? __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length + index : index;
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get)[i];
    }
    set(index, value) {
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(this, index, 1, value);
        return this;
    }
    pipe(callback) {
        const reactor = new ReadonlyReactiveValue1(callback(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_argsForFullUpdate).call(this)));
        const fn = ()=>internalSetReactiveValue.get(reactor)(callback(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_argsForFullUpdate).call(this)))
        ;
        reactor.dependencies.set(this, fn);
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_consumers, "f").set(reactor, fn);
        return reactor;
    }
    bind(callback, options = {
    }) {
        if (!options.noFirstRun) {
            callback(0, 0, ...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get));
        }
        if (options.dependents?.length) {
            const key = new WeakMultiRef(options.dependents);
            __classPrivateFieldGet10(this, _ReadonlyReactiveArray_consumers, "f").set(key, callback);
            weaklyHeldDependencies1.set(key, this);
        } else {
            __classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").add(callback);
            stronglyHeldDependencies1.set(callback, this);
        }
        return this;
    }
    unbind(callback) {
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").delete(callback);
        stronglyHeldDependencies1.delete(callback);
        return this;
    }
    update() {
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_dispatchUpdateEvents).call(this, 0, 0);
        return this;
    }
    filter(callback, dependencies = []) {
        const filteredArray = new ReactiveArray1;
        const maskArray = [];
        dependencies.forEach((dependency)=>{
            dependency.bind(()=>updateFilteredArray(callback, __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get), filteredArray, maskArray)
            , {
                noFirstRun: true,
                dependents: [
                    filteredArray
                ]
            });
        });
        this.bind((start, deletes, ...items)=>{
            if (deletes === 0 && items.length === 0) {
                updateFilteredArray(callback, __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get), filteredArray, maskArray);
            }
            const lastInMask = maskArray.slice(0, start).reverse().find((v)=>v.show
            );
            const newItems = [];
            let currentIndex = lastInMask?.index ?? -1;
            const deletedMaskEntries = deletes ? maskArray.splice(start, deletes) : [];
            for (const [i, item] of items.entries()){
                const sourceIndex = start + i;
                const showThis = callback(item, sourceIndex, __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get));
                if (showThis) {
                    currentIndex++;
                }
                const current = {
                    index: currentIndex,
                    show: showThis
                };
                maskArray.splice(sourceIndex, 0, current);
                if (showThis) {
                    newItems.push(item);
                }
            }
            const deletedItemCount = deletedMaskEntries.filter((v)=>v.show
            ).length;
            if (newItems.length || deletedItemCount) {
                __classPrivateFieldGet10(filteredArray, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(filteredArray, (lastInMask?.index ?? -1) + 1, deletedItemCount, ...newItems);
            }
            const shiftTailBy = newItems.length - deletedItemCount;
            if (shiftTailBy) {
                for(let i = start + items.length; i < maskArray.length; i++){
                    maskArray[i].index += shiftTailBy;
                }
            }
        }, {
            dependents: [
                filteredArray
            ]
        });
        return filteredArray.readonly;
    }
    flat() {
        const newArray = new ReactiveArray1(...flatten(__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get)));
        this.bind(()=>newArray.value = flatten(__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get))
        , {
            noFirstRun: false,
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    flatMap(callback) {
        const flatMap = ()=>flatten(__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).flatMap(callback))
        ;
        const newArray = new ReactiveArray1(...flatMap());
        this.bind(()=>newArray.value = flatMap()
        , {
            noFirstRun: false,
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    map(callback) {
        const cb = (v, i)=>callback(v, __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[i]?.readonly ?? throwExpression("Internal error: lost track of index"), this)
        ;
        const newArray = new ReadonlyReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).map(cb));
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").add((index, deleteCount, ...values)=>splicers.get(newArray)(index, deleteCount, ...values.map((v, i)=>cb(v, i + index)
            ))
        );
        return newArray;
    }
    clone() {
        return new ReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get));
    }
    slice(start = 0, end = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length - 1) {
        const newArray = new ReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).slice(start, end));
        this.bind(()=>newArray.value = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).slice(start, end)
        , {
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    indexOf(...args) {
        const index = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).indexOf(...args);
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[index]?.readonly ?? new ReadonlyReactiveValue1(-1);
    }
    lastIndexOf(...args) {
        const index = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).lastIndexOf(...args);
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[index]?.readonly ?? new ReadonlyReactiveValue1(-1);
    }
    join(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).join(...args)
        );
    }
    every(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).every(...args)
        );
    }
    some(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).some(...args)
        );
    }
    exclusiveSome(cb) {
        return this.pipe(()=>{
            const mappedValues = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).map(cb);
            return mappedValues.includes(false) && mappedValues.includes(true);
        });
    }
    forEach(...args) {
        this.bind((_index, _deleteCount, ...addedItems)=>addedItems.forEach(...args)
        );
    }
    reduce(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).reduce(...args)
        );
    }
    reduceRight(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).reduceRight(...args)
        );
    }
    find(...args) {
        return __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).find(...args);
    }
    findIndex(...args) {
        const index = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).findIndex(...args);
        return index === -1 ? new ReadonlyReactiveValue1(-1) : __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[index]?.readonly ?? throwExpression("Internal error: lost track of index");
    }
    entries() {
        const newArray = new ReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).map((value, i)=>[
                __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[i]?.readonly ?? throwExpression("Internal error: lost track of index"),
                value, 
            ]
        ));
        this.bind((index, deleteCount, ...addedItems)=>{
            __classPrivateFieldGet10(newArray, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(newArray, index, deleteCount, ...addedItems.map((value, i)=>[
                    __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[index + i]?.readonly ?? throwExpression("Internal error: lost track of index"),
                    value, 
                ]
            ));
        }, {
            noFirstRun: true,
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    keys() {
        const newArray = new ReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f").map((index)=>index.readonly
        ));
        this.bind((index, deleteCount, ...addedItems)=>{
            __classPrivateFieldGet10(newArray, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(newArray, index, deleteCount, ...addedItems.map((_, i)=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[index + i]?.readonly ?? throwExpression("Internal error: lost track of index")
            ));
        }, {
            noFirstRun: true,
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    values() {
        const newArray = new ReactiveArray1(...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).values());
        this.bind((index, deleteCount, ...addedItems)=>{
            __classPrivateFieldGet10(newArray, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_splice).call(newArray, index, deleteCount, ...addedItems.values());
        }, {
            noFirstRun: true,
            dependents: [
                newArray
            ]
        });
        return newArray.readonly;
    }
    includes(...args) {
        return this.pipe(()=>__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).includes(...args)
        );
    }
    concat(...items) {
        const newArray = this.clone();
        this.bind((...args)=>splicers.get(newArray)(...args)
        , {
            dependents: [
                newArray
            ]
        });
        const lengthTally = [
            this.length, 
        ];
        function currentOffset(cutoff, index = 0) {
            let tally = index;
            for(let i = 0; i < cutoff; i++){
                tally += lengthTally[i]?.value ?? throwExpression("Internal error: failed to concatenate", RangeError);
            }
            return tally;
        }
        for (const [i, item] of items.entries()){
            if (item instanceof ReadonlyReactiveArray1) {
                item.bind((index, deleteCount, ...values)=>newArray.splice(currentOffset(i, index), deleteCount, ...values)
                , {
                    dependents: [
                        newArray
                    ]
                });
                lengthTally.push(item.length);
            } else if (item instanceof ReadonlyReactiveValue1) {
                item.bind((value)=>newArray.splice(currentOffset(i), 1, value)
                , {
                    dependents: [
                        newArray
                    ]
                });
                lengthTally.push({
                    value: 1
                });
            } else if (Array.isArray(item)) {
                newArray.splice(currentOffset(i), 0, ...item);
                lengthTally.push({
                    value: item.length
                });
            } else {
                newArray.splice(currentOffset(i), 0, item);
                lengthTally.push({
                    value: 1
                });
            }
        }
        return newArray;
    }
}
const flatten = (input)=>{
    return input.reduce((acc, v)=>{
        v instanceof ReadonlyReactiveArray1 ? acc.push(...v.value) : acc.push(v);
        return acc;
    }, []);
};
function isReactive(input) {
    return [
        ReadonlyReactiveArray1,
        ReadonlyReactiveValue1, 
    ].some((constr)=>input instanceof constr
    ) || !!input && typeof input === "object" && reactivePropertiesFlag in input;
}
function valueToFragment(value) {
    if (value instanceof TemplateResult) {
        return value.content;
    } else if (value instanceof DocumentFragment) {
        return value;
    } else if (value instanceof Node) {
        return nodeToFragment(value);
    } else if (Array.isArray(value)) {
        return arrayToFragment(value);
    } else {
        return nodeToFragment(new Text(stringifyValue(value)));
    }
}
function arrayToFragment(values) {
    const fragment = new DocumentFragment;
    fragment.append(...values.filter(shouldBeRendered).map(valueToFragment));
    return fragment;
}
var __classPrivateFieldSet7 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet11 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReactiveArray_value, _ReactiveArray_readonly;
class ReactiveArray1 extends ReadonlyReactiveArray1 {
    constructor(...input){
        super(...input);
        _ReactiveArray_value.set(this, void 0);
        _ReactiveArray_readonly.set(this, undefined);
        __classPrivateFieldSet3(this, _ReactiveArray_value, internalArrays.get(this), "f");
    }
    get readonly() {
        return __classPrivateFieldGet11(this, _ReactiveArray_readonly, "f") ?? __classPrivateFieldSet3(this, _ReactiveArray_readonly, (()=>{
            const newArray = new ReadonlyReactiveArray1();
            this.bind((...args)=>splicers.get(newArray)(...args)
            , {
                dependents: [
                    newArray
                ]
            });
            return newArray;
        })(), "f");
    }
    splice(start, deleteCount, ...items) {
        return splicers.get(this)(start, deleteCount, ...items);
    }
    copyWithin(target, start = 0, end = __classPrivateFieldGet11(this, _ReactiveArray_value, "f").length) {
        const { length  } = __classPrivateFieldGet11(this, _ReactiveArray_value, "f");
        target = (target + length) % length;
        start = (start + length) % length;
        end = (end + length) % length;
        const deleteCount = Math.min(length - start, end - start);
        this.splice(target, deleteCount, ...__classPrivateFieldGet11(this, _ReactiveArray_value, "f").slice(start, deleteCount + start));
        return this;
    }
    fill(value, start = 0, end = __classPrivateFieldGet11(this, _ReactiveArray_value, "f").length) {
        const length = end - start;
        this.splice(start, length, ...Array.from({
            length
        }, ()=>value
        ));
        return this;
    }
    mutFilter(callback) {
        __classPrivateFieldGet11(this, _ReactiveArray_value, "f").flatMap((v, i, a)=>callback(v, i, a) ? [] : i
        ).reduce((acc, indexToDelete)=>{
            const [first] = acc;
            if (!first || first[0] + first[1] !== indexToDelete) {
                acc.unshift([
                    indexToDelete,
                    1
                ]);
            } else {
                first[1]++;
            }
            return acc;
        }, []).forEach((args)=>{
            this.splice(...args);
        });
        return this;
    }
    mutMap(callback) {
        __classPrivateFieldGet11(this, _ReactiveArray_value, "f").flatMap((v, i, a)=>{
            const newValue = callback(v, i, a);
            return newValue === v ? [] : {
                index: i,
                value: newValue
            };
        }).reduce((acc, { index , value  })=>{
            if (!acc.length || acc[0][0] + acc[0][1] !== index) {
                acc.unshift([
                    index,
                    1,
                    value
                ]);
            } else {
                acc[0][1]++;
                acc[0].push(value);
            }
            return acc;
        }, []).forEach((args)=>{
            this.splice(...args);
        });
        return this;
    }
    pop() {
        return this.splice(-1, 1)[0];
    }
    push(...items) {
        this.splice(__classPrivateFieldGet11(this, _ReactiveArray_value, "f").length, 0, ...items);
        return this.length;
    }
    reverse() {
        this.value = this.value.reverse();
        return this;
    }
    shift() {
        return this.splice(0, 1)[0];
    }
    sort(compareFn) {
        this.value = this.value.sort(compareFn);
        return this;
    }
    unshift(...items) {
        this.splice(0, 0, ...items);
        return this.length;
    }
}
_ReactiveArray_value = new WeakMap(), _ReactiveArray_readonly = new WeakMap();
_ReadonlyReactiveArray_nextUpdate = function _ReadonlyReactiveArray_nextUpdate() {
    return new Promise((resolve)=>{
        const cb = (...props)=>{
            resolve(props);
            __classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").delete(cb);
        };
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").add(cb);
    });
}, _ReadonlyReactiveArray_argsForFullUpdate = function _ReadonlyReactiveArray_argsForFullUpdate() {
    return [
        0,
        __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length,
        ...__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get)
    ];
}, _ReadonlyReactiveArray_splice = function _ReadonlyReactiveArray_splice(start, deleteCount = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length - start, ...items) {
    if (start > __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length) {
        throw new RangeError(`Out of bounds assignment: tried to assign to index ${start}, but array length was only ${__classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).length}. Sparse arrays are not allowed. Consider using .push() instead.`);
    }
    __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_adjustIndices).call(this, start, deleteCount, items);
    const reactiveItems = makeNonPrimitiveItemsReactive(items, this);
    const deletedItems = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "a", _ReadonlyReactiveArray_value_get).splice(start, deleteCount, ...reactiveItems);
    __classPrivateFieldGet10(this, _ReadonlyReactiveArray_instances, "m", _ReadonlyReactiveArray_dispatchUpdateEvents).call(this, start, deleteCount, reactiveItems);
    return deletedItems;
}, _ReadonlyReactiveArray_dispatchUpdateEvents = function _ReadonlyReactiveArray_dispatchUpdateEvents(start, deleteCount, newItems = []) {
    const callbacks = concatIterators(__classPrivateFieldGet10(this, _ReadonlyReactiveArray_callbacks, "f").values(), __classPrivateFieldGet10(this, _ReadonlyReactiveArray_consumers, "f").values());
    for (const callback of callbacks){
        callback(start, deleteCount, ...newItems);
    }
}, _ReadonlyReactiveArray_adjustIndices = function _ReadonlyReactiveArray_adjustIndices(start, deleteCount, items) {
    const shiftedBy = items.length - deleteCount;
    if (shiftedBy) {
        for(let i = start + deleteCount; i < __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f").length; i++){
            __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f")[i].value += shiftedBy;
        }
    }
    const removedIndices = __classPrivateFieldGet10(this, _ReadonlyReactiveArray_indices, "f").splice(start, deleteCount, ...items.map((_, i)=>new ReactiveValue1(i + start)
    ));
    for (const removedIndex of removedIndices){
        removedIndex.value = -1;
    }
};
_TemplateResult_template = new WeakMap(), _TemplateResult_props = new WeakMap();
var __classPrivateFieldGet12 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Slot_instances, _Slot_id, _Slot_startAnchor, _Slot_endAnchor, _Slot_nodes, _Slot_brandNodes, _Slot_disposeNodes, _Slot_disposeCurrentNodes;
let counter = 0;
class Slot {
    constructor(placeholderNode, content){
        _Slot_instances.add(this);
        _Slot_id.set(this, counter++);
        _Slot_startAnchor.set(this, new Comment(`<DestinySlot(${__classPrivateFieldGet12(this, _Slot_id, "f")})>`));
        _Slot_endAnchor.set(this, new Comment(`</DestinySlot(${__classPrivateFieldGet12(this, _Slot_id, "f")})>`));
        _Slot_nodes.set(this, void 0);
        __classPrivateFieldSet7(this, _Slot_nodes, [
            placeholderNode
        ], "f");
        placeholderNode.replaceWith(__classPrivateFieldGet12(this, _Slot_startAnchor, "f"), placeholderNode, __classPrivateFieldGet12(this, _Slot_endAnchor, "f"));
        if (content) {
            this.update(content);
        }
    }
    replaceItem(whatToReplace, ...nodes) {
        const location = __classPrivateFieldGet12(this, _Slot_nodes, "f").indexOf(whatToReplace);
        if (location < 0) throw new Error("Can't replace an item that isn't here.");
        const newNodes = nodes.flatMap((v)=>typeof v === "string" ? new Text(v) : v instanceof DocumentFragment ? [
                ...v.childNodes
            ] : v
        );
        __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_brandNodes).call(this, newNodes);
        whatToReplace.before(...newNodes);
        void __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_disposeNodes).call(this, [
            whatToReplace
        ]);
        __classPrivateFieldGet12(this, _Slot_nodes, "f").splice(location, 1, ...newNodes);
    }
    update(input) {
        const fragment = input instanceof TemplateResult ? input.content : input;
        void __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_disposeCurrentNodes).call(this);
        __classPrivateFieldSet7(this, _Slot_nodes, Object.values(fragment.childNodes), "f");
        __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_brandNodes).call(this, __classPrivateFieldGet12(this, _Slot_nodes, "f"));
        __classPrivateFieldGet12(this, _Slot_endAnchor, "f").before(fragment);
    }
    async remove() {
        await __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_disposeCurrentNodes).call(this);
        __classPrivateFieldGet12(this, _Slot_startAnchor, "f").remove();
        __classPrivateFieldGet12(this, _Slot_endAnchor, "f").remove();
    }
    insertBeforeThis(...nodes) {
        __classPrivateFieldGet12(this, _Slot_startAnchor, "f").before(...nodes);
    }
}
_Slot_id = new WeakMap(), _Slot_startAnchor = new WeakMap(), _Slot_endAnchor = new WeakMap(), _Slot_nodes = new WeakMap(), _Slot_instances = new WeakSet(), _Slot_brandNodes = function _Slot_brandNodes(nodes) {
    nodes.forEach((node)=>node.destinySlot = this
    );
}, _Slot_disposeNodes = async function _Slot_disposeNodes(nodesToDisposeOf) {
    await Promise.all(nodesToDisposeOf.map((node)=>deferredElements.get(node)?.(node)
    ));
    for (const node of nodesToDisposeOf){
        node.remove();
    }
}, _Slot_disposeCurrentNodes = async function _Slot_disposeCurrentNodes() {
    await __classPrivateFieldGet12(this, _Slot_instances, "m", _Slot_disposeNodes).call(this, __classPrivateFieldGet12(this, _Slot_nodes, "f").splice(0, __classPrivateFieldGet12(this, _Slot_nodes, "f").length));
};
_SlotArray_startAnchor = new WeakMap(), _SlotArray_endAnchor = new WeakMap(), _SlotArray_source = new WeakMap(), _SlotArray_domArray = new WeakMap(), _SlotArray_instances = new WeakSet(), _SlotArray_insertToDom = function _SlotArray_insertToDom(index, ...fragments) {
    fragments.forEach((fragment, i)=>{
        const where = i + index;
        const slotPlaceholder = new Comment("Destiny slot placeholder");
        if (!__classPrivateFieldGet9(this, _SlotArray_domArray, "f").length || where > __classPrivateFieldGet9(this, _SlotArray_domArray, "f").length - 1) {
            __classPrivateFieldGet9(this, _SlotArray_endAnchor, "f").before(slotPlaceholder);
        } else {
            const target = __classPrivateFieldGet9(this, _SlotArray_domArray, "f")[where];
            if (!target) throwExpression(`Tried to insert to DOM at an invalid position ${where} at an array of length ${__classPrivateFieldGet9(this, _SlotArray_domArray, "f").length}`, RangeError);
            target.insertBeforeThis(slotPlaceholder);
        }
        __classPrivateFieldGet9(this, _SlotArray_domArray, "f").splice(where, 0, new Slot(slotPlaceholder, fragment));
    });
}, _SlotArray_removeFromDom = function _SlotArray_removeFromDom(from, count) {
    const to = Math.min(from + count, __classPrivateFieldGet9(this, _SlotArray_domArray, "f").length);
    for(let i = from; i < to; i++){
        void __classPrivateFieldGet9(this, _SlotArray_domArray, "f")[i]?.remove();
    }
    __classPrivateFieldGet9(this, _SlotArray_domArray, "f").splice(from, count);
};
function isRenderable(input) {
    return Boolean(input) && input instanceof Renderable;
}
class TemplateCache extends WeakMap {
    computeIfAbsent(key, set, props) {
        const template = this.get(key);
        if (!template) {
            const newTemplate = set();
            this.set(key, newTemplate);
            return newTemplate[0];
        } else {
            for (const [k, v] of template[1]){
                if (props[k] !== v) return set()[0];
            }
            return template[0];
        }
    }
}
function resolveSlots(template) {
    const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    const contentSlots = [];
    while(walker.nextNode()){
        const node = walker.currentNode;
        if (isTextNode(node)) {
            const matches = node.wholeText.matchAll(/"__internal_([0-9]+)_"/gu);
            const fragment = {
                node,
                slots: [
                    ...matches
                ].map((match)=>({
                        index: Number(match[1]),
                        start: match.index,
                        end: match.index + match[0].length
                    })
                )
            };
            if (fragment.slots.length) {
                contentSlots.push(fragment);
            }
        } else if (isElement(node)) {
            for (const { value  } of node.attributes){
                if (value.includes("__internal_")) {
                    node.setAttribute("destiny:attr", "");
                }
            }
        }
    }
    prepareContentSlots(contentSlots);
}
const namespaces = `xmlns="http://www.w3.org/1999/xhtml" xmlns:on="p:u" xmlns:prop="p:u" xmlns:destiny="p:u"`;
function arrayWrap(input) {
    return Array.isArray(input) ? input : [
        input
    ];
}
const supportsAdoptedStyleSheets = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
function attachCSSProperties1(element, styles) {
    for (const [property, source] of Object.entries(styles)){
        source.bind((value)=>element.style.setProperty(property, value)
        , {
            dependents: [
                element
            ]
        });
    }
}
const pseudoRandomId = pseudoRandomIdGenerator();
function componentOrComponentModule(module) {
    if (isComponent(module)) {
        return module;
    }
    if (typeof module !== "object" || !module) {
        throw new TypeError(`Invalid type ${describeType(module)} supplied for prop:for`);
    }
    const component = module.default;
    if (!isComponent(component)) {
        throw new TypeError(`Invalid component constructor ${describeType(component)} supplied for asynchronously loaded element. Expected type is a Promise that resolves to a Component or to a module with a Component as the default export.`);
    }
    return component;
}
const templateCache = new TemplateCache;
function isComponent(input) {
    return Boolean(input) && typeof input === "function" && Object.prototype.isPrototypeOf.call(Component1, input);
}
const xmlDocument = new DOMParser().parseFromString(`<xml ${namespaces} />`, "application/xhtml+xml");
const xmlRange = xmlDocument.createRange();
const xmlRoot = xmlDocument.querySelector("xml");
xmlRange.setStart(xmlRoot, 0);
xmlRange.setEnd(xmlRoot, 0);
let notSafari = true;
function parseString(string) {
    const templateElement = document.createElement("template");
    if (notSafari) {
        try {
            templateElement.content.append(xmlRange.createContextualFragment(string));
        } catch (error) {
            const { message  } = error;
            if (message === "The string did not match the expected pattern.") {
                notSafari = false;
                parseInSafari(templateElement, string);
            } else {
                throw new SyntaxError(`${message}\nat\n${string}\nwhich resulted in the following message:\n${getXmlErrorMessage(parseAsNewDocument(string.replace(/^\n/, "")))}`);
            }
        }
    } else {
        parseInSafari(templateElement, string);
    }
    return templateElement;
}
function createTemplate([first, ...strings], props) {
    let string = first;
    const tagProps = new Map();
    for (const [i, fragment] of strings.entries()){
        const prop = props[i];
        if (string.endsWith("<")) {
            tagProps.set(i, prop);
            if (isComponent(prop) && prop.captureProps) {
                string += `${prop.register()} data-capture-props="true"${fragment}`;
            } else if (prop instanceof Promise) {
                string += `${DestinyFallback.register()} prop:for="__internal_${i}_" data-capture-props="true"${fragment}`;
            } else {
                string += String(prop) + fragment;
            }
        } else if (string.endsWith("</")) {
            tagProps.set(i, prop);
            if (prop instanceof Promise) {
                string += DestinyFallback.register() + fragment;
            } else {
                string += String(prop) + fragment;
            }
        } else {
            string += `"__internal_${i}_"${fragment}`;
        }
    }
    const templateElement = parseString(string);
    resolveSlots(templateElement);
    return [
        templateElement,
        tagProps
    ];
}
const registeredComponents = new Map();
function register1(componentConstructor, noHash = true) {
    const registeredName = registeredComponents.get(componentConstructor);
    if (registeredName) {
        return registeredName;
    }
    const givenName = componentConstructor.name;
    const name = `${givenName ? pascalToKebab(givenName) : "anonymous"}${noHash ? "" : `-${pseudoRandomId.next().value}`}`;
    customElements.define(name, componentConstructor);
    registeredComponents.set(componentConstructor, name);
    return name;
}
class ComponentImplementation extends HTMLElement {
    constructor(){
        super();
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: xml1`<slot />`
        });
        if (new.target === ComponentImplementation) {
            throw new TypeError("Can't initialize abstract class.");
        }
        const shadow = this.attachShadow({
            mode: "open"
        });
        queueMicrotask(()=>{
            for (const [key, value] of this.elementData?.prop ?? []){
                let proto = this.constructor.prototype;
                let descriptor;
                while(!descriptor && proto && proto !== HTMLElement){
                    descriptor = Object.getOwnPropertyDescriptor(proto, key);
                    proto = Object.getPrototypeOf(proto);
                }
                if (!descriptor?.set) continue;
                delete this[key];
                this[key] = value;
            }
            shadow.appendChild(isReactive(this.template) ? xml1`${this.template}`.content : this.template.content);
            if (supportsAdoptedStyleSheets) {
                shadow.adoptedStyleSheets = arrayWrap(new.target.styles).map((v)=>v.styleSheet
                );
            } else {
                shadow.append(...arrayWrap(new.target.styles).map((v)=>v.styleElement
                ));
            }
        });
    }
    attachCSSProperties(styles) {
        attachCSSProperties1(this, styles);
    }
    replaceWith(...nodes) {
        if (this.destinySlot) {
            this.destinySlot.replaceItem(this, ...nodes);
        } else {
            super.replaceWith(...nodes);
        }
    }
    unmount(callback) {
        deferredElements.set(this, callback);
        return this;
    }
    get elementData() {
        return getElementData1(this);
    }
    static register() {
        return register1(this, false);
    }
    static get tagName() {
        return this.register();
    }
    static [Symbol.toPrimitive]() {
        return this.tagName;
    }
}
var __classPrivateFieldGet13 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
function xml1(strings, ...props) {
    const template = templateCache.computeIfAbsent(strings, ()=>createTemplate(strings, props)
    , props);
    return new TemplateResult(template, props);
}
Object.defineProperty(ComponentImplementation, "captureProps", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: false
});
Object.defineProperty(ComponentImplementation, "styles", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
});
const Component1 = ComponentImplementation;
var _DestinyFallback_view;
class DestinyFallback extends Component1 {
    constructor(){
        super();
        _DestinyFallback_view.set(this, new ReactiveValue1(xml1``));
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: __classPrivateFieldGet13(this, _DestinyFallback_view, "f")
        });
        queueMicrotask(async ()=>{
            const data = getElementData1(this);
            const props = data.prop;
            const fallback = props.get("fallback");
            if (fallback) {
                if (!isRenderable(fallback)) {
                    throw new TypeError(`Incorect type ${describeType(fallback)} for prop:fallback: Renderable expected`);
                }
                __classPrivateFieldGet13(this, _DestinyFallback_view, "f").value = fallback;
            }
            try {
                const module = await props.get("for");
                const component = componentOrComponentModule(module);
                __classPrivateFieldGet13(this, _DestinyFallback_view, "f").value = xml1`
          <${component}
            destiny:mount=${(element)=>element.append(...this.childNodes)
                }
            destiny:data=${data}
          />
        `;
            } catch (error) {
                const exceptionHandler = props.get("catch");
                if (exceptionHandler) {
                    if (typeof exceptionHandler !== "function") {
                        throw new TypeError(`Uncallable type ${describeType(exceptionHandler)} provided for prop:error as the exception handler. Expected type is (error: Error) => Renderable.`);
                    }
                    const template = exceptionHandler(error);
                    if (!isRenderable(template)) {
                        throw new TypeError(`Exception handler for prop:error retrned ${describeType(template)}, but Renderable was expected.`);
                    }
                    __classPrivateFieldGet13(this, _DestinyFallback_view, "f").value = template;
                } else {
                    throw error;
                }
            }
        });
    }
}
_DestinyFallback_view = new WeakMap();
Object.defineProperty(DestinyFallback, "captureProps", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: true
});
function classNames1(input) {
    return computed1(()=>Object.entries(input).filter(([, value])=>value instanceof ReadonlyReactiveValue1 ? value.value : value
        ).map(([key])=>key
        ).join(" ")
    );
}
var __classPrivateFieldGet14 = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet8 = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _CSSTemplate_stylesheet;
class CSSTemplate1 {
    constructor(cssText){
        Object.defineProperty(this, "cssText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _CSSTemplate_stylesheet.set(this, void 0);
        this.cssText = cssText;
    }
    get styleElement() {
        return Object.assign(document.createElement("style"), {
            textContent: this.cssText
        });
    }
    get styleSheet() {
        if (!__classPrivateFieldGet14(this, _CSSTemplate_stylesheet, "f")) {
            __classPrivateFieldSet8(this, _CSSTemplate_stylesheet, new CSSStyleSheet, "f");
            __classPrivateFieldGet14(this, _CSSTemplate_stylesheet, "f").replace(this.cssText);
        }
        return __classPrivateFieldGet14(this, _CSSTemplate_stylesheet, "f");
    }
}
_CSSTemplate_stylesheet = new WeakMap();
function getXmlErrorMessage(doc) {
    return doc?.firstElementChild?.textContent ?? "unknown error";
}
function parseAsNewDocument(string) {
    return new DOMParser().parseFromString(`<xml ${namespaces}>${string}</xml>`, "application/xml");
}
function parseInSafari(templateElement, string) {
    const parsed = parseAsNewDocument(string).firstElementChild;
    if (parsed?.firstElementChild?.nodeName.toLowerCase() === "parsererror") {
        throw new SyntaxError(`An error occurred when parsing the following XML:\n${string}\nwhich resulted in the following message:\n${getXmlErrorMessage(parsed)}`);
    }
    templateElement.content.append(...parsed?.childNodes ?? []);
}
function isTextNode(input) {
    return input.nodeType === Node.TEXT_NODE;
}
function isElement(input) {
    return input.nodeType === Node.ELEMENT_NODE;
}
function createPlaceholder(index) {
    const placeholder = document.createElement("template");
    placeholder.setAttribute("destiny:content", String(index));
    return placeholder;
}
function prepareContentSlots(contentSlots) {
    contentSlots.forEach((contentSlot)=>{
        const raw = contentSlot.node.textContent ?? "";
        const nodes = contentSlot.slots.flatMap((slot, i, a)=>[
                new Text(raw.slice(a[i - 1]?.end ?? 0, slot.start)),
                createPlaceholder(slot.index), 
            ]
        );
        contentSlot.node.replaceWith(...nodes, new Text(raw.slice(contentSlot.slots.pop()?.end)));
    });
}
const pseudoRandomEncode = (count, coprime)=>(seed)=>seed * coprime % count
;
const idEncoder = pseudoRandomEncode(2n ** 20n, 387420489n);
function* pseudoRandomIdGenerator() {
    let i = 0n;
    while(true){
        yield idEncoder(++i).toString(36);
    }
}
function pascalToKebab(input) {
    return `${input[0] ?? ""}${input.slice(1).replace(/([A-Z])/g, "-$1")}`.toLowerCase();
}
function magic(el) {
    const data = getElementData1(el);
    if (!data) return;
    if (!data.prop.has("class")) return;
    const css = data.prop.get("class");
    if (el.shadowRoot && el.shadowRoot.children[1]) css.bind((val)=>el.shadowRoot.children[1].setAttribute("class", val)
    );
}
const FnExtender = (U)=>{
    class FnExtensibleComponent extends U {
        constructor(){
            super();
            this.unactivated = true;
            if (!this.elementData) return;
            const props = this.elementData.prop;
            for (const [key, val] of props.entries())this[key] = val;
        }
        connectedCallback(...args) {
            magic(this);
            if (super.connectedCallback) super.connectedCallback(...args);
            if (!this.unactivated) return;
            this.unactivated = false;
            this.activated(this);
        }
        disconnectedCallback() {
        }
        activated() {
        }
    }
    return FnExtensibleComponent;
};
class FnBaseComponent extends FnExtender(Component1) {
}
function make1(fn, optional_name = "") {
    return makeFrom1(FnBaseComponent, fn, optional_name);
}
function makeFrom1(U, fn, optional_name = "") {
    var _a;
    const name = optional_name || `f${fn.name || `anon-${Math.random() * 10000 | 0}`}`;
    const cls = (_a = class extends FnExtender(U) {
        activated(props) {
            connection.call(fn, props, this);
        }
    }, Object.defineProperty(_a, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: name
    }), _a);
    register1(cls, true);
    fn[Symbol.for("functional")] = cls;
    return cls;
}
function connection(props, el) {
    setTimeout(async ()=>{
        const template = await this(el);
        if (template) el.shadowRoot.append(template.content);
    }, 0);
}
function xml2(strings = [
    ""
], ...props) {
    return xml1(strings, ...props.map((p)=>p && (p[Symbol.for("functional")] || p)
    ));
}
export { make1 as make, makeFrom1 as makeFrom, xml2 as xml, xml2 as css, xml2 as html };
export { CSSTemplate1 as CSSTemplate, Component1 as Component, ReactiveArray1 as ReactiveArray, ReactiveValue1 as ReactiveValue, ReadonlyReactiveArray1 as ReadonlyReactiveArray, ReadonlyReactiveValue1 as ReadonlyReactiveValue, Ref1 as Ref, attachCSSProperties1 as attachCSSProperties, classNames1 as classNames, computed1 as computed, getElementData1 as getElementData, reactive1 as reactive, reactiveProperties1 as reactiveProperties, register1 as register, assignElementData1 as assignElementData, destinyData1 as destinyData, SlotArray1 as SlotArray };
