import { observable, action, computed, makeObservable } from  'mobx'
const axios = require('axios');

export class MessagesStore {
    constructor() {
        //inserting dummy userId (change way to get it)
        this.userId = '6004588a19f39a2c9c46c63d';
        this.category = 'Active barters';
        this.displayedCons = [];
        this.currentConId = '';
        this.newMessage = '';

        makeObservable(this, {
            userId: observable,
            category: observable,
            displayedCons: observable,
            currentConId: observable,
            newMessage: observable,
            getCons: action,
            changeCategory: action,
            chooseCon: action
        })
    }

    async getCons(category) {
        const cons = await axios.get(`http://localhost:3001/conversations/${this.userId}`);
        const results = cons.data;
        let consToDisplay = [];
        switch (category) {
            case 'All barters': consToDisplay = results;
            break;
            case 'Requests': consToDisplay = results.filter(r => r.status === 'Pending' && r.messages[0].senderId === this.userId);
            break;
            case 'Offers': consToDisplay = results.filter(r => r.status === 'Pending' && r.messages[0].senderId !== this.userId);
            break;
            case 'Active barters': consToDisplay = results.filter(r => r.status === 'Active');
            break;
            case 'Completed barters': consToDisplay = results.filter(r => r.status === 'Completed');
            break;
            case 'Cancelled barters': consToDisplay = results.filter(r => r.status === 'Cancelled');
            break;  
        }
        this.displayedCons = consToDisplay;
    }

    changeCategory = category => this.category = category; 

    chooseCon = conId => {
        this.currentConId = conId;
        console.log(this.currentConId);
    }
}