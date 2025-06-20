import React, { useContext } from 'react';
import { TabContext } from '../context/TabContext';

const Description = () => {
    const { details } = useContext(TabContext)

    return (
        <div>{details.description}</div>
    )
}

export default Description