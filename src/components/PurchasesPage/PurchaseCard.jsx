import { useNavigate } from 'react-router-dom'
import './styles/PurchaseCard.css'

const PurchaseCard = ({ purchase }) => {

    
    const navigate = useNavigate()
    const handleNavigate = () =>{
        window.scrollTo(0,0);
        navigate(`/product/${purchase.product.id}`)
    }

    
    return (
    <>
        
        <article className='purchase__card' onClick={handleNavigate}>
        <header className='purchase__card-imgCont'>
            <img className='purchase__card-img' src={purchase.product.images?.[0].url} alt='Img Purchase' />
            
        </header>
        <h3 className='purchase__desc'>{purchase.product.title}</h3>
        <div className='purchace__quantity-box'>
            <p className='purchase__desc quant'>{purchase.quantity}</p>
        </div>
        <p className='purchase__desc'>$ {purchase.product.price}</p>
        </article>
    </>
  )
}

export default PurchaseCard
