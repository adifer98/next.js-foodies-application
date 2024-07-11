'use client';

import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const inputRef = useRef(null);
    const [pickedImage, setPickedImage] = useState();


    function handlePickClick() {
        inputRef.current.click();
    }

    function handleImageChange(event) {

        const file = event.target.files[0] // we will just access the first selected file

        if (!file) {
            setPickedImage(null);
            return; // the user hadn't select a file
        }


        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);

    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {pickedImage && <Image src={pickedImage} alt='The selected image' fill />}
                {!pickedImage && <p>No image picked yet.</p>}
            </div>
            <input ref={inputRef}
                   className={classes.input}
                   type='file'
                   id='image'
                   accept='image/png, image/jpeg'
                   name={name}
                   onChange={handleImageChange}
                   required
            />
        </div>
        <button
            className={classes.button}
            type='button'
            onClick={handlePickClick}
        >
            Pick an image
        </button>
    </div>
}