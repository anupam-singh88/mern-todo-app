import React from 'react'
import loader from '../assets/loader.gif'
// const link = '../assets/loader.gif'
const Loader = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={loader} alt="" style={{ width: '70px' }} />
        </div>
    )
}

export default Loader