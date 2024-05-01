// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { wrapInputTag } from "./gameHelpers";
import React from "react";

export const GameControls = (
    <div className="container">
        <div className="alt center-align">Controls</div>
        <div className="med-small top-space">
            <div>
                {wrapInputTag("go")}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt;&nbsp;
                {wrapInputTag("move")} in a direction
            </div>
            <div>
                {wrapInputTag("look at")}&nbsp;-&gt;&nbsp;
                {wrapInputTag("examine")} something up close
            </div>
            <div>
                {wrapInputTag("unlock")}
                &nbsp;&nbsp;-&gt;&nbsp;attempt to open a lock
            </div>
            <div>
                {wrapInputTag("take")}&nbsp;&nbsp;&nbsp;&nbsp;-&gt;&nbsp;
                {wrapInputTag("pick up")} an item
            </div>
            <div>
                {wrapInputTag("inv")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt;&nbsp;v
                {wrapInputTag("i")}ew your {wrapInputTag("inventory")}
            </div>
            <div>
                {wrapInputTag("help")}&nbsp;&nbsp;&nbsp;&nbsp;-&gt;&nbsp;view
                game controls
            </div>
        </div>
    </div>
);
