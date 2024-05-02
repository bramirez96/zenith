// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

/**
 * Return the value if it's a function, or return a new cb returning the value.
 */

export default function asFunction<CBType, DataType>(data: DataType) {
    return (typeof data !== "function" ? () => data : data) as CBType;
}
