
import React, { useState, useEffect } from 'react';

import HeaderBlock from "../Components/Header/HeaderBlock";
import BodyBlock from '../Components/_Components-Page-Accueil/Body/BodyBlock';
import FooterBlock from '../Components/Footer/FooterBlock';
import Spinner from '../Components/_Spinner/Spinner';

const Accueil = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <HeaderBlock />
          <BodyBlock />
          <FooterBlock />
        </>
      )}
    </>
  );
}

export default Accueil;

