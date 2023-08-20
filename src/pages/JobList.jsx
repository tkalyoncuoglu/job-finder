import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import { setJobs } from "../redux/jobslice";

const JobList = () => {
  // Stora Abone Olmak için useSelector Kullanılır
  const state = useSelector((store) => store);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3030/jobs", { timeout: 5000 })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          alert("Bağlantı zaman aşımına uğradı");
        }
      });
  }, []);
  return (
    <div>
      <Filter />
      <h3 className="job-count">
        Bulunan ({state?.jobs.length}) iş arasından (
        {state?.filteredJobs.length}) tanesi görüntülüyoruz
      </h3>

      <section className="list-section">
        {!state.initialized ? (
          <p>Loading....</p>
        ) : (
          state.filteredJobs.map((job, i) => (
            <div key={i} className="job-card">
              <div className="head">
                <div className="letter">
                  <p>{job.company[0]}</p>
                </div>
                <div className="info">
                  <p>{job.position}</p>
                  <p>{job.company}</p>
                </div>
              </div>
              <div className="body">
                <div className="field">
                  <img src="/public/images/map.png" />
                  <p> {job.location} </p>
                </div>
                <div className="field">
                  <img src="/public/images/calendar.png" />
                  <p>{job.date}</p>
                </div>
                <div className="field">
                  <img src="/public/images/bag.png" />
                  <p>{job.type}</p>
                </div>
                <div className="status">
                  <button className={job.status}>{job.status}</button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default JobList;
