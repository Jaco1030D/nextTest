import React, { Suspense, lazy, useEffect, useState } from 'react'
import './style.css'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import { useMainContext } from '../../../context/MainContext'
import { getNumWordsArchive } from '../../../hooks/useCalculateValue'

// const { getNumWordsArchive } = lazy(() =>  import("../../../hooks/useCalculateValue"))
const FileCardUpload = ({file, numFiles, setFunctionsExecuted, text}) => {
  const name = file.name
  const [state, action] = useMainContext()
  const [progressBar, setProgressBar] = useState(0)
  const [numWords, setNumWords] = useState()
  const [numPages, setNumPages] = useState()
  const [downloadArchive, setDownloadArchive] = useState()
  const {insertFilesAdmin} = useInsertDocuments('archives')
  const [multipler, setMultipler] = useState(0.8)
  const progressCallback = (value) => {
    setProgressBar(parseInt(value))
  }

  useEffect(() => {

    const isFileUpload = state.fileUpload.find(files => files.name === file.name)

    if (isFileUpload) {
      setMultipler(1)
      setProgressBar(100)
      setNumWords(isFileUpload.numWords)
      return
    } else {
      setMultipler(0.8)
      setProgressBar(0)
    }

    getNumWordsArchive(file, progressCallback).then(res => {
      setNumWords(res.numWords)
      setNumPages(res.numPages)
    })

    insertFilesAdmin(file).then(res => {
      setMultipler(1)
      setDownloadArchive(res)
    })

    setFunctionsExecuted(true)


  }, [file])

  useEffect(() => {
    const isFileUpload = state.fileUpload.find(files => files.name === file.name)
    if (isFileUpload) {
      return
    }

    if (downloadArchive && numWords) {
      action.changeUploadFiles({
        downloadArchive,
        name: file.name,
        numWords,
        numPages
      })
    }

  }, [numWords, downloadArchive, state.fileUpload])

  return (
    // <div className='fileCardUpload'>
    //   <p>{numWords}</p>
    //     <span>{file.name}</span>
    //     <progress value={progressBar * multipler} max={100} ></progress>
    // </div>
    <section className='progress-area'>
      <li className="row">
        <i className="fas fa-file-alt"></i>
        <div className="content">
          <div className="details">
            <span className="name">{name.length > 30 ? `${name.substring(0, 45)}...` : name}</span>
            <span className="percent">{parseInt(progressBar * multipler)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{width: `${progressBar * multipler}%`}}></div>
          </div>
          {progressBar * multipler === 100 && <span>{text}: {numWords}</span>}

        </div>
      </li>
    </section>
  )
}

export default FileCardUpload

