import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const handleClick = async () => {
    const response =  await axios.get("api/hello");
    console.log(response.data)
    setName(response.data.name)
  }

  return (
    <>
      <h1>name</h1>
      {name}
      <button onClick={handleClick} >get</button>
   </>
  )
}

export default Home
