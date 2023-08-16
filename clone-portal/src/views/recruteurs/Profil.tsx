import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faSquareFacebook, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import profil from "../../assets/images/profil.jpg"
import { useRef, useState } from "react";


const Profil = () => {
    const [image, setImage] = useState<Blob>()
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        inputRef?.current?.click();
    };

    const handleImageChange = (e:any) => {
        const file = e.target.files[0]
        setImage(file)
    }

    return (
        <div className='border border-gray-200 shadow-md p-4 rounded-md px-10'>
            <div className='mt-4 text-3xl font-bold border-b-2 pb-1'>
                Profil
            </div>
            <div className=' mt-8 flex justify-between w-full space-x-5'>
                <form className="w-full space-y-7" >
                    <div className="flex justify-between w-full border p-6 items-center">
                        <div className="w-1/3" onClick={handleImageClick}>
                            {
                                image ? <img src={URL.createObjectURL(image)} className="w-40"  /> : <img src={profil} className="w-40"  />
                            }
                            <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden"/>
                        </div>
                        <div className="w-2/3">
                            <TextField
                                fullWidth
                                label=""
                                id=""
                            // value={formik.values.email || ''}
                            // onChange={(e) => handleTextChange(e?.target?.value, 'site-web')}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
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
                            // value={formik.values.email || ''}
                            // onChange={(e) => handleTextChange(e?.target?.value, 'site-web')}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Siège social</h1>
                            <TextField
                                fullWidth
                                label="Siège social"
                                id="siege-social"
                            // value={formik.values.phone || ''}
                            // onChange={(e) => handleTextChange(e?.target?.value, 'siege-social')}
                            // error={formik.touched.phone && Boolean(formik.errors.phone)}
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
                            // value={formik.values.email || ''}
                            // onChange={(e) => handleTextChange(e?.target?.value, 'effectif')}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="font-bold text-xl mb-2">Secteur</h1>
                            <TextField
                                fullWidth
                                label="Secteur"
                                id="secteur"
                            // value={formik.values.phone || ''}
                            // onChange={(e) => handleTextChange(e?.target?.value, 'secteur')}
                            // error={formik.touched.phone && Boolean(formik.errors.phone)}
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