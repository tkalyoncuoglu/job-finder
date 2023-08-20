import { v4 } from "uuid";
import { addJob } from "../redux/jobslice";
import { useDispatch } from "react-redux";
import { typeOptions, statusOptions } from "../constant";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSumbit = (e) => {
    e.preventDefault();
    // Formun Son Halini Verecek Bir Form Verisi OLuşturma
    const formData = new FormData(e.target);
    // Form Verilerinden Obje Oluşturma
    const dataObj = Object.fromEntries(formData);
    // Objeye İd Ekleme
    dataObj.id = v4();
    dataObj.date = new Date().toLocaleString();
    //! 1. Adım API'yi Güncelleme
    axios.post("http://localhost:3030/jobs", dataObj).then(() => {
      // Store Güncelle
      dispatch(addJob(dataObj));
      // Anasayfaya Yönlendir
      navigate("/");
      // Bildirim Göster
      toast.info("Başarıyla Eklendi!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  };
  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSumbit}>
        <div className="field">
          <label>Pozisyon</label>
          <input name="position" type="text" />
        </div>
        <div className="field">
          <label>Şirket</label>
          <input name="company" type="text" />
        </div>
        <div className="field">
          <label>Lokasyon</label>
          <input name="location" type="text" />
        </div>
        <div className="field">
          <label>Durum</label>
          <select name="status">
            {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Tür</label>
          <select name="type">
            {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button className="button">Ekle</button>
      </form>
    </div>
  );
};

export default AddJob;
