import { Button } from '@mui/material';
import React from 'react'
import { toAbsoluteUrl } from '../../utils'

function FileUploader(props) {

    const { handleChange, uplaodHeight, uploadText, uploadBtn, uplaodWidth } = props;
    
    return (
        <div className='uplaod-ui' style={{ width: uplaodWidth, height: uplaodHeight }}>
            <Button variant="contained" component="label" className='upload-video '>
                {uploadText}
                <span className='upload-plus-btn'>{uploadBtn}</span>
                <input type='file' name="file" onChange={(e) => handleChange(e)} accept=".mp4" multiple required />
            </Button>
            <span className='uplaod-span'>
                <img src={toAbsoluteUrl('/images/uplaod-icon.svg')} alt="" /><br />
            </span>
        </div>
    )
}

export default FileUploader