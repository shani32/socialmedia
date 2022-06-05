import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import Pins from '../container/Pins'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
    const [pins, setPins]= useState()
    const [loading, setLoading]=useState(false)
    
    const {categoryId}=useParams();

    useEffect(()=>{
        
        if(categoryId){
            setLoading(true)
            const query= searchQuery(categoryId)

            client.fetch(query)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }else{
            client.fetch(feedQuery)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
    })
    if(loading) return <Spinner message='we are adding ideas. please wait!'/>
  return (
    <div>
       {Pins && <MasonryLayout pins={pins}/>} 
    </div>
  )
}

export default Feed