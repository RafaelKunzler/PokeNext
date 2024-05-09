"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import styles from "./page.module.css";

import Card from "./components/Card";

export default function Home() {    
  const [pokemons, setPokemons] = useState([])

  const getPokemons = async () => {    
    const maxPokemons = 151
    const api = 'https://pokeapi.co/api/v2/pokemon/'
    const URL = `${api}/?limit=${maxPokemons}`
  
    const res = await fetch(URL)
    const data = await res.json()
  
    // add pokemon index
    data.results.forEach((item, index) => {
      item.id = ("000" + (index + 1)).slice(-3)
    })

    setPokemons(data.results)    
  }

  useEffect(() => {
    getPokemons()
  }, [])
  
  return (    
      <>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Poke<span>Next</span></h1>
          <Image src="/images/pokeball.png" width="50" height="50" alt="pokenext"/>
        </div>
        <div className={styles.pokemon_container}> 
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </>    
  );
}
