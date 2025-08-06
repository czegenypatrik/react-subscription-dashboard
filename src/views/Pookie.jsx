import { CButton } from '@coreui/react'
import React, { Component } from 'react'
import sound from '../assets/audio/lizard-button.mp3' // Adjust the path as necessary;

export class Pookie extends Component {
    // Create an Audio object
    audio = new Audio(sound); // Make sure the path is correct

    handleClick = () => {
        this.audio.currentTime = 0; // Reset audio in case it's already playing
        this.audio.play();
    }

    render() {
        return (
            <>
                <div className='w-100 align-items-center d-flex flex-column justify-content-center' style={{ height: '50vh' }}>
                    <CButton
                        color="success"
                        className="rounded-pill"
                        onClick={this.handleClick}
                        style={{ width: '200px', height: '200px', fontSize: '72px' }}
                    >🦎</CButton>
                </div>

            </>

        )
    }
}

export default Pookie
