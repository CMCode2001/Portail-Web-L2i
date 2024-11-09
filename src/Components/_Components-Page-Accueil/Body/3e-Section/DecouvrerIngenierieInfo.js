import React from 'react'
import '../../../../Styles/DecouvrerIngInf.css';
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

export default function DecouvrerIngenierieInfo() {
  return (
    <>
    <SeparatorBlock title="Découvrez l’ingénierie Informatique" />
    <div className='whole-block center'>
      <div className='top-section'>
        <div className='left'>
          <div className='left-1 bordure'>
            <h4> Développement  d’Application</h4>
            <p>
              Le développement d'application implique la 
              conception et la planification d'une solution 
              logicielle en fonction des besoins 
              spécifiques. Les développeurs écrivent 
              ensuite le code source en utilisant des 
              langages de programmation tels que Java, 
              Python, ou Swift.
            </p>
          </div>
          <div className='left-2 bordure'>
            <h4>CyberSécurité</h4>
            <p>
              La cybersécurité vise à protéger les systèmes 
              informatiques, réseaux et données contre les 
              menaces numériques telles que les attaques 
              malveillantes et les violations de données. 
              Elle englobe la mise en place de mesures de 
              prévention, de détection et de réponse.
            </p>
          </div>
        </div>
        <div className='right bordure'>
          <h4>Reseau, Système et Telecom</h4>
          <p>
            L'administration réseau, système et 
            télécommunication implique la gestion 
            globale des infrastructures informatiques 
            d'une organisation. Cela inclut la 
            configuration, la surveillance et la 
            maintenance des serveurs, des équipements 
            réseau et des systèmes d'information. Les 
            administrateurs assurent la sécurité des 
            données, gèrent les droits d'accès, résolvent 
            les problèmes techniques, et supervisent les 
            communications téléphoniques et les 
            réseaux pour garantir une connectivité 
            stable et sécurisée. Ils sont également 
            responsables de la planification stratégique, 
            de la mise en œuvre des nouvelles 
            technologies et de la conformité aux normes 
            de l'industrie.
          </p>
        </div>
      </div>
      <div className='bottom-section bordure'>
        <h4> Analyse de donnée, Base de donnée, Science des données...</h4>
        <p>
          L'analyse de données consiste à examiner, interpréter et tirer des conclusions à partir de jeux de données pour 
          prendre des décisions éclairées. Les bases de données sont des structures organisées qui stockent et gèrent les 
          données de manière systématique, permettant leur manipulation. La science des données utilise des techniques 
          statistiques et informatiques pour extraire des insights significatifs à partir de grandes quantités de données, 
          facilitant la prise de décision et la résolution de problèmes complexes.
        </p>
      </div>
    </div>
    </>
  )
}
