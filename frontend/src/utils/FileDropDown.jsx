import { useState } from "react";

const FileDropDown = ({ obj }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <p onClick={() => setOpen(!open)}>{obj.name}</p>
            {open && (
                <div className="pl-10">
                    {obj.child.map((child) => {
                        return <FileDropDown key={child.id} obj={child} />
                    })}
                </div>
            )}
        </div>
    )
}

export default FileDropDown;
