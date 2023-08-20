import { useDispatch } from "react-redux";
import { sortOptions, typeOptions, statusOptions } from "../constant";
import {
  filter,
  clearFilters,
} from "../redux/jobslice";
import { useState } from "react";



const Filter = () => {

  const [values, setValues] = useState({search : "", status : "Seçiniz", type : "Seçiniz", sort : "Seçiniz"})


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filter(values));
  }

  // Sıralamayı ele alır
  const handleSort = (e) => {
    dispatch(filterBySort(e.target.value));
  };
  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">Arama</label>
          <input value={values.search} onChange={(e) => setValues({...values, search : e.target.value})} type="text" />
        </div>
        <div className="field">
          <label>Durum</label>
          <select value={values.status} onChange={(e) => setValues({...values, status : e.target.value})}>
            <option hidden>Seçiniz</option>
            {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Tip</label>
          <select value={values.type} onChange={(e) => setValues({...values, type : e.target.value})}>
            <option hidden>Seçiniz</option>
            {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Sırala</label>
          <select value={values.sort} onChange={(e) => setValues({...values, sort : e.target.value})}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <button onClick={() => dispatch(clearFilters())} className="button">
          Filtreleri Temizle
        </button>
        <button type="submit" className="button">Filtrele</button>
      </form>
    </section>
  );
};

export default Filter;
