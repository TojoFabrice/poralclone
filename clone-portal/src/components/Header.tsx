import NavBar from './NavBar'
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useLocation } from 'react-router-dom'

interface IEmplois {
    label: string
}

const Header = () => {
    const location = useLocation();
    const currentURL = location.pathname;
    const url = [
            "/candidat/moncompte",
            "/candidat/moncompte/dashbord",
            "/candidat/moncompte/info-candidat",
            "/candidat/moncompte/info-candidat/modif",
            "/candidat/moncompte/password",
            "/candidat/moncompte/candidatures",
            "/recruteur",
            "/recruteur/dashbord",
            "/recruteur/profil",
        ]
    

    const emplois: IEmplois[] = [
        { label: 'Developpement web' },
        { label: 'Comptable' },
        { label: 'Administrateur reseau' }
    ]


    return (
        <div>
            <NavBar />
            {
                ((currentURL !== "/login") && (currentURL !== "/register") && (!url.includes(currentURL)) ) &&
                <div className="w-full py-10 bg-primary flex justify-center items-center">
                    <div className='flex flex-col space-y-5'>
                        <form className="space-x-1 flex justify-center">
                            <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={emplois}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Emploi" />}
                                />
                            </div>
                            <div>
                                <TextField id="outlined-basic" label="Ville" variant="outlined" style={{ width: 300 }} />
                            </div>
                            <div>
                                <Button variant="contained" size="large" className="h-14 !bg-secondary">
                                    Search
                                </Button>
                            </div>
                        </form>
                        <div className='flex space-x-2'>
                            <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={emplois}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Date à postuler" />}
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={emplois}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Type offre" />}
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={emplois}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Company" />}
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={emplois}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Location" />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header
