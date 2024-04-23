import React, { useEffect, useState } from 'react'
import './style.css'
import '../FormArchive/style-modal.css'
import button from './Button.svg'
import frame from './Frame.svg'
import { useMainContext } from '../../../context/MainContext';


const typeMappings = {
  Brasil: 'Br',
  Portugal: 'Pt',
  'Estados Unidos': 'EUA',
  'Reino Unido': 'UK',
  Simplificado: 'Simp',
  Taiwanês: 'Tai',
  'Hong Kong': 'Hon',
  Espanha: 'Es',
  'América Latina': 'L.A.',
  Alemão: 'Al',
  Austrália: 'Au'
};

const typeMappingsUS = {
  Brazil: 'Br',
  Portugal: 'Pt',
  'United States': 'USA',
  'United Kingdom': 'UK',
  Simplified: 'Simp',
  Taiwanese: 'Tai',
  'Hong Kong': 'Hon',
  Spain: 'Es',
  'Latin America': 'L.A.',
  Germany: 'Al',
  Australia: 'Au'
};

const InputSelectMultiple = ({handleClose, text}) => {
  const [state, action] = useMainContext()
    const [languages, setLanguages] = useState()
    const [inputValue, setInputValue] = useState('')

    const filter = (query) => {
        const lowerCaseQuery = query;

        const results = languages.filter((language) => {

          return (
            language.language.toLowerCase().includes(lowerCaseQuery) ||
            language.types.some((type) => type.toLowerCase().includes(lowerCaseQuery))
          );
        });
      
        return results;
    }
    const update = (key) => {
      action.changeSelectedLanguages(key)
    }

    const getAbbreviationAndFullName = (fullName, typeMappings) => typeMappings[fullName] || fullName;
    const getFullName = (abbre, typeMappings) => typeMappings[abbre] || abbre;

    const handleClick = (name, item) => {
    if (state.languageSite === 'us') {
    
      const abbre = getAbbreviationAndFullName(item, typeMappingsUS)
      const value = item ? `${name} - ${abbre}` : name
      const array = [value]

      const arrayPrev = state.selectValues.translation

      if (!arrayPrev.includes(value)) {

        update({translation: array.concat(state.selectValues.translation)})

      } else {
        const index = arrayPrev.indexOf(value)

        arrayPrev.splice(index, 1)

        update({translation: arrayPrev})
      }
    } else {
      const abbre = getAbbreviationAndFullName(item, typeMappings)
      const value = item ? `${name} - ${abbre}` : name
      const array = [value]

      const arrayPrev = state.selectValues.translation

      if (!arrayPrev.includes(value)) {

        update({translation: array.concat(state.selectValues.translation)})

      } else {
        const index = arrayPrev.indexOf(value)

        arrayPrev.splice(index, 1)

        update({translation: arrayPrev})
      }
    }
      

      
    }

    const handleReset = () => {
      update({translation: []})
    }

    useEffect(() => {

        if (inputValue) {
            
            const array = filter(inputValue)
    
            setLanguages(array)
        } else {
          const language = state.languageSite === 'us' ? state.languagesDataUS : state.languagesData

            setLanguages(language)

        }

    }, [inputValue])

    useEffect(() => {
      if (state.languageSite === 'us') {
        setLanguages(state.languagesDataUS)
      } else {
        setLanguages(state.languagesData)
      }
    },[state.languageSite])
  return (
    <div className="destinoidiomas">
      <div className="div">
        <div className="botoes">
          <div className="botaoresetar">
            <div className="text-wrapper pointer index" onClick={handleReset}>{text.buttons[0]}</div>
          </div>
          <div className="button index pointer" onClick={handleClose}>
            <p>{text.buttons[1]} ⟶</p>
            
          </div>
        </div>

        <div className="container-inputSelect">
          <div className="content-inputSelect">
            {state.languageSite === 'us' ? (
              languages && languages.map((itemLanguage, index) => (
                itemLanguage.language !== state.selectValues.origin && (
                  <div className='languages_group pointer' key={index} >
                    {itemLanguage.types.length !== 0 && <div className='header_language_languages_group'><span className='name-language' >{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    {itemLanguage.types.length === 0 && <div className='header_language_languages_group'><span className='name-language'  onClick={() => handleClick(itemLanguage.language)}>{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    
                    {itemLanguage.types.map((item, indexTypes) => 
                    {
                      if (!state.selectValues.origin.includes(getAbbreviationAndFullName(item, typeMappingsUS))) {
                        return (
                          <div key={indexTypes}>
                            <div className="l"></div> <p className='type-language' onClick={() => handleClick(itemLanguage.language, item)}>{item}</p>{state.selectValues.translation.includes(itemLanguage.language + ' - ' + getFullName(item, typeMappingsUS)) && <box-icon name='check' style={{marginTop: '-5px'}} ></box-icon>}                      
                          </div>
                        )
                      }
                    }
                    )}
                  </div>
                )
              ))
            ) : (
              languages && languages.map((itemLanguage, index) => (
                itemLanguage.language !== state.selectValues.origin && (
                  <div className='languages_group pointer' key={index} >
                    {itemLanguage.types.length !== 0 && <div className='header_language_languages_group'><span className='name-language' >{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    {itemLanguage.types.length === 0 && <div className='header_language_languages_group'><span className='name-language'  onClick={() => handleClick(itemLanguage.language)}>{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    
                    {itemLanguage.types.map((item, indexTypes) => 
                    {
                      if (!state.selectValues.origin.includes(getAbbreviationAndFullName(item, typeMappings))) {
                        return (
                          <div key={indexTypes}>
                            <div className="l"></div> <p className='type-language' onClick={() => handleClick(itemLanguage.language, item)}>{item}</p>{state.selectValues.translation.includes(itemLanguage.language + ' - ' + getFullName(item, typeMappings)) && <box-icon name='check' style={{marginTop: '-5px'}} ></box-icon>}                      
                          </div>
                        )
                      }
                    }
                    )}
                  </div>
                )
              ))
            )}
            
          </div>

        </div>
          <div className="busca">
            <p className="frasehero">{text.title}</p>
            <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
            <div className="separator" />
            <div className="separator-2" />
            <div className="overlap-group">
              <img className="frame-2" alt="Frame" src={frame} />
              <div className="inputbusca">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} />
              </div>
              <div className="fieldset" />
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default InputSelectMultiple