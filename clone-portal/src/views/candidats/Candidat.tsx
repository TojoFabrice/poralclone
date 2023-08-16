
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom'

const Candidat = () => {
  const { users } = useSelector(({ auth }) => auth)
  const { candidat_infos } = useSelector(({candidat}) => candidat)

  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    if (candidat_infos) {
      setUserName(candidat_infos.user.user_name)
    }
  }, [candidat_infos])


  return (
    <div>
      <div className='w-full h-28 bg-gray-200 flex justify-center items-center text-3xl font-bold text-gray-700'>
        {
          userName ? userName : users?.user_name
        }
      </div>
      <div className='flex flex-col px-8 w-7/12 m-auto'>
        <div className='sidebar  my-4 py-4 '>
          <ul className='flex space-x-3'>
            <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary '>
              <Link to="/candidat/moncompte/dashbord" className='text-gray-600 hover:text-white'>Dashbord</Link>
            </li>
            <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
              <Link to="/candidat/moncompte/info-candidat" className='text-gray-600 hover:text-white'>Infos de contact</Link>
            </li>
            <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
              <Link to="/candidat/moncompte/password" className='text-gray-600 hover:text-white'>Mot de passe</Link>
            </li>
            <li className='border border-gray-200 w-40 text-center py-1 rounded-md hover:bg-secondary'>
              <Link to="/candidat/moncompte/candidatures" className='text-gray-600 hover:text-white'>Mes candidatures</Link>
            </li>
          </ul>
        </div>
        <div className='w-full pb-7'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Candidat
