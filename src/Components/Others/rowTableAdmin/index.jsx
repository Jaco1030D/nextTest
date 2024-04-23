import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../../hooks/useUpdateDocument'
import Modal from '@mui/material/Modal';
import './style.css'
import JSZip from 'jszip';
import { useInsertDocuments } from '../../../hooks/useInsertDocuments';
import axios from 'axios';

const RowTableAdmin = ({order}) => {
    console.log(order);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [downloaded, setDownloaded] = useState()
    const [messageError, setMessageError] = useState()
    const {updateDocument} = useUpdateDocument("archives")
    const { insertFilesAdmin, response} = useInsertDocuments("archives")
    const archivesTotal = order.languageSetings.translation.length * order.names.length

    const singleDownload = async (downloadURL, fileName) => {
        const response = await axios.get(downloadURL, { responseType: 'blob' })
    
        console.log(response);
    
        const blobUrl = URL.createObjectURL(response.data);
    
        const link = document.createElement('a');
    
        link.href = blobUrl;
    
        link.download = fileName || order.file;
    
        document.body.appendChild(link);
    
        link.click();
    
        document.body.removeChild(link);
      }
    
    //   const multipleDownload = async (array) => {
    //     array.forEach(element => {
    //       handleDownload(element.downloadArchive, element.name)
    //     });
    //   }

    const handleDownload = async (downloadURL, fileName) => {
        try {
          const response = await axios.get(downloadURL, { responseType: 'blob' });
          const blob = response.data;
          return { fileName, blob };
        } catch (error) {
          console.error('Error downloading file:', error);
          throw error;
        }
      };
      
      const multipleDownload = async (array, nameZip) => {
        const zip = new JSZip();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            try {
              const { fileName, blob } = await handleDownload(element.downloadArchive, element.name);
              setDownloaded('Baixando ' + (index + 1) + '/' + array.length);
              zip.file(fileName, blob);
            } catch (error) {
              console.error('Error downloading file at index ' + index + ':', error);
            }
          }
      
          try {
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const blobUrl = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = nameZip+'.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error('Error creating zip file:', error);
          }
      };

    const handleClick = async () => {
       try {
        const arrayArchive = []
        const namesTranslated = []

        for (let index = 0; index < files.length; index++) {

            const downloadArchive = await insertFilesAdmin(files[index])

            arrayArchive.push({downloadArchive, name: files[index].name})
            namesTranslated.push(files[index].name)
            
        }

        updateDocument(order.id, {archivesTranslated: arrayArchive, finalized: true, namesTranslated})

        axios.post("/.netlify/functions/sendEmail", {
            name: order.user.displayName,
            email: order.user.email,
            order,
            fromUser: true,
            finalized: true
        })
       } catch (error) {
        console.log(error);
       }

        handleClose()

    }

    const handleFileChange = (e) => {
        setMessageError("")
        const files = e.target.files
        console.log(files);
        if (archivesTotal < files.length) {
            setMessageError("Coloque apenas " + archivesTotal + " arquivo");
            e.target.value = ""
        }
        setFiles(files)
        
    }

    const getAPIInfos = async () => {
      const response = await axios.post("/.netlify/functions/api", {
          id_payment: order.paymentInfos.id_payment
        })

        return response.data
  }

    useEffect(() => {
      if (order.paymentInfos.status === 'requires_payment_method') {
        getAPIInfos().then(res => {
          if (res.status === 'succeeded') {

            axios.post("/.netlify/functions/sendEmail", {
              name: order.user.displayName,
              email: order.user.email,
              order: order,
              fromUser: true,
              finalized: false
          })
          axios.post("/.netlify/functions/sendEmail", {
              name: order.user.displayName,
              email: order.user.email,
              order: order,
              fromUser: false,
              finalized: false
          })
            
            updateDocument(order.id, {paymentInfos: {...order.paymentInfos, status: 'succeeded'}})
          } 
        })
      }
    },[])

  return (
        <tr>
            <td>{order.numOrder}</td>
            <td>{order.archivesURL.length}</td>
            <td>{order.user?.displayName}</td>
            <td>{order.user?.email}</td>
            {
                order.paymentInfos.status === 'requires_payment_method'
                ?
                (
                    <>
                        <td>{order.initialDate}h</td>
                        <td>{order.finalDate}h</td>
                    </>
                )
                : 
                (
                    <>
                        <td>{order.initialDate}h</td>
                        <td>{order.finalDate}h</td>
                    </>
                )
            }
            <td>{order.languageSetings.origin}</td>
            <td>{order.languageSetings.translation.length} idioma(s)</td>
            <td>{order.value}</td>
            <td>{order?.finalized ? 'Entregue' : order.paymentInfos.status}</td>
            <button onClick={handleOpen} disabled={order.paymentInfos.statusPayment === 'unpaid'}>Informações do arquivo</button>
            <Modal
            open={open}
            onClose={handleClose}            
            >
                <div className='modal'>
                  <h2>Projeto #{order.numOrder}</h2>
                   <span>feito por <b> {order.user?.displayName}</b></span> <br />
                    possui {order.names.length} arquivos <br />
                    Idioma origem: {order.languageSetings.origin}
                    <br />
                    Idioma destino: <b> {order.languageSetings.translation.join(", ")} </b>
                    <br />
                    {order.numPages > 0 && (
                      <>
                        numero paginas: {order.numPages}
                      <br />
                      </>
                    )}
                    numero palavras: {order.numWords}
                    <br />
                    Valor &euro; {order.value}
                    <br />
                    <p>Arquivos para tradução</p>
                    <button onClick={() => multipleDownload(order.archivesURL, `Pedido ${order.numOrder} - ${order.names.length} arquivos de ${order.user.displayName}`)}>Baixar todos</button>
                    <div className='archives_download' >

                        
                    {order.archivesURL.map((item, index) => (
                        
                        <p key={index} onClick={() => singleDownload(item.downloadArchive, item.name)} style={{cursor: 'pointer', color: 'blue'}}>{item?.name}</p>
                        ))}
                    </div>
                    <br />
                    {downloaded}
                    <br />
                    {order?.archivesTranslated && (
                        <div >
                            <p>Já entregue:</p>
                            <button onClick={() => multipleDownload(order.archivesTranslated)}>Baixar todos</button>
                            <div className='translatedArchives'>
                                
                            {order.archivesTranslated.map(item => (
                                <p style={{cursor: 'pointer', color: 'blue'}} onClick={() => singleDownload(item.downloadArchive, item.name) } >{item.name}</p>
                            ))}
                            </div>
                        </div>
                    )}
                    <br />
                    <input type="file" onChange={handleFileChange} multiple />
                    <br />
                    <p>Para entregar coloque {archivesTotal} arquivo(s)</p>
                    {response.loading && <p>Fazendo upload de arquivos...</p>}
                    {messageError && <p>{messageError}</p>}
                    <button onClick={handleClose}>Cancelar</button>
                    {!order?.archivesTranslated ? <button onClick={handleClick} disabled={archivesTotal !== files?.length}>Entregar</button>: <button onClick={handleClick} disabled={archivesTotal !== files?.length}>Entregar Novamente</button>}
                </div>
            </Modal>
        </tr>

  )
}

export default RowTableAdmin