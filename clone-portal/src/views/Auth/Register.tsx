import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { registerUser } from "../../redux/actions/Auth"


interface IFormTalent {
    name: string;
    email: string;
    password: string;
    role: string
}

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [type, setType] = useState<string>('candidat')
    const { register_success } = useSelector(({ auth }: any) => auth)
    const [formTalent, setFormTalent] = useState<IFormTalent>({
        name: '',
        email: '',
        password: '',
        role: type
    })

    let formFieldsTalent = {
        name: yup
            .string()
            .required('Champ obligatoire'),
        email: yup
            .string()
            .email("Email invalide")
            .required('Champ obligatoire'),
        role: yup
            .string()
            .required('Champ obligatoire'),
        password: yup
            .string()
            .required('Champ obligatoire'),
    }

    const validationSchema = yup.object(formFieldsTalent)

    const formik = useFormik({
        initialValues: formTalent,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: () => {
            handleRegister()
        },
    })

    useEffect(() => {
        if (register_success?.user_email) {
            navigate('/login')
        }
    }, [register_success])

  
    
    const handleRegister = () => {
        const { name, email, role, password } = formTalent;
        dispatch(registerUser(name, email, role, password))
    }

    const handleTextChange = (value: any, field: any) => {
        setFormTalent({
            ...formTalent,
            [field]: value
        })
    }

    const handleChangeType = () => {
        if (type == 'candidat') { 
            setType('recruteur') 
        }
        else { 
            setType('candidat') 
        }
    }

    useEffect(() => {
        setFormTalent({
            ...formTalent,
            role: type
        })
    }, [type])

    return (
        <div className="flex justify-center w-10/12 m-auto my-5">
            <div className="w-1/2 bg-primary flex justify-center py-10">
                <div>
                    <div>Profil</div>
                    <div>Vous êtes {type !== "candidat" ? "candidat" : "recruteur"} ?</div>
                    <div>Inscrivez en tant que {type !== "candidat" ? "candidat" : "recruteur"}</div>
                    <div>
                        <Button variant="outlined" onClick={handleChangeType}>
                            {
                                type !== "candidat" ? "S'INSCRIRE EN TANT QUE CANDIDAT" : "S'INSCRIRE EN TANT QUE RECRUTEUR"
                            }
                        </Button>
                    </div>
                </div>
            </div>
            {
                <div className="w-1/2 shadow-xl p-16">
                    <div className='text-center text-xl mb-7 font-thin'>Créer votre compte en tant que <span className="font-bold">{(type == 'candidat') ? "candidat" : "recruteur"}</span>.</div>
                    <form className='w-8/12 space-y-5 m-auto' onSubmit={formik.handleSubmit}>

                        <div>
                            <TextField
                                fullWidth
                                label="Nom"
                                id="name"
                                value={formik.values.name || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'name')}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                            />
                        </div>

                        <div>
                            <TextField
                                fullWidth
                                label="E-mail"
                                id="email"
                                value={formik.values.email || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Mot de passe"
                                id="password"
                                value={formik.values.password || ''}
                                onChange={(e) => handleTextChange(e?.target?.value, 'password')}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <Button type="submit" variant="contained" className='!bg-primary w-52 h-12'>S'inscrire</Button>
                        </div>
                        <div className='flex justify-center'>
                            <span>Vous avez déjà un compte ? </span><Link to='/login' className='ml-2 font-semibold'>Connectez-vous</Link>
                        </div>
                    </form>
                </div>
            }


        </div>
    )
}

export default Register
