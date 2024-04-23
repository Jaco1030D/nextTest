import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../../context/MainContext'
import { getDeadLine } from '../../../hooks/useCalculateValue'
import { calculateValues } from '../../../utils'
import './style.css'
import { useNavigate } from 'react-router-dom'


const OrdersContainer = ({text}) => {
    const [state, actions] = useMainContext()
    const [numWords, setNumWords] = useState(1000)
    const [arrayValues, setArrayValues] = useState([])
    const [numPages, setNumPages] = useState(10)
    const [finalDate, setFinalDate] = useState()
    const [dateAutomatic, setDateAutomatic] = useState()
    const [initialDate, setInitialDate] = useState()
    const [value, setValue] = useState(0)
    const [deadline, setDeadline] = useState()
    const navigate = useNavigate()

    const calculateDates = (days, hours) => {

      const date = new Date();
  
      const initialDate = new Date(date)
  
      const finalDate = new Date(date)
  
      finalDate.setDate(finalDate.getDate() + days)
  
      finalDate.setHours(finalDate.getHours() + hours)

      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit'};
      const initialDateFormatted = initialDate.toLocaleString('pt-BR', options);
      const finalDateFormatted = finalDate.toLocaleString('pt-BR', options);
  
      return {initialDate: initialDateFormatted, finalDate: finalDateFormatted}
    }

    const calculateDateAutomatic = () => {

      const date = new Date();

      date.setHours(date.getHours() + 1)

      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'};

      const dateFinal = date.toLocaleString('pt-BR', options)

      return dateFinal
    }

    const calculateNumWords = async (files) => {
      let numWords = state.fileUpload.reduce((ac, file) => ac + file.numWords, 0);
      let numPages = state.fileUpload.reduce((ac, file) => ac + file.numPages, 0);

      return { numWords, numPages}
    }

    const getValuesAutomatic = (arrayOriginal, value) => {
      const tamanhoArray = arrayOriginal.length

    // Criar um novo array com o número 1 repetido o mesmo número de vezes que o tamanho do array original
      const arraySaida = Array(tamanhoArray).fill(parseFloat(value))

      return arraySaida;
    }

    const handleSelect = async (valueResult, name, multipler) => {
        if (state.filePending.length === 0 || state.fileUpload.length < state.filePending.length) {
          return
        }
        const files = state.filePending
        const names = []

        let arrayValuesLanguage = arrayValues.map(num => num * multipler);

        let finalDateE = finalDate

        if (name === 'Automático') {
          arrayValuesLanguage = getValuesAutomatic(state.selectValues.translation, numWords * state.valueAutomatic)
          finalDateE = dateAutomatic
        }
    
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          names.push(file.name)
        }
    
        const cartItems = {
          names,
          archivesURL: state.fileUpload,
          numWords,
          numPages,
          typeService: name,
          deadline,
          finalDate: finalDateE,
          initialDate,
          languageSetings: state.selectValues,
          value: valueResult,
          user: state.user,
          arrayValuesLanguage,
          archiveType: state.archiveTypeSelected.name,
          paymentInfos: {
            id_payment: '',
            statusURL: '',
            statusPayment: '', 
          }
        }
    
        await actions.changeCartItems(cartItems)
    
        window.scrollTo(0, 0);
        navigate('/' + state.languageSite + '/checkout')


    }

    useEffect(() => {
      calculateNumWords(state.filePending).then(res => {
        setNumWords(res.numWords)
        setNumPages(res.numPages)
      })

      // const files = state.filePending
      
      //   if (files) {

          
      //     let numWords = 0
          
      //     for (let index = 0; index < files.length; index++) {
      //       let numWordsFile = 0
      //       let numPagesFile = 0
      //       const file = files[index];

      //       console.log(file);

      //       try {
      //         getNumWordsArchive(file).then(res => {
      //           numWordsFile = res.numWords
      //           numPagesFile = res.numPages
      //           console.log(numWordsFile);
      //       })
      //       } catch (error) {
              
      //       }

      //       console.log(numWordsFile);
      //       numWords += numWordsFile
      //     }

      //     setNumWords(numWords)
        
          
      //   } else {
      //     setNumWords(1000)
      //     setNumPages(10)
      //   }
      },[state.filePending, state.deadline, deadline, state.fileUpload])

      useEffect(() => {
        const {finalDate, initialDate} = calculateDates(deadline?.days, deadline?.hours)

        setFinalDate(finalDate)

        const dateAutomatic = calculateDateAutomatic()

        setDateAutomatic(dateAutomatic)

        setInitialDate(initialDate)

      }, [deadline])

      useEffect(() => {

        const deadline = getDeadLine(state.deadlines?.baseDeadline, state.deadlines?.numWords, state.deadlines?.numHours, numWords)
  
        setDeadline(deadline)
  
      },[state.deadlines, numWords])

      useEffect(() => {

        if (state.languageSite === 'us') {
          
          const {arrayValues, finalValue} = calculateValues(numWords, state.selectValues, state.defaultValueUS, state.languageCombinationsUS, state.archiveTypeSelected)
          setValue(finalValue)
          setArrayValues(arrayValues)
        } else {

          const {arrayValues, finalValue} = calculateValues(numWords, state.selectValues, state.defaultValue, state.languageCombinations, state.archiveTypeSelected)
          setValue(finalValue)
          setArrayValues(arrayValues)
        }


  
      },[numWords, state.selectValues, state.languageCombinations, state.defaultValue, state.archiveTypeSelected])

  return (
    // <div className='orders-container'>
    //     <OrdersPreview name={'Premiun'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.premiun} />
    //     <OrdersPreview name={'Profissional'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.expert} />
    //     <OrdersPreview name={'Economica'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.economy} />
    // </div>
      <div className="box" id='container_values'>
        <div className="group">
          <div className="caixadepreos">
            <div className="frame">
              <div className="text-wrapper">{text.title[0]}</div>
              <div className="tradutorsenior">
                <div className="tradutorseniortexto">{text.describeSenior}</div>
              </div>
              <div className="tradutorsenior">
                <div className="tradutorseniortexto">{text.describePro}</div>
              </div>
              <div className="div">{state.archiveTypeSelected.name}</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.delivery}</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.numWords}</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">{text.coin} {(value * state.multiplers.premiun).toFixed(2)} </div>
            <div className="botao-selecionar">
              <div className="pointer" onClick={() => handleSelect((value * state.multiplers.premiun).toFixed(2), 'Premium', state.multiplers.premiun)}>{text.button}</div>
            </div>
          </div>
          <div className="caixadepreos-2">
            <div className="frame-3">
              <div className="text-wrapper">{text.title[1]}</div>
              <div className="tradutorseniortexto-wrapper">
                <div className="tradutorseniortexto-2">{text.describeSenior}</div>
              </div>
              <div className="div">{state.archiveTypeSelected.name}</div>
              <div className="caixaparaautolayout" />
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.delivery}</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.numWords}</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">{text.coin} {(value * state.multiplers.expert).toFixed(2)} </div>
            <div className="div-wrapper">
              <div className="pointer" onClick={() => handleSelect((value * state.multiplers.expert).toFixed(2), 'Expert', state.multiplers.expert)}>{text.button}</div>
            </div>
          </div>
          <div className="caixadepreos-3">
            <div className="frame-2">
              <div className="text-wrapper">{text.title[2]}</div>
              <div className="tradutorsenior-2">
                <div className="tradutorseniortexto-3">Tradução com Inteligencia artificial</div>
              <div className="div top">{state.archiveTypeSelected.name}</div>

              </div>
              <div className="caixaparaautolayout-2" />
              <div className="caixaparaautolayout" />
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.delivery}</div>
              <div className="dataentrega">{dateAutomatic}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">{text.numWords}</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">{text.coin} {state.languageSite === 'us' ? (numWords * state.valueAutomaticUS * state.selectValues.translation.length).toFixed(2) : (numWords * state.valueAutomatic * state.selectValues.translation.length).toFixed(2)} </div>
            <div className="botao-selecionar-2">
              <div className='pointer' onClick={() => handleSelect((numWords * state.valueAutomatic * state.selectValues.translation.length).toFixed(2), 'Automático', 1)}>{text.button}</div>
            </div>
          </div>
          {/* <div className="caixadepreos-3">
            <div className="frame-2">
              <div className="text-wrapper">Econômico</div>
              <div className="tradutorsenior-2">
                <div className="tradutorseniortexto-3">Tradutor Profissional</div>
              </div>
              <div className="caixaparaautolayout-2" />
              <div className="caixaparaautolayout" />
            </div>
            <div className="frame-2">
              <div className="textoentrega">Entrega dia</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">Número de Palavras</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">R$ {(value * state.multiplers.economy).toFixed(2)} </div>
            <div className="botao-selecionar-2">
              <div className="text-wrapper-2 pointer" onClick={() => handleSelect((value * state.multiplers.economy).toFixed(2), 'Economica', state.multiplers.economy)}>Selecionar</div>
            </div>
          </div> */}
        </div>
      </div>
    
  )
}

export default OrdersContainer
