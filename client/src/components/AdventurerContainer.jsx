import React, {useState} from 'react'
import AdventurerCard from './AdventurerCard'
import {useNavigate} from "react-router-dom"

function AdventurerContainer({adventurers}) {


  return (
      <div>Authorization
        {/*adventurer card*/}
            {
              [...adventurers].map((el) => {
                return <AdventurerCard key = {el.id} adventurer={el} />
              })
            }
      </div>
  )
}

export default AdventurerContainer