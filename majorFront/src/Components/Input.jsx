import React, { forwardRef, useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className="flex flex-col items-start w-full">
            {label && (
                <label className="" id={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`${className}`}
                ref={ref}
                id={id}
                {...props}
            ></input>
        </div>
    );
}

export default forwardRef(Input);
