import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'


const Label = styled.label`
    font-family: 'Bebas neue', cursive;
    color: #FFF;
    text-transform: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display:block;
`

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearence: none;
    border-radius: 10px;
    border: none;
    font-size: 1.8rem;
`

const useMoneda = (label, stateInicial, opciones) => {

    //State de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial)

    const selectMoneda = () => {
        return (
            <Fragment>
                <Label>{label}</Label>
                <Select
                    onChange={e => actualizarState(e.target.value)}
                    value={state}
                >
                <option key="" value="">Seleccione</option>

                    {opciones.map(opcion => {
                         return <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    })}
                   
                </Select>
            </Fragment>
        )
    }
    //retornar state, interfaz (selectMoneda) y funcion que actualiza el state 
    //el orden no es importante
    return [state, selectMoneda, actualizarState]
}

export default useMoneda