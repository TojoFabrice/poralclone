import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faArrowRight, faFile, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { getInfosCandidat } from "../../redux/actions/Candidat"
import { Button } from "@mui/material"


const Informations = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { users, token } = useSelector(({ auth }) => auth)
    const { candidat_datas } = useSelector(({ candidat }) => candidat)
    const [cvUrl, setCvUrl] = useState<any>()

    useEffect(() => {
        if (users?.user_id) {
            dispatch(getInfosCandidat(token, users?.user_id))
        }
    }, [users])

    const handleDownload = () => {
        const userId = users.user_id
        fetch(`http://localhost:5000/api/cv/${userId}`)
            .then(response => response.blob()) // Convertir la réponse en blob
            .then(blob => {
                const cvBlobUrl = URL.createObjectURL(blob);
                setCvUrl(cvBlobUrl); // Mettre à jour l'URL du CV
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du CV :', error);
            });
    }

    return (
        <div className='border border-gray-200 shadow-md p-4 rounded-md'>
            <div className='mt-4 text-3xl font-bold  border-b-2 pb-1'>
                Informations personnelles
            </div>
            <div className=' mt-8 flex justify-between space-x-4'>
                <div className='bg-gray-200 w-1/3 p-8 space-y-5 rounded-md hover:shadow-md hover:cursor-pointer' onClick={() => navigate('/candidat/moncompte/info-candidat/modif')}>
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p>{candidat_datas ? candidat_datas.user_email : users.user_email}</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faPhone} />
                            <p>{candidat_datas ? candidat_datas.phone_number : ""}</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>{candidat_datas ? candidat_datas.ville : ""}</p>
                    </div>
                </div>
                <div className="w-2/3 px-8 py-4 space-y-5 rounded-md border hover:shadow-md hover:cursor-pointer">
                    <div className="text-xl border-b-2">
                        CV
                    </div>
                    <div className="space-y-3 flex flex-col">
                        <FontAwesomeIcon icon={faFile} style={{ fontSize: 40 }} />
                        <Button onClick={handleDownload}>Télécharger CV</Button>
                    </div>
                    {cvUrl && (
                        <embed src={cvUrl} type="application/pdf" width="100%" height="500px" />
                    )}

                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Informations
