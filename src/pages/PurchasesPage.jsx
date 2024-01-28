import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import './styles/Purchases.css'
import getConfigToken from '../utils/getTokenConfig'
import PurchaseCard from '../components/PurchasesPage/PurchaseCard'
import Loading from '../components/Loading'
import Pagination from '../components/PurchasesPage/Pagination'

const PurchasesPage = () => {

    const [page, setPage] = useState(1);  
  const [ purchases, getPurchases] = useFetch();

  useEffect( () => {
    const url = 'https://express-final-project.onrender.com/purchases'
    getPurchases(url, getConfigToken())
  }, [])

  //===== estados y variables de paginación=====
  const perPages = 5;
  const quantyPages = Math.ceil(purchases?.length / perPages);
  
  return (
    
    <div className='purchases container2'>
        { !purchases && <Loading /> }
        <h1 className='page__title cart__title'>My Purchases</h1>
        <div className='purchases__container'>
            <div className='purchase__top'>
                <p className='purchase__desc tableTop'>Product Image</p>
                <p className='purchase__desc tableTop'>Model</p>
                <p className='purchase__desc tableTop'>Quantity</p>
                <p className='purchase__desc tableTop'>Unit Price</p>
            </div>

            <section>
              {purchases?.[0] && <Pagination quantyPages={quantyPages} page={page} setPage={setPage}/>}
            </section> 
               
            {
                purchases?.map(purchase => (
                    <PurchaseCard 
                        key={purchase.id}
                        purchase={purchase}
                    />
                )).slice((page - 1)* perPages, (page - 1)* perPages + perPages)
            }

            <section>
              {purchases?.[0] && <Pagination quantyPages={quantyPages} page={page} setPage={setPage}/>}
            </section>

            {
                !purchases?.[0] &&
                (<><hr className='hr' /> <h1 className='page__title cart__title'> No articles in your history yet</h1></>)
            }
        </div>
    </div>
  )
}

export default PurchasesPage
