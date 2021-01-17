import { observable, action, computed, makeObservable } from  'mobx'

export class GeneralStore {
  constructor() {

    this.currentTab = 0

    makeObservable(this, {
      currentTab: observable,
      handleTabChange: action,
    })
  }

  handleTabChange = (event, value) => {
    this.currentTab = value
  }

}
