import React from 'react';


export default function CoursCard({image, title, description,image1}){

    return(

        <div className='profile-card'>
            <div className='profile-content'>

                <div className='profile-image'>
                    <img src={image} alt={title} className='image'/>
                </div>
                <div className='desc'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>

                <div className='btn-div'>
                    <button className='btnVoirPlus'>Voir Plus..</button>
                </div>

            </div>
        </div>

    );


}