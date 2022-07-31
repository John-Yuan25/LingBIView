import { defineStore } from "pinia";

export const useCurrStore = defineStore({
  id: "currStore",
  state: () => ({
    currStoreId: "",
    type: "",
    currCompShow: false,
    Allcomponents: <any>[],
  }),
  getters: {},
  actions: {},
//   persist: true,
  // persist: {
  //   key: "currStore",
  //   storage: window.sessionStorage, ////保存的位置,默认是localstorage
  // },
});

export default useCurrStore;
