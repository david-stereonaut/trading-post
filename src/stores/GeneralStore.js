import { observable, action, computed, makeObservable } from  'mobx'


export class GeneralStore {
  constructor() {

    this.currentTab = 0
    this.profilePicDialog = false
    this.UserSeekTagEdit = false
    this.UserOfferTagEdit = false
    this.editName = false
    this.ImageUploadDialog = false
    this.AddTradeCardDialog = false
    this.editTradeImageUrl = ''
    this.editTradeImageId = ''
    this.editTradeTitle = ''
    this.editTradeSubTitle = ''
    this.editTradeDescription = ''
    this.editTradeTags = []
    this.editTradeType = 'Offering'
    this.editTradeId = ''

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
      setEditName: action,
      ImageUploadDialog: observable,
      handleImageUploadDialog: action,
      AddTradeCardDialog: observable,
      handleAddTradeCardDialog: action,
      editTradeImageUrl: observable,
      editTradeImageId: observable,
      editTradeTitle: observable,
      editTradeSubTitle: observable,
      editTradeDescription: observable,
      editTradeTags: observable,
      editTradeType: observable,
      editTradeId: observable,
      handleEditTrade: action,
      removeEditTag: action,
      addEditTag: action
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

  handleImageUploadDialog = () => {
    this.ImageUploadDialog = !this.ImageUploadDialog
  }

  handleAddTradeCardDialog = () => {
    this.AddTradeCardDialog = !this.AddTradeCardDialog
  }

  handleEditTrade = (name, value) => {
    this[name] = value
  }

  removeEditTag = (tag) => {
    for(let i = 0; i < this.editTradeTags.length; i++) {
      if ( this.editTradeTags[i] === tag) { 
          this.editTradeTags.splice(i, 1); 
      }
    }
  }

  addEditTag = (tag) => {
    this.editTradeTags.push(tag)
  }
}
