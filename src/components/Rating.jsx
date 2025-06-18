import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const Rating = ({ rating }) => {

    let arrFilled = [], arrEmpty = [], fullStar, partialStar, totalStar = 5, partialStarPecentage;
    function callStar() {
        console.log(typeof (rating), Math.trunc(rating), fullStar)
        fullStar = Math.trunc(rating)

        console.log(rating, fullStar)
        arrFilled = new Array(fullStar).fill(1)
        partialStar = rating - fullStar;
        partialStarPecentage = partialStar * 100;
        totalStar = partialStar ? totalStar - fullStar - 1 : totalStar - fullStar;
        arrEmpty = new Array(totalStar).fill(0)
        console.log("array ", partialStar, totalStar)
    }

    return (
        <div style={{ display: 'flex' }}>
            {!!rating && callStar()}
            {!!rating && arrFilled?.map(item =>
                <div style={{ position: 'relative', width: "20px", height: "20px" }}>
                    <FontAwesomeIcon icon={faStar} size={20} style={{ color: "black", position: 'absolute', top: 0, left: 0 }} />
                    <div style={{ overflow: 'hidden', width: 100 + "%", position: 'absolute', top: "-4px", left: 0 }}>
                        <FontAwesomeIcon icon={faStar} color='gold' size='20' />
                    </div>
                </div>
            )
            }
            {!!partialStar &&
                <div style={{ position: 'relative', width: "20px", height: "20px" }}>
                    <FontAwesomeIcon icon={faStar} size={20} style={{ color: "black", position: 'absolute', top: 0, left: 0 }} />
                    <div style={{ overflow: 'hidden', width: partialStarPecentage + "%", position: 'absolute', top: "-4px", left: 0 }}>
                        <FontAwesomeIcon icon={faStar} color='gold' size='20' />
                    </div>
                </div>

            }
            {!!rating && arrEmpty?.map(item =>
                <div style={{ position: 'relative', width: "20px", height: "20px" }}>
                    <FontAwesomeIcon icon={faStar} size={20} style={{ color: "black", position: 'absolute', top: 0, left: 0 }} />
                    <div style={{ overflow: 'hidden', width: 0 + "%", position: 'absolute', top: "-4px", left: 0 }}>
                        <FontAwesomeIcon icon={faStar} color='gold' size='20' />
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Rating