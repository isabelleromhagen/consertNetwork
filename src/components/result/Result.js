import React from 'react'
import BandPic from '../../shared/images/band1.jpg'

export const Result = () => {
    return (
        <div className="resultWrapper">
            <span>Frantic Amber</span>
            <img src={BandPic} alt="bandpic"/>
            <span>Melodic Death Metal</span>
            <button>Seen</button>
        </div>
    )
}

/*should take in props for bandname, pic, genre, info about if users seen status */