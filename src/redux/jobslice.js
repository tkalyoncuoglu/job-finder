import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filteredJobs: [],
  initialized: false,
};

const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.initialized = true;
      state.filteredJobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    // Arama terimine göre filtreleme
    filterBySearch: (state, action) => {
      // arama terimini küçük harfe çevirme(duyarlılığı ortadan kalfırmak için)
      const query = action.payload.toLowerCase();
      //aksiyon ile gelen arama terimiyle eşleşen objelerle yeni bir dizi oluştur
      const filtered = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );

      // store güncelleme
      state.filteredJobs = filtered;
    },
    // Duruma Göre Filtreleme
    filterByStatus: (state, action) => {
      // Aksiyonun payload değeriyle eşleşen işlerle yeni bir dizi oluştur
      state.filteredJobs = state.jobs.filter(
        (job) => job.status == action.payload
      );
    },
    filterByType: (state, action) => {
      state.filteredJobs = state.jobs.filter(
        (job) => job.type == action.payload
      );
    },
    filter: (state, action) => {
      const {search, status, type, sort} = action.payload;

      let filteredJobs = state.jobs;

      if(search !== ""){
        // arama terimini küçük harfe çevirme(duyarlılığı ortadan kalfırmak için)
        const query = search.toLowerCase();
        //aksiyon ile gelen arama terimiyle eşleşen objelerle yeni bir dizi oluştur
        filteredJobs = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query));
      }

      if(status !== "Seçiniz") {
        filteredJobs = filteredJobs.filter(
          (job) => job.status == status
        );
      }

      if(type !== "Seçiniz") {
        filteredJobs = filteredJobs.filter(
          (job) => job.type == type
        );
      }

      if(sort !== "Seçiniz") {
        switch (sort) {
          case "a-z":
            filteredJobs.sort((a, b) => {
              // eğerki a objesinin şirket ismi alfabede sıra olarak
              // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
              // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
              if (a.company < b.company) return -1;
              if (a.company > b.company) return 1;
              return 0;
            });
            break;
          case "z-a":
            filteredJobs.sort((a, b) => {
              // eğerki a objesinin şirket ismi alfabede sıra olarak
              // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
              // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
              if (a.company < b.company) return 1;
              if (a.company > b.company) return -1;
              return 0;
            });
  
          case "En Yeni":
            filteredJobs.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
  
          case "En Eski":
            filteredJobs.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
  
          default:
            break;
        }
  
      }


      state.filteredJobs = filteredJobs;










    },
    filterBySort: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.filteredJobs.sort((a, b) => {
            // eğerki a objesinin şirket ismi alfabede sıra olarak
            // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
            // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
            if (a.company < b.company) return -1;
            if (a.company > b.company) return 1;
            return 0;
          });
          break;
        case "z-a":
          state.filteredJobs.sort((a, b) => {
            // eğerki a objesinin şirket ismi alfabede sıra olarak
            // b'den gerideyse a objesini b'ye göre daha ön sıraya koy
            // ! sort dizideki bütün elemanlar için bu sorguyu gerçekleştitir
            if (a.company < b.company) return 1;
            if (a.company > b.company) return -1;
            return 0;
          });

        case "En Yeni":
          state.filteredJobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case "En Eski":
          state.filteredJobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

        default:
          break;
      }

      return state;
    },
    // filtreli temizle
    clearFilters: (state) => {
      state.filteredJobs = state.jobs;
    },
  },
});
export const {
  setJobs,
  addJob,
  filter,
  clearFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
