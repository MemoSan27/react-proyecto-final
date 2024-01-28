import './styles/Pagination.css'

const Pagination = ({quantyPages, page, setPage}) => {

    const handlePrev = () => {
        window.scrollTo(0,0);
        setPage(page - 1);
    }

    const handleNext = () => {
        window.scrollTo(0,0);
        setPage(page + 1);
    }

    return (
       <div className='pages'>
            <div className='getPages'>
                <div className="btn__pages">{ page > 1 && <i onClick={handlePrev}  className='bx bx-chevrons-left bx-flip-vertical'></i>}</div>
                <p className="page">Page {page} of {quantyPages}</p>
                <div className="btn__pages">{ page < quantyPages && <i onClick={handleNext} className='bx bx-chevrons-right bx-flip-vertical'></i>}</div>
            </div>
       </div> 
    );
};

export default Pagination