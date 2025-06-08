import React, { useContext } from 'react';
import { TabContext } from '../TabContext';

const AdditionalInfo = () => {

    const { details } = useContext(TabContext)

    return (
        <div>
            <div>Shipping : {details.shippingInformation}</div>
            <div>Warranty : {details.warrantyInformation}</div>
            <div>Weight : {details.weight}</div>
            <div>Depth : {details.dimensions.depth}</div>
            <div>Height : {details.dimensions.height}</div>
            <div>Width : {details.dimensions.width}</div>
        </div>
    )
}

export default AdditionalInfo