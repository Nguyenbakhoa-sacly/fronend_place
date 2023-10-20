import React, { useRef, useState, useEffect } from 'react'
import './imageUpload.scss'
import Button from '../Button'
const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreViewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    //doc noi dung file
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreViewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  })

  const pickeHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {

      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;

    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  return (
    <>
      <div className='form-control'>
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: 'none' }}
          type='file'
          accept='.jpg, .png, .jpeg'
          onChange={pickeHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className='image-upload__preview'>
            {
              previewUrl
                ? < img src={previewUrl} alt='Preview' />
                : <p>Please pick an image.</p>
            }
          </div>
          <Button
            type='button'
            onClick={pickImageHandler}
          >
            PICK IMAGE
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  )
}

export default ImageUpload
