import React, { useContext } from 'react';
import { TabContext } from '../TabContext';

const Return = () => {
    const { details } = useContext(TabContext)
    return (
        <div>{details.returnPolicy}</div>
    )
}

export default Return