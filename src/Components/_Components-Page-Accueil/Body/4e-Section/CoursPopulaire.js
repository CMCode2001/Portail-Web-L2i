import React from 'react'
import '../../../../Styles/CoursPopulaire.css';


 import s from "../../../../Assets/img/istockphoto-1356364268-612x612.jpg";
import d from "../../../../Assets/img/Capture d’écran du 2024-06-14 16-30-40.png";
import a from "../../../../Assets/img/Base-donnee-relationelle.jpg";
import f from "../../../../Assets/img/ReseauTelecom-scaled.jpg";
//import e from "../../../../Assets/img/securite_informatique-scaled-1-1.jpg";
import g from "../../../../Assets/img/systemes-exploitation-information-informatique.jpg";
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

export default function CoursPopulaire() {
  return (
    
  <body>
    <div className='container'>
      <div className='team_container'>
      
        <SeparatorBlock title="Cours Populaires"/>

      </div>

      <div className='row'> 
        <div className='profile-card'>
          
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={s} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Algorithme</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>

        <div className='profile-card'>
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={d} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Programmation</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>


        <div className='profile-card'>
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={a} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Base de donnée</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>

        <div className='profile-card'>
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={f} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Réseau & Télécom</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>
        

        <div className='profile-card'>
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={g} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Sécurité Informatique</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>

        <div className='profile-card'>
          <div className='profile-content'>
            <div className='profile-image'>

              <img src={g} alt='' className='image'/>

            </div>
            <div className='desc'>
              <h2>Système D'exploitation</h2> 
              <p>Tempor erat elitr rebum chez clita. Diam
                  dolor diam ipsum assis. Aliqu diam amet
                  diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clit
              </p>

            </div>
            <div className='btn-div'>
              <button className='btn'>Voir Plus..</button>
            </div>

          </div>
        </div>

      </div>
     



    </div>

  </body>


  )
}
