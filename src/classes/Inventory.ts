// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { DefinitionMap, DefinitionMap_ } from "../gameTypes";
import Feature from "./Feature";
import Item from "./Item";

export default class Inventory extends Array<Item> {
    constructor(items: DefinitionMap_<typeof Item>[] = []) {
        super();

        for (const { type: ItemType = Item, definition } of items) {
            this.push(new ItemType(definition));
        }
    }

    hasItems() {
        return this.length >= 1;
    }

    discoverFrom(feature: Feature) {
        while (feature.items?.length > 0) {
            const item = feature.items.shift();
            if (item) this.push(item);
        }
    }

    removeItem(item: Item) {
        const idx = this.indexOf(item);
        if (idx >= 0) {
            const [item] = this.splice(idx, 1);
            return item;
        }
    }
}
