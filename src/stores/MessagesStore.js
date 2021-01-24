import { observable, action, computed, makeObservable } from  'mobx'
import { act } from 'react-dom/test-utils';
import io from 'socket.io-client';
const axios = require('axios');
const moment = require('moment');

export class MessagesStore {
    constructor() {
        //inserting dummy userId (change way to get it)
        this.userId = '60045b1519f39a2c9c46c63e';
        this.category = 'Active barters';
        this.displayedCons = [];
        this.currentConId = '';
        this.newMessage = '';
        this.reviewPopup = false;
        this.generalPopup = false;
        this.textPopup = false;
        this.partnerTyping = false;
        this.declineMessage = '';
        this.socket = io('http://localhost:4000');
        this.initiateSocket();
        this.manageSocket();

        makeObservable(this, {
            userId: observable,
            category: observable,
            displayedCons: observable,
            currentConId: observable,
            newMessage: observable,
            reviewPopup: observable,
            generalPopup: observable,
            textPopup: observable,
            declineMessage: observable,
            partnerTyping: observable,
            getCons: action,
            changeCategory: action,
            chooseCon: action,
            typeMessage: action,
            sendMessage: action,
            updateAndClosePopup: action,
            updateStatus: action,
            closePopup: action,
            popUpReview: action,
            revealGeneralPopup: action,
            revealTextPopup: action,
            changeUser: action,
            manageSocket: action
        })
    }

    async getCons(category) {
        const cons = await axios.get(`http://localhost:3001/conversations/${this.userId}`);
        const results = cons.data.conversations;
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
            case 'Cancelled barters': consToDisplay = results.filter(r => r.status === 'Cancelled' || r.status === 'Declined');
            break;  
            case 'Declined barters': consToDisplay = results.filter(r => r.status === 'Cancelled' || r.status === 'Declined');
            break;  
        }
        consToDisplay.sort(function(a, b) {
            return moment(b.messages[b.messages.length - 1].message_time) - moment(a.messages[a.messages.length - 1].message_time);
          });
        this.displayedCons = consToDisplay;
    }

    changeCategory (category) {
        this.category = category;
        this.currentConId = '';
        this.getCons(this.category);
    }

    chooseCon = conId => this.currentConId = conId;

    typeMessage(text) {
        this.newMessage = text;
        const typingInfo = {
            conversation: this.currentConId,
            text: text
        }
        this.socket.emit('IAmTyping', typingInfo);
    }

    typeDeclineMessage = text => this.declineMessage = text;

    async sendMessage() {
        if (this.newMessage === '') {return}
        const message = {
            senderId: this.userId,
            message_time: moment(),
            body: this.newMessage,
            tradeCard: null
        }
        const conMessages = await axios.post(`http://localhost:3001/conversations/${this.currentConId}`, message);
        this.socket.emit('sendMessage', conMessages.data);
        this.newMessage = '';
    }

    async sendSystemMessage(newStatus) {
        console.log(newStatus);
        const userFirstName = this.displayedCons[0].users.find(u => u._id === this.userId).firstName;
        let text = '';
        switch (newStatus) {
            case 'Active': text = `${userFirstName} confirmed the request. This barter is active!`;
            break;
            case 'Completed': text = `${userFirstName} closed the barter`;
            break;
            case 'Cancelled': text = `${userFirstName} cancelled the barter`;
            break;
            case 'Declined': text = `${userFirstName} declined the request`;
            break;
        }

        const systemMessage = {
            senderId: 'system message',
            message_time: moment(),
            body: text,
            tradeCard: null
        }
        const conMessages = await axios.post(`http://localhost:3001/conversations/${this.currentConId}`, systemMessage);
        this.socket.emit('sendMessage', conMessages.data);
    }

    async updateAndClosePopup(status, popup) {
        await this.updateStatus(status);
        this[popup] = false;
    }

    async updateStatus(status) {

        this.sendSystemMessage(status)

        const statusToUpdate = {status: status}
        const updatedCon = await axios.put(`http://localhost:3001/conversations/${this.currentConId}`, statusToUpdate);
        // const newStatus = updatedCon.data.status;
        // this.displayedCons.find(d => d._id === this.currentConId).status = newStatus;
        // const conId = this.currentConId;
        // this.changeCategory(`${status} barters`);
        // this.chooseCon(conId);

        // const updatedInfo = {
        //     conId: this.currentConId,
        //     newStatus: newStatus
        // }
        this.socket.emit('changeStatus', updatedCon.data);
    }

    closePopup = popup => this[popup] = false;

    popUpReview = () => this.reviewPopup = true; 

    revealGeneralPopup = () => this.generalPopup = true;

    revealTextPopup = () => this.textPopup = true;

    changeUser = () => {
        if (this.userId === '60045b1519f39a2c9c46c63e') {    
            this.userId = '6004588a19f39a2c9c46c63d';
        } 
        else {
            this.userId = '60045b1519f39a2c9c46c63e';
        }
        this.getCons('Active');
    }

    initiateSocket = () => {
        this.socket.on('connect', data => {
            const userId = {
                _id: this.userId
            }
            this.socket.emit('join', userId);
        });
    }

    manageSocket = () => {
        this.socket.on('partnerTyping', data => {
            if (this.currentConId !== data.conversation) {return}
            this.partnerTyping = data.text === '' ? false : true;
        });

        this.socket.on('getMessage', data => {
        const messages = data.messages;
        if (this.displayedCons.every(d => d._id !== data._id)) {return}
        this.displayedCons.find(d => d._id === data._id).messages.push(messages[messages.length - 1]);
        if (this.currentConId !== data._id){return}
        this.partnerTyping = false;
        });

        this.socket.on('statusChanged', data => {
            const newStatus = data.status;
            if (this.displayedCons.every(d => d._id !== data._id)) {return}
            this.displayedCons.find(d => d._id === data._id).status = newStatus;
            if (this.currentConId !== data._id){return}
            const conId = this.currentConId;
            this.changeCategory(`${newStatus} barters`);
            this.chooseCon(conId);
        })
    }

}