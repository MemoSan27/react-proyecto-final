import { useDispatch, useSelector } from "react-redux"
import { getProductsThunk } from "../store/slices/products.slice";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/HomePage/ProductCard";
import FilterCategory from "../components/HomePage/FilterCategory";
import FilterPrice from "../components/HomePage/FilterPrice";
import './styles/HomePage.css'
import Loading from "../components/Loading";


const HomePage = () => {

 const [ modalOpen, setModalOpen ] = useState(false); 
 const [ nameValue, setNameValue ] = useState('');
 const [ categorySelected, setCategorySelected ] = useState('all');
 const [ priceRange, setPriceRange ] = useState({
  from: 0,
  to: Infinity,
 })

 const products = useSelector(store => store.products);
 const dispatch = useDispatch();

 useEffect( () => {
  dispatch(getProductsThunk());
 }, []);

 const inputName = useRef();
 
 const handleInputName = () => {
  setNameValue(inputName.current.value.toLowerCase().trim());
 }

 const callBackFilter = (product) => {
  //Filtrado por nombre
  const filterName = product.title.toLowerCase().includes(nameValue);
  //Filtrado por tipo
  const filterCategory = categorySelected === 'all' ? true : categorySelected === product.category.id;
  //Filtrado por precio
  const price = +product.price;
  const filterPrice = (priceRange.from <= price) && (price <= priceRange.to); 
  return filterName && filterCategory && filterPrice;
 }

 const handleOpenModal = () =>{
  setModalOpen(!modalOpen);
 }

  return (
    <main className="mainer">
      { !products && <Loading /> }
      <div className="input__search container">
        <p className="input__p"> Find your items by name:</p>
        <div className="input__sup">
          <input ref={inputName} onChange={handleInputName} type="text" className="input" placeholder="Ej: Sams" /> 
          <i className='glass bx bx-search-alt-2' ></i>
        </div>
        <p className='modalFilter price__title form__span' onClick={handleOpenModal}> <i className='filterIcon bx bxs-filter-alt' ></i> <span> Filters </span>  </p>
      </div>

      <aside className={ modalOpen ? 'aside open' : 'aside'}>
        <h2>Filters</h2>
        <section className="filters">
          <FilterPrice 
            setPriceRange={setPriceRange}
            setModalOpen={setModalOpen}
          />
          <FilterCategory 
            setCategorySelected={setCategorySelected}
            setModalOpen={setModalOpen}
          />
          <i className='closeBtn bx bxs-x-square' onClick={handleOpenModal}></i>
        </section>
      </aside>
      <div className="cards container">
        {
          products?.filter(callBackFilter).map( product => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </main>
  )
}

export default HomePage
