import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import { DocumentContext } from 'next/document'

const Home = ({stars}: {stars:any}) => {
  const [name, setName] = useState("");
  const handleClick = async () => {
    const response =  await axios.get("api/hello");
    console.log(response.data)
    setName(response.data.name)
  }

  return (
    <>
      <h1>{name}</h1>
      <h1>{stars.name}</h1>
      {name}
      <button onClick={handleClick} >get</button>
   </>
  )
}

type getInitialPropsParam = {
  Component: any,
  ctx:  DocumentContext
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  console.log("============page==============")
  const response =  await axios.get("http://localhost:3000/api/hello");
  console.log("ctx" , ctx , "ctxend")
  return { stars: response.data }
}
export default Home