// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { Feature, Item, Room } from "../classes";

export default function hasItem(
    featureOrRoom: Feature | Room,
    itemOrName: string | Item,
): boolean {
    if (typeof itemOrName === "string") {
        return (
            featureOrRoom.items.find((value) => value.name === itemOrName) !==
            undefined
        );
    } else {
        return featureOrRoom.items.indexOf(itemOrName) >= 0;
    }
}
