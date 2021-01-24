import { observable, action, computed, makeObservable } from 'mobx'
import axios from 'axios'
export class MapStore {
  constructor() {

    this.currentInfoWindow = {}
    
    makeObservable(this, {
      currentInfoWindow: observable,
      setCurrentInfoWindow: action
    })
  }
  
  setCurrentInfoWindow = (trade) => {
    this.currentInfoWindow = trade
  }
  
}