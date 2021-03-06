// // Generated by dts-bundle v0.7.3

declare module '@destiny-ui' {
    export { ReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReactiveValue";
    export { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export { ReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReactiveArray";
    export { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    export { reactiveProperties } from "@destiny-ui/reactive/reactiveProperties/_reactiveProperties";
    export { reactive } from "@destiny-ui/reactive/reactive";
    export { computed } from "@destiny-ui/reactive/computed";
    export { xml, xml as html } from "@destiny-ui/parsing/_xml";
    export { Component } from "@destiny-ui/componentLogic/Component";
    export { getElementData } from "@destiny-ui/componentLogic/elementData";
    export { register } from "@destiny-ui/componentLogic/register";
    export { Ref } from "@destiny-ui/componentLogic/Ref";
    export { classNames } from "@destiny-ui/reactive/classNames";
    export { css } from "@destiny-ui/styling/css";
    export { CSSTemplate } from "@destiny-ui/styling/CSSTemplate";
    export { attachCSSProperties } from "@destiny-ui/styling/attachCSSProperties";
    export type { TReactiveValueType } from "@destiny-ui/reactive/types/TReactiveValueType";
    export type { TReactiveProperties } from "@destiny-ui/reactive/reactiveProperties/TReactiveProperties";
    export type { TReactiveEntity } from "@destiny-ui/reactive/types/TReactiveEntity";
    export type { TReactive } from "@destiny-ui/reactive/types/TReactive";
    export type { TemplateResult } from "@destiny-ui/parsing/TemplateResult";
}

declare module '@destiny-ui/reactive/ReactiveValue/_ReactiveValue' {
    import { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    import type { TReactiveValueUpdaterOptions } from "@destiny-ui/reactive/ReactiveValue/TReactiveValueUpdaterOptions";
    export class ReactiveValue<T> extends ReadonlyReactiveValue<T> {
        #private;
        update(): this;
        set(value: T, options?: Partial<TReactiveValueUpdaterOptions<T>>): this;
        get value(): T;
        set value(value: T);
        get readonly(): ReadonlyReactiveValue<T>;
    }
}

declare module '@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue' {
    import { PassReactiveValue } from "@destiny-ui/reactive/ReactiveValue/PassReactiveValue";
    import type { TReactiveValueCallback } from "@destiny-ui/reactive/ReactiveValue/TReactiveValueCallback";
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    export class ReadonlyReactiveValue<T> {
        #private;
        readonly dependencies: Map<ReadonlyReactiveValue<any> | ReadonlyReactiveArray<any>, VoidFunction>;
        constructor(initialValue: T);
        valueOf(): T;
        [Symbol.toPrimitive](): T extends object ? never : T;
        toJSON(): T;
        get [Symbol.toStringTag](): string;
        [Symbol.asyncIterator](): AsyncIterable<T>;
        get nextUpdate(): Promise<T>;
        bind(callback: TReactiveValueCallback<T>, options?: {
            noFirstRun?: boolean;
            dependents?: ReadonlyArray<object>;
        }): this;
        unbind(callback: TReactiveValueCallback<T>): this;
        get value(): T;
        pipe<K>(callback: (value: T) => K): ReadonlyReactiveValue<K>;
        truthy<T>(valueWhenTruthy: T, valueWhenFalsy?: undefined): ReadonlyReactiveValue<T | undefined>;
        truthy<T, K>(valueWhenTruthy: T, valueWhenFalsy: K): ReadonlyReactiveValue<T | K>;
        falsy<T>(valueWhenFalsy: T, valueWhenTruthy?: undefined): ReadonlyReactiveValue<T | undefined>;
        falsy<T, K>(valueWhenFalsy: T, valueWhenTruthy: K): ReadonlyReactiveValue<T | K>;
        get pass(): PassReactiveValue<T>;
    }
}

declare module '@destiny-ui/reactive/ReactiveArray/_ReactiveArray' {
    import { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    import type { TArrayValueType } from "@destiny-ui/reactive/ReactiveArray/TArrayValueType";
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export class ReactiveArray<InputType> extends ReadonlyReactiveArray<InputType> {
        #private;
        get readonly(): ReadonlyReactiveArray<InputType>;
        constructor(...input: ReadonlyArray<InputType>);
        splice(start: number, deleteCount?: number, ...items: Array<InputType | TArrayValueType<InputType>>): Array<TArrayValueType<InputType>>;
        copyWithin(target: number, start?: number, end?: number): this;
        fill(value: InputType | TArrayValueType<InputType>, start?: number, end?: number): this;
        mutFilter(callback: (value: TArrayValueType<InputType>, index: number, array: Array<TArrayValueType<InputType>>) => boolean): this;
        mutMap(callback: (value: TArrayValueType<InputType>, index: number, array: Array<TArrayValueType<InputType>>) => TArrayValueType<InputType>): this;
        pop(): TArrayValueType<InputType> | undefined;
        push(...items: Array<InputType>): ReadonlyReactiveValue<number>;
        reverse(): this;
        shift(): TArrayValueType<InputType> | undefined;
        sort(compareFn?: ((a: TArrayValueType<InputType>, b: TArrayValueType<InputType>) => number)): this;
        unshift(...items: Array<InputType>): ReadonlyReactiveValue<number>;
    }
}

declare module '@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray' {
    import { ReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReactiveArray";
    import { ReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReactiveValue";
    import { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    import type { TReactiveArrayCallback } from "@destiny-ui/reactive/ReactiveArray/TReactiveArrayCallback";
    import type { TArrayUpdateArguments } from "@destiny-ui/reactive/ReactiveArray/TArrayUpdateArguments";
    import type { TUnwrapReactiveArray } from "@destiny-ui/reactive/ReactiveArray/TUnwrapReactiveArray";
    import type { TArrayValueType } from "@destiny-ui/reactive/ReactiveArray/TArrayValueType";
    import type { TReactiveEntity } from "@destiny-ui/reactive/types/TReactiveEntity";
    export class ReadonlyReactiveArray<InputType> {
        #private;
        constructor(...input: Array<InputType>);
        toJSON(): Array<TArrayValueType<InputType>>;
        [Symbol.iterator](): Iterable<TArrayValueType<InputType>>;
        [Symbol.asyncIterator](): AsyncIterable<TArrayUpdateArguments<TArrayValueType<InputType>>>;
        get length(): ReadonlyReactiveValue<number>;
        get value(): Array<TArrayValueType<InputType>>;
        set value(items: ReadonlyArray<InputType | TArrayValueType<InputType>>);
        get(index: number): TArrayValueType<InputType> | undefined;
        set(index: number, value: InputType): this;
        pipe<F extends TReactiveArrayCallback<TArrayValueType<InputType>, ReturnType<F>>>(callback: F): ReadonlyReactiveValue<ReturnType<F>>;
        bind(callback: TReactiveArrayCallback<TArrayValueType<InputType>>, options?: {
            noFirstRun?: boolean;
            dependents?: ReadonlyArray<object>;
        }): this;
        unbind(callback: TReactiveArrayCallback<TArrayValueType<InputType>>): this;
        update(): this;
        filter(callback: (value: TArrayValueType<InputType>, index: number, array: Array<TArrayValueType<InputType>>) => boolean, dependencies?: ReadonlyArray<TReactiveEntity<any>>): ReadonlyReactiveArray<TArrayValueType<InputType>>;
        flat(): ReadonlyReactiveArray<TUnwrapReactiveArray<TArrayValueType<InputType>>>;
        flatMap<U>(callback: (value: TArrayValueType<InputType>, index: number, array: Array<TArrayValueType<InputType>>) => U | ReadonlyArray<U>): ReadonlyReactiveArray<TUnwrapReactiveArray<U>>;
        map<U>(callback: (value: TArrayValueType<InputType>, index: ReadonlyReactiveValue<number>, array: this) => U): ReadonlyReactiveArray<U>;
        clone(): ReactiveArray<TArrayValueType<InputType>>;
        slice(start?: number, end?: number): ReadonlyReactiveArray<TArrayValueType<InputType>>;
        indexOf(...args: Parameters<Array<TArrayValueType<InputType>>["indexOf"]>): ReadonlyReactiveValue<number>;
        lastIndexOf(...args: Parameters<Array<TArrayValueType<InputType>>["lastIndexOf"]>): ReadonlyReactiveValue<number>;
        join(...args: Parameters<Array<TArrayValueType<InputType>>["join"]>): ReadonlyReactiveValue<string>;
        every(...args: Parameters<Array<TArrayValueType<InputType>>["every"]>): ReadonlyReactiveValue<boolean>;
        some(...args: Parameters<Array<TArrayValueType<InputType>>["some"]>): ReadonlyReactiveValue<boolean>;
        exclusiveSome(cb: (value: TArrayValueType<InputType>, index: number, array: Array<TArrayValueType<InputType>>) => boolean): ReadonlyReactiveValue<boolean>;
        forEach(...args: Parameters<Array<TArrayValueType<InputType>>["forEach"]>): void;
        reduce(...args: Parameters<Array<TArrayValueType<InputType>>["reduce"]>): ReadonlyReactiveValue<ReturnType<Array<TArrayValueType<InputType>>["reduce"]>>;
        reduceRight(...args: Parameters<Array<TArrayValueType<InputType>>["reduceRight"]>): ReadonlyReactiveValue<ReturnType<Array<TArrayValueType<InputType>>["reduceRight"]>>;
        find(...args: Parameters<Array<TArrayValueType<InputType>>["find"]>): ReturnType<Array<TArrayValueType<InputType>>["find"]>;
        findIndex(...args: Parameters<Array<TArrayValueType<InputType>>["findIndex"]>): ReadonlyReactiveValue<ReturnType<Array<TArrayValueType<InputType>>["findIndex"]>>;
        entries(): ReadonlyReactiveArray<[
            index: ReadonlyReactiveValue<number>,
            value: TArrayValueType<InputType>
        ]>;
        keys(): ReadonlyReactiveArray<ReadonlyReactiveValue<number>>;
        values(): ReadonlyReactiveArray<TArrayValueType<InputType>>;
        includes(...args: Parameters<Array<TArrayValueType<InputType>>["includes"]>): ReadonlyReactiveValue<boolean>;
        concat<U, K extends TArrayValueType<InputType> | U>(...items: Array<K | Array<K> | ReactiveValue<K> | ReactiveArray<K>>): ReadonlyReactiveArray<U | TArrayValueType<InputType>>;
    }
}

declare module '@destiny-ui/reactive/reactiveProperties/_reactiveProperties' {
    import type { TReactiveProperties } from "@destiny-ui/reactive/reactiveProperties/TReactiveProperties";
    import type { ReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReactiveValue";
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    export function reactiveProperties<T extends Readonly<Record<string, unknown>>, K = unknown>(input: T, parent?: ReactiveValue<K> | ReadonlyReactiveArray<K>): TReactiveProperties<T>;
}

declare module '@destiny-ui/reactive/reactive' {
    import { ReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReactiveValue";
    import type { TReactiveValueType } from "@destiny-ui/reactive/types/TReactiveValueType";
    import type { TReactive } from "@destiny-ui/reactive/types/TReactive";
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    function reactive<T extends Promise<unknown>, K = unknown>(initialValue: T, options: {
        fallback: T extends Promise<infer V> ? V : never;
        parent?: ReactiveValue<K> | ReadonlyReactiveArray<K>;
    }): ReactiveValue<T extends Promise<infer V> ? V : never>;
    function reactive<T, K = unknown>(initialValue: T, options?: {
        parent?: ReactiveValue<K> | ReadonlyReactiveArray<K>;
    }): TReactiveValueType<T>;
    function reactive<K = unknown>(initialValue: unknown, options?: {
        parent?: ReactiveValue<K> | ReadonlyReactiveArray<K>;
    }): TReactive<unknown>;
    export { reactive };
}

declare module '@destiny-ui/reactive/computed' {
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export let computedConsumer: {
        fn: VoidFunction;
        consumer: ReadonlyReactiveValue<any>;
    } | undefined;
    type TComputedOptions = {
        dependents?: ReadonlyArray<object>;
    };
    export function computed(callback: TemplateStringsArray, ...props: Array<unknown>): ReadonlyReactiveValue<string>;
    export function computed<T>(callback: () => T, options?: TComputedOptions): ReadonlyReactiveValue<T>;
    export {};
}

declare module '@destiny-ui/parsing/_xml' {
    import { TemplateResult } from "@destiny-ui/parsing/TemplateResult";
    export function xml(strings: TemplateStringsArray, ...props: Array<unknown>): TemplateResult;
}

declare module '@destiny-ui/componentLogic/Component' {
    import type { Renderable } from "@destiny-ui/parsing/Renderable";
    import type { Slot } from "@destiny-ui/parsing/Slot";
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    import type { CSSTemplate } from "@destiny-ui/styling/CSSTemplate";
    import type { TElementData } from "@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TElementData";
    interface ComponentImplementation {
        destinySlot?: Slot;
    }
    class ComponentImplementation extends HTMLElement {
        static captureProps: boolean;
        template: (Renderable | ReadonlyReactiveValue<any> | ReadonlyReactiveArray<any>);
        static styles: Array<CSSTemplate> | CSSTemplate;
        constructor();
        attachCSSProperties(styles: {
            [Key: string]: ReadonlyReactiveValue<string>;
        }): void;
        replaceWith(...nodes: Array<string | Node>): void;
        unmount(callback: (element: HTMLElement) => Promise<void> | void): this;
        get elementData(): TElementData | undefined;
        static register(): string;
        static get tagName(): string;
        static [Symbol.toPrimitive](): string;
    }
    export type Component<TProperties extends Record<string, unknown> = {}> = (ComponentImplementation & TProperties);
    type TComponentConstructor = ((new <TProperties extends Record<string, unknown> = {}>() => Component<TProperties>) & typeof ComponentImplementation);
    export const Component: TComponentConstructor;
    export {};
}

declare module '@destiny-ui/componentLogic/elementData' {
    import type { TElementData } from "@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TElementData";
    export const elementDataStore: WeakMap<Element, TElementData>;
    export function getElementData(element: Element): TElementData | undefined;
}

declare module '@destiny-ui/componentLogic/register' {
    import type { Component } from "@destiny-ui/componentLogic/Component";
    export function register(componentConstructor: new () => Component, noHash?: boolean): string;
}

declare module '@destiny-ui/componentLogic/Ref' {
    export abstract class RefPromise<T> {
        abstract set value(element: T);
        abstract then<R>(callbackFn: (value: T) => R): RefPromise<R>;
    }
    export class Ref<T extends HTMLElement> {
        #private;
        constructor();
        set value(element: T);
        then<R>(callbackFn: (value: T) => R): RefPromise<R>;
        catch<R>(callbackFn: (reason: unknown) => R): RefPromise<R | T>;
        finally(callbackFn: () => void): this;
    }
}

declare module '@destiny-ui/reactive/classNames' {
    import { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export function classNames(input: Record<string, boolean | ReadonlyReactiveValue<boolean>>): ReadonlyReactiveValue<string>;
}

declare module '@destiny-ui/styling/css' {
    import { CSSTemplate } from "@destiny-ui/styling/CSSTemplate";
    export function css(strings: TemplateStringsArray, ...props: Array<unknown>): CSSTemplate;
}

declare module '@destiny-ui/styling/CSSTemplate' {
    export class CSSTemplate {
        #private;
        readonly cssText: string;
        constructor(cssText: string);
        get styleElement(): HTMLStyleElement;
        get styleSheet(): CSSStyleSheet;
    }
}

declare module '@destiny-ui/styling/attachCSSProperties' {
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export function attachCSSProperties(element: HTMLElement, styles: {
        [Key: string]: ReadonlyReactiveValue<string>;
    }): void;
}

declare module '@destiny-ui/reactive/types/TReactiveValueType' {
    import type { ReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReactiveArray";
    import type { TSpecialCaseObject } from "@destiny-ui/reactive/reactiveProperties/specialCaseObjects";
    import type { TReactiveProperties } from "@destiny-ui/reactive/reactiveProperties/TReactiveProperties";
    import type { ReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReactiveValue";
    import type { TReactive } from "@destiny-ui/reactive/types/TReactive";
    export type TReactiveValueType<T> = (T extends TReactive<unknown> ? T : T extends TSpecialCaseObject ? ReactiveValue<T> : T extends Promise<infer V> ? ReactiveValue<V | undefined> : T extends ReadonlyArray<infer V> ? ReactiveArray<V> : T extends Readonly<Record<string, unknown>> ? TReactiveProperties<T> : T extends boolean ? ReactiveValue<boolean> : ReactiveValue<T>);
}

declare module '@destiny-ui/reactive/reactiveProperties/TReactiveProperties' {
    import type { TReactivePropertiesFlag } from "@destiny-ui/reactive/reactiveProperties/TReactivePropertiesFlag";
    import type { TReactiveValueType } from "@destiny-ui/reactive/types/TReactiveValueType";
    export type TReactiveProperties<T extends Record<string, unknown> | unknown> = ({
        readonly [P in keyof T]: TReactiveValueType<T[P]>;
    } & TReactivePropertiesFlag);
}

declare module '@destiny-ui/reactive/types/TReactiveEntity' {
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export type TReactiveEntity<T> = (ReadonlyReactiveValue<T> | ReadonlyReactiveArray<T>);
}

declare module '@destiny-ui/reactive/types/TReactive' {
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    import type { TReactiveProperties } from "@destiny-ui/reactive/reactiveProperties/TReactiveProperties";
    export type TReactive<T> = (ReadonlyReactiveArray<T> | ReadonlyReactiveValue<T> | TReactiveProperties<T>);
}

declare module '@destiny-ui/parsing/TemplateResult' {
    import { Renderable } from "@destiny-ui/parsing/Renderable";
    export class TemplateResult extends Renderable {
        #private;
        constructor(template: HTMLTemplateElement, props: Array<unknown>);
        get content(): DocumentFragment;
    }
}

declare module '@destiny-ui/reactive/ReactiveValue/TReactiveValueUpdaterOptions' {
    import type { TReactiveValueCallback } from "@destiny-ui/reactive/ReactiveValue/TReactiveValueCallback";
    export type TReactiveValueUpdaterOptions<T> = {
        noUpdate: ReadonlyArray<TReactiveValueCallback<T>>;
        force: boolean;
    };
}

declare module '@destiny-ui/reactive/ReactiveValue/PassReactiveValue' {
    import type { ReadonlyReactiveValue } from "@destiny-ui/reactive/ReactiveValue/_ReadonlyReactiveValue";
    export class PassReactiveValue<T> {
        deref: ReadonlyReactiveValue<T>;
        constructor(ref: ReadonlyReactiveValue<T>);
    }
}

declare module '@destiny-ui/reactive/ReactiveValue/TReactiveValueCallback' {
    export type TReactiveValueCallback<T> = (newValue: T) => void;
}

declare module '@destiny-ui/reactive/ReactiveArray/TArrayValueType' {
    import type { TSpecialCaseObject } from "@destiny-ui/reactive/reactiveProperties/specialCaseObjects";
    import type { TReactiveValueType } from "@destiny-ui/reactive/types/TReactiveValueType";
    import type { TPrimitive } from "@destiny-ui/reactive/types/TPrimitive";
    export type TArrayValueType<T> = (T extends TPrimitive | TSpecialCaseObject ? T : TReactiveValueType<T>);
}

declare module '@destiny-ui/reactive/ReactiveArray/TReactiveArrayCallback' {
    export type TReactiveArrayCallback<T, R = void> = (index: number, deleteCount: number, ...values: Array<T>) => R;
}

declare module '@destiny-ui/reactive/ReactiveArray/TArrayUpdateArguments' {
    export type TArrayUpdateArguments<T> = [
        startEditingAt: number,
        deleteCount: number,
        ...newElements: Array<T>
    ];
}

declare module '@destiny-ui/reactive/ReactiveArray/TUnwrapReactiveArray' {
    import type { ReadonlyReactiveArray } from "@destiny-ui/reactive/ReactiveArray/_ReadonlyReactiveArray";
    export type TUnwrapReactiveArray<Input> = (Input extends ReadonlyReactiveArray<infer V> ? V : Input);
}

declare module '@destiny-ui/parsing/Renderable' {
    export abstract class Renderable {
        abstract get content(): Node;
    }
}

declare module '@destiny-ui/parsing/Slot' {
    import { TemplateResult } from "@destiny-ui/parsing/TemplateResult";
    export class Slot {
        #private;
        constructor(placeholderNode: ChildNode, content?: TemplateResult | DocumentFragment);
        replaceItem(whatToReplace: ChildNode, ...nodes: Array<string | Node>): void;
        update(input: TemplateResult | DocumentFragment): void;
        remove(): Promise<void>;
        insertBeforeThis(...nodes: Array<Node>): void;
    }
}

declare module '@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TElementData' {
    import type { TNamespace } from "@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TNamespace";
    export type TElementData = {
        readonly [Key in TNamespace]: Map<string, unknown>;
    };
}

declare module '@destiny-ui/reactive/reactiveProperties/specialCaseObjects' {
    import { TemplateResult } from "@destiny-ui/parsing/TemplateResult";
    export const specialCaseObjects: readonly [FunctionConstructor, DateConstructor, RegExpConstructor, {
        new (): DocumentFragment;
        prototype: DocumentFragment;
    }, typeof TemplateResult, {
        new (): Node;
        prototype: Node;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
    }];
    export function isSpecialCaseObject(input: unknown): input is TSpecialCaseObject;
    export type TSpecialCaseObject = InstanceType<typeof specialCaseObjects[number]>;
}

declare module '@destiny-ui/reactive/reactiveProperties/TReactivePropertiesFlag' {
    import { reactivePropertiesFlag } from "@destiny-ui/reactive/reactiveProperties/reactivePropertiesFlag";
    export type TReactivePropertiesFlag = {
        readonly [reactivePropertiesFlag]: true;
    };
}

declare module '@destiny-ui/reactive/types/TPrimitive' {
    export type TPrimitive = (undefined | null | boolean | string | number | bigint | symbol);
}

declare module '@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TNamespace' {
    import type { validNamespaces } from "@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/isValidNamespace";
    export type TNamespace = typeof validNamespaces[number];
}

declare module '@destiny-ui/reactive/reactiveProperties/reactivePropertiesFlag' {
    export const reactivePropertiesFlag: unique symbol;
}

declare module '@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/isValidNamespace' {
    import type { TNamespace } from "@destiny-ui/parsing/hookSlotsUp/hookAttributeSlotsUp/elementData/TNamespace";
    export const validNamespaces: readonly ["attribute", "prop", "on", "destiny"];
    export function isValidNamespace(input: string): input is TNamespace;
    export function isValidAttributePair(input: ReadonlyArray<string>): input is [TNamespace, string];
}
