import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"

const Recruteur = () => {
    const { users } = useSelector(({ auth }) => auth)


    return (
        <>
            <div className='w-full h-28 bg-gray-200 flex justify-center items-center text-3xl font-bold text-gray-700'>
                {
                    users?.user_name
                }
            </div>
            <div className='flex flex-col px-8 w-7/12 m-auto'>
                <div className='sidebar  my-4 py-4 '>
                    <ul className='flex space-x-3'>
                        <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary '>
                            <Link to="/recruteur/dashbord" className='text-gray-600 hover:text-white'>Dashbord</Link>
                        </li>
                        <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
                            <Link to="/recruteur/profil" className='text-gray-600 hover:text-white'>Profil</Link>
                        </li>
                        <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
                            <Link to="/recruteur/annonce" className='text-gray-600 hover:text-white'>Mes annonces</Link>
                        </li>
                        <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
                            <Link to="/recruteur/candidatures" className='text-gray-600 hover:text-white'>Candidatures reçu</Link>
                        </li>
                        <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
                            <Link to="/recruteur/add-annonce" className='text-gray-600 hover:text-white'>Ajouter une annonce</Link>
                        </li>
                    </ul>
                </div>
                <div className='w-full pb-7'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Recruteur