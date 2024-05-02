// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { classnames } from "@brr-dev/classnames";
import React, { ReactNode } from "react";
import { GameController } from "./classes";
import { InteractionText } from "./gameTypes";

export function wrapInputTag(tag: string, tagOnClick?: () => void): ReactNode {
    return (
        <span
            className={classnames("alt", tagOnClick && "interactive")}
            onClick={tagOnClick}
        >
            &gt;{tag}&lt;
        </span>
    );
}

export function replaceTag(
    fullString: string,
    replaceThis: string,
    replaceWith: string,
    tagOnClick?: () => void,
) {
    const wrappedTag = wrapInputTag(replaceWith, tagOnClick);
    return fullString.split(replaceThis).reduce((res, stringPart) => {
        if (res.length > 0) res.push(wrappedTag);
        res.push(stringPart);
        return res;
    }, [] as ReactNode[]);
}

export function newlineStringToNodes(
    strWithNewlines: string,
    newlineChar = "\n",
): ReactNode[] {
    return strWithNewlines.split(newlineChar).reduce((res, stringPart) => {
        if (res.length > 0) res.push(<br />);
        res.push(stringPart);
        return res;
    }, [] as ReactNode[]);
}

export async function playInteractionText(
    text: InteractionText,
    gameController: GameController,
    {
        pauseText,
        clearBetween = false,
        pauseBetween = true,
    }: {
        pauseText?: ReactNode;
        clearBetween?: boolean;
        pauseBetween?: boolean;
    },
) {
    let interactionText: (ReactNode | string)[];

    if (!Array.isArray(text)) interactionText = [text];
    else interactionText = text;

    for (let idx = 0; idx < interactionText.length; idx++) {
        if (idx !== 0 && clearBetween) gameController.console.clear();

        const _txt = interactionText[idx];

        if (typeof _txt === "string") {
            gameController.console.print(
                <div>{newlineStringToNodes(_txt)}</div>,
                <br />,
            );
        } else {
            gameController.console.print(<div>{_txt}</div>, <br />);
        }

        if (pauseBetween) await gameController.console.pause(pauseText);
    }
}
