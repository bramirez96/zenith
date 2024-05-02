// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { ConditionMap } from "../gameTypes";
import Inventory from "./Inventory";
import Item from "./Item";

export default class Player {
    public inventory: Inventory = new Inventory();

    private readonly conditions: ConditionMap = {};

    hasCondition(condition: string): boolean {
        return this.conditions[condition] ?? false;
    }

    setCondition(condition: string, state: boolean): void {
        this.conditions[condition] = state;
    }

    takeItem(item: Item) {
        this.inventory.push(item);
    }

    removeItem(item: Item) {
        return this.inventory.removeItem(item);
    }
}
