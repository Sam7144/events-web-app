import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer';
export default function Mainlayout({children}){
  return (
    <>
    <Header/>
      {children}
    <Footer/>
    </>
  )
}