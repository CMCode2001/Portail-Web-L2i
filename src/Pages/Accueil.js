import React, { useState, useEffect } from 'react';

import HeaderBlock from "../Components/Header/HeaderBlock";
import BodyBlock from '../Components/_Components-Page-Accueil/Body/BodyBlock';
import FooterBlock from '../Components/Footer/FooterBlock';
import Spinner from '../Components/_Spinner/Spinner';
import '../Styles/FeedbackWidget.css'


const Accueil = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>  
        {loading ? (
        <Spinner />
      ) : (
        <>  
          <HeaderBlock />
          <BodyBlock />
          <FooterBlock />
        </>
      )}
    </div>
  );
}

export default Accueil;
