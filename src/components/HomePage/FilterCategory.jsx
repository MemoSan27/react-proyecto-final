import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch'
import './styles/FilterCategory.css'

const FilterCategory = ({ setCategorySelected, setModalOpen }) => {

  const [ categories, getCategories ] = useFetch();

  useEffect( () => {
    const url = 'https://express-final-project.onrender.com/categories';
    getCategories(url);
  }, [])

  
  const handleCategory = (id) => {
    setCategorySelected(id);
    window.scrollTo(0,0);
    setModalOpen(false);
  }

  return (
    <section className='categories'>
      <h3 className='price__title form__span'> Filter by Categories </h3>
      <hr />
      <br />
      <ul>
        <li className='form__span span__price mt li' onClick={() => handleCategory('all')}> All Categories </li>
        {
            categories?.map( category => (
                <li className='form__span span__price mt li' onClick={() => handleCategory(category.id)} key={category.id}>{category.name}</li>
            ))
        }
      </ul>
    </section>
  )
}

export default FilterCategory
