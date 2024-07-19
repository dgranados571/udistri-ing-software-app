import { useState } from 'react';
import AWS from 'aws-sdk';

const awsConfig = {
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
};

AWS.config.update(awsConfig);

const rekognition = new AWS.Rekognition();

const Rekognition = () => {

    const [image, setImage] = useState(null);
    const [faces, setFaces] = useState([]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const buffer = reader.result;
            setImage(buffer);
        };
        reader.readAsArrayBuffer(file);
    };

    const detectFaces = async () => {
        if (!image) return;
        const params = {
            Image: {
                Bytes: image
            }
        };
        try {
            const response = await rekognition.detectFaces(params).promise();
            console.log('Danny -->', response.FaceDetails)
            setFaces(response.FaceDetails);
        } catch (error) {
            console.error('Error detecting faces:', error);
        }
    };

    return (
        <>
            <div>
                <div className='div-buttom-header '>
                    <input className='btn-custom' type="file" accept="image/*" onChange={handleImageChange} />
                    <button className='btn-custom' onClick={detectFaces}>Detectar Rostros</button>
                </div>
                <div>
                    {
                        faces.map((face, index) => (
                            <>
                                <div key={index}>
                                    <h3>BoundingBox (Cuadro delimitador) {'-->'} Rostro {index}</h3>
                                    <div className='div-rek-1'>
                                        <p>Width (Ancho): {face.BoundingBox.Width} </p>
                                        <p>Height (Altura): {face.BoundingBox.Height}</p>
                                        <p>Left (Izquierda): {face.BoundingBox.Left}</p>
                                        <p>Top (Superior): {face.BoundingBox.Top}</p>
                                    </div>
                                    <h3>Landmarks (Puntos de referencia)</h3>
                                    {
                                        face.Landmarks.map((lnm) => {
                                            return (
                                                <div className='div-rek-1'>
                                                    <div className='p-ldnm-1'>
                                                        <p>Type: {lnm.Type} </p>
                                                    </div>
                                                    <div className='p-ldnm'>
                                                        <p> {'-->'} Componente-X: {lnm.X} </p>
                                                    </div>
                                                    <div className='p-ldnm'>
                                                        <p>{'-->'}  Componente-Y: {lnm.Y} </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <h3>Pose (Postura) </h3>
                                    <div className='div-rek-1'>
                                        <p>Roll (Balanceo): {face.Pose.Roll} </p>
                                        <p>Yaw (Cabeceo): {face.Pose.Yaw}</p>
                                        <p>Pitch (Inclinación): {face.Pose.Pitch}</p>
                                    </div>
                                    <h3>Quality (Calidad) </h3>
                                    <div className='div-rek-2'>
                                        <p>Brightness (Brillo): {face.Quality.Brightness} </p>
                                        <p>Sharpness (Nitidez): {face.Quality.Sharpness}</p>
                                    </div>
                                    <h3>Confidence: </h3>
                                    <div className='div-rek-2'>
                                        <p>(Confianza) </p>
                                        <p>{face.Confidence}</p>
                                    </div>

                                </div>
                                <hr />
                            </>
                        ))}
                </div>
            </div>
        </>
    )

}

export default Rekognition