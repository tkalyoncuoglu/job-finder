import { useDispatch } from "react-redux";
import { sortOptions, typeOptions, statusOptions } from "../constant";
import {
  filterBySearch,
  filterByStatus,
  filterByType,
  filterBySort,
  clearFilters,
} from "../redux/jobslice";
const Filter = () => {
  const dispatch = useDispatch();

  // İnput Her Değiştiğinde Çalışır
  const handleChange = (e) => {
    dispatch(filterBySearch(e.target.value));
    console.log(e.target.value);
  };
  // durum select'i değişince çalışır
  const handleStatus = (e) => {
    dispatch(filterByStatus(e.target.value));
  };
  // type select'i değişince çalışır

  const handleType = (e) => {
    dispatch(filterByType(e.target.value));
  };

  // Sıralamayı ele alır
  const handleSort = (e) => {
    dispatch(filterBySort(e.target.value));
  };
  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div className="field">
          <label htmlFor="">Arama</label>
          <input onChange={handleChange} type="text" />
        </div>
        <div className="field">
          <label>Durum</label>
          <select onChange={handleStatus}>
            <option hidden>Seçiniz</option>
            {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Tip</label>
          <select onChange={handleType}>
            <option hidden>Seçiniz</option>
            {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Sırala</label>
          <select onChange={handleSort}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <button onClick={() => dispatch(clearFilters())} className="button">
          Filtreleri Temizle
        </button>
      </form>
    </section>
  );
};

export default Filter;
