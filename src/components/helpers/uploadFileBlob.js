import axios from "axios";
import { readAndCompressImage } from 'browser-image-resizer';

const config = {
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    debug: true
};
export const uploadFileBlob=async (files)=>{

    try {
        let resized=[]
        for (let i=0;i<files.length;i++){
            let resizedImage = await readAndCompressImage(files[i], config);
            resized.push(resizedImage)
        }
        return resized
    } catch (error) {
        console.error(error);
        throw(error);
    }
}