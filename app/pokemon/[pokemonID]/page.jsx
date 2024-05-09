'use client'

import {useParams} from "next/navigation"

import {useState, useEffect} from "react"

import Image from "next/image"
import styles from '../../../styles/Pokemon.module.css'

export default function Pokemon() {
  const params = useParams()
  const id = params.pokemonID.toString()

  const [pokemon, setPokemon] = useState([])

  const getPokemon = async () => {
    
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()  
    
    setPokemon(data)
    
  }  

  
  useEffect(() => {
    getPokemon()
      
  }, [id])

  console.log(pokemon);  

  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image 
        src={`https://img.pokemondb.net/artwork/avif/${pokemon.name}.avif`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div>
        <h3>Número:</h3>
        <p>{pokemon.id}</p>
      </div>
      <div>
        <h3 className={styles.types_container}>Tipo:</h3>
        <div className={styles.types_container}>
          {pokemon.types?.map((item, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles['type_' + item.type.name]}`}
            >
              {item.type.name}
            </span>
          )) }
        </div>
      </div> 
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_width}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}