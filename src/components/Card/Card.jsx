import React from 'react'
import "./Card.css"
function Card({title,url,isLoading}) {
    return (
        
        <div className='card'>
            <div className='left-inner-card'>
                {title}
            </div>
            <div className="right-inner-card">
                <a href={url}>
                <img src="/ic_round-read-more.png" alt="read more" />
                </a>
            </div>
        </div>
    )
}

export default Card
