"use client";

import Hero from "./Components/Hero/Hero";
import SectionProducts from './Components/ProductGrid/SectionProducts'
import Footer from "./Components/Footer/Footer";



export default function Home() {
  

  return (
    <div >
      <Hero/>
      <SectionProducts />
      <Footer/>
    </div>
  );
}
