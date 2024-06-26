// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { ReactNode } from "react";
import { ZoneMap } from "./classes";

/**
 * Conditions should be tracked by creating string constants for reference keys
 * and mapping them to boolean values indicating the state of the condition.
 */
export type ConditionMap = Record<string, boolean>;

export type DefinitionMap<
    FeatureDefinition = any,
    ClassType extends new (...args: any) => any = new (...args: any) => any,
> = {
    type: ClassType;
    definition: FeatureDefinition;
};

export type DefinitionMap_<C extends new (...args: any) => any> = {
    type: C;
    definition: ConstructorParameters<C>[0];
};

/**
 * This is effectively how we will define our game "discs".
 */
export type GameDiscDefinition = {
    gameTitle: ReactNode;
    gameDescription: ReactNode;
    zoneMap: ZoneMap;
    welcomeMessage: ReactNode[];
};

export type InteractionText = ReactNode | ReactNode[];

export type LockType = "key" | "pin";
export type LockCode = string;

/**
 * Shout-out to this StackOverflow answer for the great utility type:
 * https://stackoverflow.com/a/54178819/4531623
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;
