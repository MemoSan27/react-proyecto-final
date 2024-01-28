import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import ProductCard from "../HomePage/ProductCard"
import './styles/SimilarProducts.css'

const SimilarProducts = ({ categoryId, idProd }) => {

  const [ productsByCategory, getProductsByCategory ] = useFetch()

  useEffect( () => {
    if(categoryId){
        const url = `https://express-final-project.onrender.com/products?categoryId=${categoryId}`;
        getProductsByCategory(url)
    }
  }, [categoryId])

  return (
    <article className="similar">
      <h2 className="similar__title"> Similar Products </h2>
      <div className="similar__container">
        {
            productsByCategory?.filter( product => product.id !== idProd).map( product => (
                <ProductCard 
                    key={product.id}
                    product={product}
                />
            ))
        }
      </div>
    </article>
  )
}

export default SimilarProducts
