import React from 'react';
import Banner from 'views/auth/landing/components/Banner';
import WhatIs from 'views/auth/landing/components/WhatIs';
import Features from 'views/auth/landing/components/Features';
import Footer from 'layouts/auth/Default'

export default function LandingPage() {
    
  return (
    <div>
      <Banner />
      <WhatIs />
      <Features />
      {/* <Footer /> */}
    </div>
  );

}