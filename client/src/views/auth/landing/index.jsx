import React from 'react';
import Banner from 'views/auth/landing/components/Banner';
import WhatIs from 'views/auth/landing/components/WhatIs';
import Features from 'views/auth/landing/components/Features';
import Footer from 'components/footer/Footer'

export default function LandingPage() {
    
  return (
    <div>
      <Banner />
      <WhatIs />
      <Features />
      <Footer />
    </div>
  );

}