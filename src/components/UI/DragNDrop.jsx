import React, {useEffect, useState} from 'react';


const DragNDrop = (props) => {
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    const [tempFile,setTempFile]=useState()

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]&&props.setFile!=undefined) {
            console.log(e.dataTransfer.files);
            props.setFile(e.dataTransfer.files)
            setTempFile(e.dataTransfer.files[0])
        }
    };

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]&&props.setFile!=undefined) {
            console.log(e.target.files);
            props.setFile(e.target.files)
            setTempFile(e.target.files[0])
        }

    };

// triggers the input when the button is clicked
    const onButtonClick = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    };


    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input className={'hidden'} ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                {tempFile!=undefined?<div className={'flex items-center'}>
                    <div className={'w-full flex items-center justify-center bg-black rounded-full h-12 p-3 font-bold text-white'}>Загружено!</div>
                    {/*<button className="upload-button" onClick={onButtonClick}>Upload a file</button>*/}
                </div>:<div className={'flex items-center'}>
                    <div className={'w-full flex items-center justify-center bg-black rounded-full h-12 p-3 font-bold text-white'}>Загрузить</div>
                    {/*<button className="upload-button" onClick={onButtonClick}>Upload a file</button>*/}
                </div>}
            </label>
            { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
};

export default DragNDrop;