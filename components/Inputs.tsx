import { InputTypes, SelectTypes } from "../types/types";
import React from "react";

export function InputBox({
    label,
    placeholder = "",
    className,
    type,
    name,
    initialValue,
    handleChange,
    statusCompleted,
    value,
}: InputTypes) {
    return (
        <div className=" flex flex-col w-full ">
            <label className="mb-1">
                <span className="font-medium text-zinc-500 text-sm ">
                    {label}
                </span>
            </label>
            <input
                className={`
               border-[1.5px] py-2 px-4 rounded-lg focus:border-green2 focus:ring-green2 focus:outline-none
                ${statusCompleted ? "" : ""}  `}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={true}
            />
        </div>
    );
}

export function StaticBox({
    label,
    placeholder = "",
    className,
    type,
    name,
    initialValue,

    statusCompleted,
    value,
}: any) {
    return (
        <div className=" flex flex-col ">
            <label className="">
                <span className="font-[250] text-sm">{label}</span>
            </label>
            <input
                className={`
               border-b py-2 px-4 
                ${statusCompleted ? "" : ""}  `}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                required={true}
                readOnly={true}
            />
        </div>
    );
}

export function LargeInputBox({
    label,
    placeholder = "",
    className,
    type,
    name,
    value,
    handleChange,
    statusCompleted,
    rows,
}: InputTypes) {
    return (
        <div className=" flex flex-col   ">
            <label className="">
                <span className="font-medium text-zinc-500 text-sm ">
                    {label}
                </span>
            </label>
            <textarea
                className={` bg-[#fefefe]
               border-[1.5px] focus:border-green2 focus:ring-green2 focus:outline-none  py-4 px-5 rounded-xl resize-none }
                ${statusCompleted ? "" : ""}  `}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                required={true}
                rows={rows}
                value={value}
            />
        </div>
    );
}

export function LargeStaticBox({
    label,
    placeholder = "",
    className,
    type,
    name,
    value,

    statusCompleted,
}: any) {
    return (
        <div className=" flex flex-col ">
            <label className="">
                <span className="font-[250] text-sm ">{label}</span>
            </label>
            <textarea
                className={`mt-3
               border py-2 px-4 rounded-xl shadow-md}
                ${statusCompleted ? "" : ""}  `}
                name={name}
                placeholder={placeholder}
                readOnly={true}
                required={true}
                rows={7}
                value={value}
            />
        </div>
    );
}

export function SelectBox({
    label,
    name,
    placeholder,
    handleChange,
    options,
    statusCompleted,
}: SelectTypes) {
    return (
        <div className="form-control w-full ">
            <label className="font-medium text-zinc-500 text-sm">{label}</label>
            <select
                onChange={handleChange}
                name={name}
                id="countries"
                className="focus:border-green2 focus:ring-green2 focus:outline-none border-[1.5px] w-full p-2.5 "
            >
                {options.map((op, index) => (
                    <option key={index} value={op}>
                        {op}
                    </option>
                ))}
            </select>
        </div>
    );
}
