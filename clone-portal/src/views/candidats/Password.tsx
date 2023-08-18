import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/actions/Candidat";

interface IPassword {
  newpassword: string,
  confirmpassword: string,
}


const Password = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(({ auth }) => auth)

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const [formPassword, setFormPassword] = useState<IPassword>({
    newpassword: "",
    confirmpassword: "",
  });

  let formFieldsPassword = {
    newpassword: yup
      .string()
      .required('Champ obligatoire'),
    confirmpassword: yup
      .string()
      .required('Champ obligatoire'),
  };

  const validationSchema = yup.object().shape(formFieldsPassword);

  const formik = useFormik({
    initialValues: formPassword,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleChangePassword();
    },
  });

  const handleTextChange = (value: any, field: any) => {
    setFormPassword({
      ...formPassword,
      [field]: value
    })
  }

  const handleChangePassword = () => {
    if (formPassword.newpassword === formPassword.confirmpassword) {
      const obj_new_password = {
        newpassword: formPassword.newpassword
      }
      dispatch(updatePassword(obj_new_password, users?.user_id))
    } else {
      toast.error('Mot de passe different', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className='border border-gray-200 shadow-md p-4 rounded-md'>
      <div className='mt-4 text-3xl font-bold  border-b-2 pb-1'>
        Nouveau mot de passe
      </div>
      <div className='w-full mt-8 mb-3 flex justify-center space-x-4'>
        <form className="w-1/2 space-y-4" onSubmit={formik.handleSubmit}>
          <div className="w-full">
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Nouveau mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Nouveau mot de passe"
                onChange={(e) => handleTextChange(e?.target?.value, 'newpassword')}
                error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
              />
            </FormControl>
          </div>

          <div>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirme mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-confirm"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirme mot de passe"
                onChange={(e) => handleTextChange(e?.target?.value, 'confirmpassword')}
                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
              />
            </FormControl>
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit" variant="contained">Confirmer</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Password
