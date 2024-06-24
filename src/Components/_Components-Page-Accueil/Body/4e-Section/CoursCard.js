import React from 'react';


export default function CoursCard({image, tittle, description}){

    return(

        <div className='profile-card'>
            <div className='profile-content'>

                <div className='profile-image'>
                    <img src={image} alt={tittle} className='image'/>
                </div>

                <div className='desc'>
                    <h2>{tittle}</h2>
                    <p>{description}</p>
                </div>

                <div className='btn-div'>
                    <button className='btn'>Voir Plus</button>
                </div>

            </div>
        </div>

    );


}