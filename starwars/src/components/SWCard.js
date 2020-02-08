import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import InfoCard from "./InfoCard";



const CardContainer = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 10px;
`;
const Button = styled.button`
    padding: 8px 20px;
    margin: 10px;
    background-color: blue;
    color: white;
`;


const SWCard = () => {
    const [swcharacters, setSWCharacters] = useState([]);
    
    // Stretch goal
    const [next, setnext]= useState(null);
    const [previous, setprevious ]= useState(null);
 
    function getCharacters(url){
        axios
    .get(url)
    .then(response => {
        console.log(response.data)
        setprevious(response.data.previous)
        setnext(response.data.next)
     setSWCharacters(response.data.results)
    })
    .catch(error => {
     console.log(`Error is: `, error);
   });
    }
   function getNext(){
       getCharacters(next);
   }
   function getPrevious() {
       getCharacters(previous);
   }
    
    useEffect(() => {
    getCharacters(`https://swapi.co/api/people`);

    
    }, [])
    
    if(!swcharacters){
    return <div> Loading...</div>
    } else {

    return ( 
        <div> 
     <CardContainer> {            
     swcharacters.map((character, index) => {
    const robot = () => character.gender === "n/a" ? "ROBOT" : character.gender;              
     return (
    <InfoCard 
     key={index}
     name={character.name}
     gender={robot()}
     height={character.height}
     mass={character.mass} />
     );
     })
     
    } </CardContainer>
     <div >{
         previous? ( <Button onClick = {getPrevious}> previous </Button>):null}
            {next? ( <Button onClick = {getNext}> next </Button>):null}
     </div>

    </div>

        )
    }

}

export default SWCard;