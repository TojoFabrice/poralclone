import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { userSignIn } from '../../redux/actions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

interface IFormTalent {
    email: string;
    password: string;
}


const Login = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const { token, register_success } = useSelector(({ auth }) => auth)
    const [formTalent, setFormTalent] = useState<IFormTalent>({
        email: '',
        password: ''
    })

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Email invalide")
            .required('Champ obligatoire'),
        password: yup
            .string()
            .required('Champ obligatoire'),
    })

    const formik = useFormik({
        initialValues: formTalent,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSignin()
        },
    })

    useEffect(() => {
        const registeredEmail = register_success?.user_email
        if (registeredEmail) {
            setFormTalent({
                ...formTalent,
                email: registeredEmail
            })
        }
    }, [register_success])

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    const handleTextChange = (value: any, field: any) => {
        setFormTalent({
            ...formTalent,
            [field]: value
        })
    }

    const handleSignin = () => {
        const { email, password } = formTalent;
        dispatch(userSignIn(email, password))
    }

    return (
        <div className='w-1/3 m-auto shadow-xl p-8 my-5 border-t-8 border-t-light-green-600'>
            <div className='text-center text-2xl mb-7 font-thin'>Connecter vous à votre compte.</div>
            <form className='w-full space-y-5' onSubmit={formik.handleSubmit}>
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
                    <Button type='submit' variant="contained" className='!bg-primary w-52 h-12'>Connexion</Button>
                </div>
                <div className='flex justify-center'>
                    <span>Pas de compte ?</span><Link to='/register' className='ml-2 font-semibold'>Inscrivez-vous</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
