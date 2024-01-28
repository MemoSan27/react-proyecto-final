import React from 'react'
import { useForm } from 'react-hook-form'
import './styles/FilterPrice.css'

const FilterPrice = ({ setPriceRange, setModalOpen }) => {

    const { register, handleSubmit, reset } = useForm()

    const submit = (data) => {

      const from = +data.from;
      const to = +data.to;

      setPriceRange({
        from,
        to: to === 0 ? Infinity : to,
      })

      reset({
        from: '',
        to: '',
      })
      window.scrollTo(0,0);
      setModalOpen(false);
    }

  return (
    <form onSubmit={handleSubmit(submit)} className='price'>
      <p className='price__title form__span'>Filter by Price</p>
      <hr />
      <br />
      <label>
        <span className='form__span span__price'>From:</span>
        <input {...register('from')} type='number' className="form__input" />
      </label>
      <label>
        <span className='form__span span__price'>To:</span>
        <input {...register('to')} type='number' className="form__input" />
      </label>
      <button className="form__submit filterBtn">Filter</button>
    </form>
  )
}

export default FilterPrice
