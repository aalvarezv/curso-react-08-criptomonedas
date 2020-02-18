import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios';
import Error from './Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer; 
    }
`

const Formulario = ({guardarMoneda,guardarCriptomoneda, guardarCotizacion}) => {

    const [criptomonedas, setCriptomonedas] = useState([])

    const monedas = [
        {codigo: 'USD', nombre: 'Dolar EEUU'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'CLP', nombre: 'Peso Chileno'}
    ]

    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', monedas)

    const [criptomoneda, SelectCriptomoneda] = useCriptomoneda('Elige tu criptomoneda', '', criptomonedas)

    const [error, guardarError] = useState(false)

    //Ejecutar llamado a la API cuando la aplicación se inicia
    useEffect(() =>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url) 
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI();
    },[])

    //Usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            guardarCotizacion({})
            guardarError(true)
            return
        }

        guardarError(false)
        //pasa los resultados al componente principal.
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)

    }
   
    return ( 
       
        <form
            onSubmit={cotizarMoneda}
        >   
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMoneda />
            <SelectCriptomoneda />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form> 
    );
}
 
export default Formulario;