import React, { useEffect, useRef, useState } from 'react'
import upload from './upload.svg'
import './style.css'
import '../FormArchive/style-modal.css'
import button from './Button.svg'
import ReactLoading from 'react-loading';
import { useMainContext } from '../../../context/MainContext'
import FileCardUpload from '../FileCardUpload'


const InputDrop = ({setOpen, text}) => {
    const [state, actions] = useMainContext()
    const [messageError, setMessageError] = useState()
    const [archivesArray, setArchivesArray] = useState([])
    const input = useRef()
    const handleClose = () => {
      if (state.filePending.length > state.fileUpload.length) {
        return
      }
      setOpen(false)
    };
  const [functionsExecuted, setFunctionsExecuted] = useState(false);
    const handleFileChange = async (e) => {

        const files = Array.from(e.target.files)
        let addFiles = files.filter(newFile => {
          return !state.fileUpload.some(existingFile => existingFile.name === newFile.name);
        })

        if (addFiles.length > 0) {
          
          actions.changeFiles(addFiles)
        }
    }
    const handleDrop = (e) => {
      e.preventDefault()

      setMessageError('')
      if (e.dataTransfer.files.length > 0) {
        const acceptedFiles = Array.from(e.dataTransfer.files).filter(file =>
          file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.xlsx')
        );
      
        if (acceptedFiles.length > 0) {
          const newFileList = new DataTransfer();
          acceptedFiles.forEach(file => newFileList.items.add(file));

          let addFiles = acceptedFiles.filter(newFile => {
            return !state.fileUpload.some(existingFile => existingFile.name === newFile.name);
          })
  
          if (addFiles.length > 0) {
            
            actions.changeFiles(addFiles)
          }
      
          input.current.files = newFileList.files;
          e.target.files = newFileList.files;
      

        } else {
          setMessageError('Apenas arquivos .pdf ou .docx são permitidos.');
        }
      }
    }
    const handleReset = async () => {
      setArchivesArray([])
      await actions.resetUploadFiles([])
      await actions.changeFiles([])
    }
    const mergeArray = (arr1, arr2) => {
      const fileNamesSet = new Set(arr1.map(obj => obj.name));

      // Adicione objetos do primeiro array à saída
      const mergedArray = [...arr1];
    
      // Itere sobre o segundo array
      for (const obj of arr2) {
        // Verifique se o nome do arquivo já existe no conjunto
        if (!fileNamesSet.has(obj.name)) {
          // Se não existir, adicione o objeto à saída e ao conjunto
          mergedArray.push(obj);
          fileNamesSet.add(obj.name);
        }
      }
    
      return mergedArray;
    }
    useEffect(() => {
      const newArray = mergeArray(state.fileUpload, state.filePending)
      const sortedFiles = newArray.sort((a, b) => b.size - a.size);

      setArchivesArray(sortedFiles)

    },[state.filePending])

  return (
    <div className="destinoidiomas">
      <div className="div">
      <div className="content-div">

        {archivesArray?.length > 0 && archivesArray.map((file, index) => (
            <FileCardUpload text={text.word} key={index} numFiles={archivesArray.length} functionsExecuted={functionsExecuted} setFunctionsExecuted={setFunctionsExecuted} file={file} />
          ))}

        <div className="itens-div" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          
            <label htmlFor='file' className='pointer'> 
                <p>{text.description}</p>

                <img src={upload} alt="upload-img" className='img-upload' />
            </label>
            {text.add}: {archivesArray.length}
            <input ref={input} style={{display: 'none'}} onDragOver={(e) => e.preventDefault()} type="file" id='file' name='archive8' onDrop={handleDrop} onChange={handleFileChange} multiple accept=".pdf, .docx, .xlsx"/>
        </div>
      </div>
      <div className="busca">
        <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
      </div>
      
      <div className="botoes">
          <div className="botaoresetar">
            <div className="text-wrapper pointer" onClick={handleReset}>{text.buttons[0]}</div>
          </div>
          <div className="button pointer" onClick={handleClose}>
        
            <div className="text-wrapper-2 drop"  >{archivesArray.length !== state.fileUpload.length ? <div className='inputDrop-text-button'>{text.loading}<ReactLoading type={'spin'} color={'#fff'} height={'28.35px'} width={'28.35px'} /></div> : text.buttons[1]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDrop