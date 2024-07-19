import { useState } from 'react';
import axios from 'axios'

const UploadFile = () => {

    const urlPath = `http://54.210.214.166:8080`
    // const urlPath = `http://localhost:8080`

    const [archivos, setArchivos] = useState([]);
    const [urlsDocumentos, setUrlsDocumentos] = useState([]);

    const [cargando, setCargando] = useState(false);

    const registraSolicitud = () => {
        cargaDocumentos()
    }

    const cargaDocumentos = async () => {
        setCargando(true)
        const formData = new FormData();
        for (let index = 0; index < archivos.length; index++) {
            formData.append('files', archivos[index])
        }
        await axios.post(`${urlPath}/service/uadmin/cargaDocumentosIngSoftware`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response)
            setCargando(false)
            if (response.data.estado) {
                listarDocumentos()
            }
        }).catch((e) => {
            setCargando(false)
            console.log(e)
        })
    }

    const listarDocumentos = async () => {
        setCargando(true)
        await axios.get(`${urlPath}/service/uadmin/obtenerDocumentosIngSoftware`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setCargando(false)
            console.log(response)
            if (response.data.estado) {
                setUrlsDocumentos(response.data.objeto)
            }
        }).catch((e) => {
            setCargando(false)
            console.log(e)
        })
    }

    const eventInputFiles = (e) => {
        const fileList = e.target.files;
        let valorFinalMB = 0;
        for (let step = 0; step < fileList.length; step++) {
            var fileSizeMB = fileList[step].size / 1024 / 1024;
            valorFinalMB = valorFinalMB + fileSizeMB;
        }
        console.log('Longitud de archivos --> ', valorFinalMB)
        if (valorFinalMB < 10) {
            setArchivos(e.target.files)
        } else {
            console.log("*Los archivos cargados superan las 10 MB")
        }
    }

    return (
        <>
            <input type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
            <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()}  >Registrar Docs</button>
            <br />
            {
                urlsDocumentos?.map((url, i) => {
                    return (
                        <>
                            <a href={url} target='_blank'> Documentos - {i}</a>  <br />
                        </>
                    )
                })
            }
            {
                cargando ?
                    <>Cargando ...</>
                    :
                    <></>
            }
        </>
    )
}

export default UploadFile