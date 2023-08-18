import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfosCandidat, updateCandidat } from "../../../redux/actions/Candidat";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IFormUser {
    name: string,
    email: string,
    adresse: string,
    phone: string,
    ville: string,
    codepostale: string,
    civilite: string
}

const Modif = () => {
    const { token, users } = useSelector(({ auth }: any) => auth)
    const { candidat_datas } = useSelector(({ candidat }: any) => candidat)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // console.log('99999999999999999999999999999',candidat_datas);
    

    const [formInfos, setFormInfos] = useState<IFormUser>({
        name: "",
        email: "",
        adresse: "",
        phone: "",
        ville: "",
        codepostale: "",
        civilite: ""
    });
    const [file, setFile] = useState<any>()

    useEffect(() => {
        if (candidat_datas) {
            setFormInfos({
                name: candidat_datas?.user_name,
                email: candidat_datas?.user_email,
                adresse: candidat_datas?.adresse,
                phone: candidat_datas?.phone_number,
                ville: candidat_datas?.ville,
                codepostale: candidat_datas?.codepostale,
                civilite: candidat_datas?.civilite,
            })
        }
    }, [candidat_datas])


    useEffect(() => {
        if (users?.user_id) {
            dispatch(getInfosCandidat(token, users?.user_id))
        }
    }, [users])

    let formFieldsCandidat = {
        name: yup
            .string()
            .required('Champ obligatoire'),
        email: yup
            .string()
            .email("Email invalide")
            .required('Champ obligatoire'),
        adresse: yup
            .string()
            .required('Champ obligatoire'),
        phone: yup
            .string()
            .required('Champ obligatoire'),
        ville: yup
            .string()
            .required('Champ obligatoire'),
        codepostale: yup
            .string()
            .required('Champ obligatoire')
    };

    const validationSchema = yup.object().shape(formFieldsCandidat);

    const formik = useFormik({
        initialValues: formInfos,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: () => {
            handleUpdateInfos();
        },
    });

    const handleTextChange = (value: any, field: any) => {
        setFormInfos({
            ...formInfos,
            [field]: value
        })
    }

    const handleGoBack = () => {
        // Naviguer en arrière d'une page
        navigate(-1);
    };

    const handleUpdateInfos = () => {
        const { name, email, adresse, phone, ville, codepostale, civilite } = formInfos
        const dataInfo = {
            candidateData: {
                adresse: adresse,
                phone: phone,
                ville: ville,
                codepostale: codepostale,
                civilite: civilite
            },
            userData: {
                name: name,
                email: email
            }
        }

        dispatch(updateCandidat(dataInfo, users?.user_id))
    }

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('cv', file);

            // Supposons que vous ayez une fonction pour récupérer l'ID de l'utilisateur connecté
            const userId = users?.user_id // Remplacez par la vraie fonction

            fetch(`http://localhost:5000/api/upload-cv/${userId}`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Réponse du serveur:', data);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'upload du CV:', error);
                });
        }
    };

    return (
        <div className='border border-gray-200 shadow-md p-4 rounded-md px-10'>
            <div>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ fontSize: 30 }} onClick={handleGoBack} className="hover:cursor-pointer" />
            </div>
            <div className='mt-4 text-3xl font-bold border-b-2 pb-1'>
                Informations
            </div>
            <div className=' mt-8 flex justify-between w-full space-x-5'>
                <form className="w-7/12 space-y-7" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="font-bold text-xl">Civilité</div>
                        <div>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue='Mr'
                                    value={formik.values.civilite}
                                    onChange={(e: any) => setFormInfos({ ...formInfos, civilite: e.target.value })}
                                >
                                    <FormControlLabel value="Mr" control={<Radio />} label="Mr" />
                                    <FormControlLabel value="Mme" control={<Radio />} label="Mme" />
                                    <FormControlLabel value="Mlle" control={<Radio />} label="Mlle" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mb-2">Nom</h1>
                        <TextField
                            fullWidth
                            label="name"
                            id="name"
                            value={formik.values.name}
                            onChange={(e) => handleTextChange(e?.target?.value, 'name')}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        />
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2" >E-mail</h1>
                            <TextField
                                fullWidth
                                label="E-mail"
                                id="email"
                                value={formik.values.email || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Téléphone</h1>
                            <TextField
                                fullWidth
                                label="Téléphone"
                                id="phone"
                                value={formik.values.phone || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'phone')}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mb-2">Adresse</h1>
                        <TextField
                            fullWidth
                            label="Adresse"
                            id="adresse"
                            value={formik.values.adresse || ''}
                            onChange={(e) => handleTextChange(e?.target?.value, 'adresse')}
                            error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                        />
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Ville</h1>
                            <TextField
                                fullWidth
                                label="Ville"
                                id="ville"
                                value={formik.values.ville || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'ville')}
                                error={formik.touched.ville && Boolean(formik.errors.ville)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Code postale</h1>
                            <TextField
                                fullWidth
                                label="Code postale"
                                id="codepostale"
                                value={formik.values.codepostale || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'codepostale')}
                                error={formik.touched.codepostale && Boolean(formik.errors.codepostale)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button type="submit" variant="contained" > Enregistrer </Button>
                    </div>
                </form>

                <div className="flex flex-col justify-center w-5/12 h-80 rounded-lg border">
                    <div className="m-auto">
                        <div className="text-gray-500 text-2xl font-bold text-center mb-4">
                            Importer CV
                        </div>
                        <input type="file" onChange={handleFileChange} />
                        <div className="mt-4 flex justify-center">
                            <Button onClick={handleUpload} className="!bg-secondary ">Upload</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Modif