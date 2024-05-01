import { DefinitionMap } from "../gameTypes";

/**
 * Returns a function that will generate a DefinitionMap and provide strong
 * typing when specifying parameters. Specify a base class to build a generator
 * for, and optionally override with a subclass in generator
 */
export default function ObjectDefinitionGenerator<
    _BaseO extends new (...args: any) => any,
    _BaseD extends ConstructorParameters<_BaseO>[0],
>(baseObjType: _BaseO) {
    function _defineObject(opts: _BaseD): DefinitionMap<_BaseD, _BaseO>;
    function _defineObject<
        O extends _BaseO,
        D extends ConstructorParameters<O>[0],
    >(featOrOpts: O | D, maybeOpts: D): DefinitionMap<D, O>;
    function _defineObject<
        O extends _BaseO,
        D extends ConstructorParameters<O>[0],
    >(objOrDef: O | D, maybeDef?: D): DefinitionMap<D, O> {
        let res: DefinitionMap<D, O>;

        if (maybeDef !== undefined) {
            res = { definition: maybeDef, type: objOrDef };
        } else {
            res = { definition: objOrDef as D, type: baseObjType as O };
        }

        return res;
    }

    return _defineObject;
}

/**
 * Usage:

// Create a ZoneDefinition generator
const defineZone = ObjectDefinitionGenerator(Zone);
const z: DefinitionMap<ZoneDefinition, typeof Zone> = defineZone({}); 

// RoomDefinition generator
const defineRoom = ObjectDefinitionGenerator(Room);
const r: DefinitionMap<RoomDefinition, typeof Room> = defineRoom({});

// FeatureDefinition generator
const defineFeature = ObjectDefinitionGenerator(Feature);
const f2 = defineFeature({});

// Creating a DefinitionMap with a Feature subclass
const f = defineFeature(Book, {
    author: 'Some Author'
});

// This will throw an error, since "defineFeature" expects a Feature, not a Room
defineFeature(Room, {})

// Custom Feature sub-class definition generator
const defineBook = ObjectDefinitionGenerator(Book);
const b = defineBook({ 
    author: 'Some Author' 
});

 */

/**
 * Scratch work, for fun.
 * Initially I was working on this with static class methods. Eventually, it became clear
 * that there was a better pattern somewhere. I ended on creating a factory function that
 * takes in an instance of a class and returns a function with strong typing that returns
 * a DefinitionMap object. This exposes a much better builder API than what I have at time
 * of writing, since at the moment you often need to manually type your definitions.
 

interface Opts {
    param1?: string;
}

class X<XOpts extends Opts = Opts> {
    constructor(opts?: XOpts) {}

    static create<Y extends typeof X>(
        this: new (opts?: ConstructorParameters<Y>[0]) => Y,
        opts?: Opts,
    ): InstanceType<Y>;
    static create<
        Y extends typeof X,
        OptsType extends
            ConstructorParameters<Y>[0] = ConstructorParameters<Y>[0],
    >(this: Y, feature: Y, opts: OptsType): InstanceType<Y>;
    static create<
        Y extends typeof X,
        OptsType extends
            ConstructorParameters<Y>[0] = ConstructorParameters<Y>[0],
    >(
        this: Y,
        optsOrFeat: Y | OptsType,
        maybeOpts?: OptsType,
    ): InstanceType<Y> | X<Opts> {
        if (maybeOpts) {
            return new (optsOrFeat as Y)(maybeOpts);
        } else {
            return new this(maybeOpts);
        }
    }
}

interface ZOpts extends Opts {
    param2?: number;
}

class Z extends X<ZOpts> {}

function _createFeature(opts: Opts): InstanceType<typeof X>;
function _createFeature<
    Feature extends typeof X,
    FeatureOpts extends ConstructorParameters<Feature>[0],
>(
    featOrOpts: Feature | FeatureOpts,
    maybeOpts?: FeatureOpts,
): InstanceType<Feature>;
function _createFeature<
    Feature extends typeof X,
    FeatureOpts extends ConstructorParameters<Feature>[0],
>(
    featOrOpts: Feature | FeatureOpts,
    maybeOpts?: FeatureOpts,
): InstanceType<Feature> {}

_createFeature(Z, {});

console.log(X.create({}));
console.log(X.create(Z, {}));
console.log(Z.create<typeof Z>({}));

 */
