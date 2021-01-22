import { observable, action, computed, makeObservable } from  'mobx'

export class GeneralStore {
  constructor() {

    this.currentTab = 0
    this.profilePicDialog = false
    this.UserSeekTagEdit = false
    this.UserOfferTagEdit = false
    this.editName = false

    makeObservable(this, {
      currentTab: observable,
      handleTabChange: action,
      profilePicDialog: observable,
      openProfilePicDialog: action,
      closeProfilePicDialog: action,
      UserSeekTagEdit: observable,
      UserOfferTagEdit: observable,
      handleUserSeekTagEdit: action,
      handleUserOfferTagEdit: action,
      editName: observable,
      setEditName: action
    })
  }

  handleTabChange = (event, value) => {
    this.currentTab = value
  }

  openProfilePicDialog = () => {
    this.profilePicDialog = true
  }

  closeProfilePicDialog = () => {
    this.profilePicDialog = false
  }

  handleUserSeekTagEdit = () => {
    this.UserSeekTagEdit = !this.UserSeekTagEdit
  }

  handleUserOfferTagEdit = () => {
    this.UserOfferTagEdit = !this.UserOfferTagEdit
  }

  setEditName = (value) => {
    this.editName = value
  }

}
