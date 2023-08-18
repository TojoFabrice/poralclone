import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faSquareFacebook, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import profil from "../../assets/images/profil.jpg"
import { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { getInfosRecruteur, updateRecruteur } from "../../redux/actions/Recruteur";

interface IReseaux {
    facebook: string;
    linkedin: string;
    twitter: string
}
interface IFormRecruteur {
    user_name: string,
    user_email: string,
    user_role: string,
    site_web: string,
    siege_social: string,
    effectif: string,
    secteur: string,
    apropos: string,
    reseaux_sociaux: IReseaux
}

const Profil = () => {
    const { token, users } = useSelector(({auth}: any) => auth)
    const { recruteur_infos } = useSelector(({recruteur}: any) => recruteur)
    const dispatch = useDispatch()

    const [image, setImage] = useState<Blob>()
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [reseauxList, setReseauxList] = useState<IReseaux>({
        facebook: "",
        linkedin: "",
        twitter: "",
    })

    const [formRecruteur, setFormRecruteur] = useState<IFormRecruteur>({
        user_name: "",
        user_email: "",
        user_role: "",
        site_web: "",
        siege_social: "",
        effectif: "",
        secteur: "",
        apropos: "",
        reseaux_sociaux: reseauxList
    })

    const formFieldsRecruteur = {
        user_name: yup
            .string()
            .required('Champ obligatoire'),
        user_email: yup
            .string()
            .email("Email invalide")
            .required('Champ obligatoire'),
        site_web: yup
            .string(),
        siege_social: yup
            .string(),
        effectif: yup
            .string(),
        secteur: yup
            .string(),
        apropos: yup
            .string(),
        facebook: yup
            .string(),
        linkedin: yup
            .string(),
        twitter: yup
            .string()
    }

    const validationSchema = yup.object().shape(formFieldsRecruteur);

    const formik = useFormik({
        initialValues: formRecruteur,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: () => {
            handleUpdateRecruteur()
        }
    })

    useEffect(() => {
        if (recruteur_infos) {
            setFormRecruteur({
                user_name: recruteur_infos?.user_name,
                user_email: recruteur_infos?.user_email,
                user_role: recruteur_infos?.user_role,
                site_web: recruteur_infos?.site_web,
                siege_social: recruteur_infos?.siege_social,
                effectif: recruteur_infos?.effectif,
                secteur: recruteur_infos?.secteur,
                apropos:recruteur_infos?.apropos,
                reseaux_sociaux: {
                    facebook: recruteur_infos?.reseaux_sociaux?.facebook,
                    linkedin: recruteur_infos?.reseaux_sociaux?.linkedin,
                    twitter: recruteur_infos?.reseaux_sociaux?.twitter,
                }
            })
        }
    }, [recruteur_infos])

    useEffect(() => {
        if (users?.user_id) {
            dispatch(getInfosRecruteur(token, users?.user_id))
        }
    }, [users])

    console.log(">>>>>>>>>>>>>>>>>>>>>>>DATA",recruteur_infos);
    

    useEffect(() => {
        setFormRecruteur({
            ...formRecruteur,
            reseaux_sociaux: reseauxList
        })
    }, [reseauxList])

    const handleTextChange = (value: any, field:string) => {
        if (field == 'facebook' || field == "linkedin" || field == "twitter"){
            setReseauxList({
                ...reseauxList,
                [field] : value,
            })
        }else{
            setFormRecruteur({
                ...formRecruteur,
                [field]: value
            })
        }
    }

    console.log("!!!!!!!!!!!!!!!!!!!!!!", formRecruteur);
    

    const handleImageClick = () => {
        inputRef?.current?.click();
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const handleUpdateRecruteur = () => {
        const { user_name, user_email, site_web, siege_social, effectif, secteur, apropos, reseaux_sociaux } = formRecruteur
        const { facebook, linkedin, twitter } = reseaux_sociaux
        const dataInfo = {
            recruteurData: {
                site_web,
                siege_social,
                effectif,
                secteur,
                apropos,
                reseaux_sociaux: {
                    facebook,
                    linkedin,
                    twitter
                }
            },
            userData: {
                name: user_name,
                email: user_email,
            }
        }

        dispatch(updateRecruteur(dataInfo, users?.user_id))
    }

    return (
        <div className='border border-gray-200 shadow-md p-4 rounded-md px-10'>
            <div className='mt-4 text-3xl font-bold border-b-2 pb-1'>
                Profil
            </div>
            <div className=' mt-8 flex justify-between w-full space-x-5'>
                <form className="w-full space-y-7" onSubmit={formik.handleSubmit}>
                    <div className="flex justify-between w-full border p-6 items-center">
                        <div className="w-1/3" onClick={handleImageClick}>
                            {
                                image ? <img src={URL.createObjectURL(image)} className="w-40" /> : <img src={profil} className="w-40" />
                            }
                            <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden" />
                        </div>
                        <div className="w-2/3">
                            <TextField
                                fullWidth
                                label="Nom societe"
                                id="name_societe"
                                value={formik.values.user_name || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'user_name')}
                                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2" >Site web</h1>
                            <TextField
                                fullWidth
                                label="Site web"
                                id="site-web"
                                value={formik.values.site_web || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'site_web')}
                                error={formik.touched.site_web && Boolean(formik.errors.site_web)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Siège social</h1>
                            <TextField
                                fullWidth
                                label="Siège social"
                                id="siege-social"
                                value={formik.values.siege_social || ''}
                            onChange={(e) => handleTextChange(e?.target?.value, 'siege_social')}
                            error={formik.touched.siege_social && Boolean(formik.errors.siege_social)}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2" >Effectif</h1>
                            <TextField
                                fullWidth
                                label="Effectif"
                                id="effectif"
                            value={formik.values.effectif || ''}
                            onChange={(e) => handleTextChange(e?.target?.value, 'effectif')}
                            error={formik.touched.effectif && Boolean(formik.errors.effectif)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Secteur</h1>
                            <TextField
                                fullWidth
                                label="Secteur"
                                id="secteur"
                            value={formik.values.secteur || ''}
                            onChange={(e) => handleTextChange(e?.target?.value, 'secteur')}
                            error={formik.touched.secteur && Boolean(formik.errors.secteur)}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mb-2">A propos</h1>
                        <TextField
                            fullWidth
                            id="apropos"
                            label="A propos"
                            multiline
                            rows={10}
                            variant="outlined"
                            value={formik.values.apropos || ''}
                            onChange={(e) => handleTextChange(e?.target?.value, 'apropos')}
                            error={formik.touched.apropos && Boolean(formik.errors.apropos)}
                        />
                    </div>
                    <div className="w-full">
                        <h1 className="font-bold text-xl mb-2" >Réseaux sociaux</h1>
                        <div className="space-y-4">
                            <TextField
                                fullWidth
                                id="facebook"
                                label="facebook"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon={faSquareFacebook} className="text-2xl" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                value={formik.values.reseaux_sociaux?.facebook || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'facebook')}
                                error={formik.touched.reseaux_sociaux?.facebook && Boolean(formik.errors.reseaux_sociaux?.facebook)}
                            />
                            <TextField
                                fullWidth
                                id="linkedin"
                                label="linkedin"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                value={formik.values.reseaux_sociaux?.linkedin || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'linkedin')}
                                error={formik.touched.reseaux_sociaux?.linkedin && Boolean(formik.errors.reseaux_sociaux?.linkedin)}
                            />
                            <TextField
                                fullWidth
                                id="twitter"
                                label="twitter"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon={faSquareTwitter} className="text-2xl" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                value={formik.values.reseaux_sociaux?.twitter || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'twitter')}
                                error={formik.touched.reseaux_sociaux?.twitter && Boolean(formik.errors.reseaux_sociaux?.twitter)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button type="submit" variant="contained" > Enregistrer </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Profil