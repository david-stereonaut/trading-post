import { observable, action, computed, makeObservable } from  'mobx'
import { act } from 'react-dom/test-utils';
import io from 'socket.io-client';
const axios = require('axios');
const moment = require('moment');

export class MessagesStore {
    constructor() {
        //inserting dummy userId (change way to get it)
        this.userId = '';
        this.category = 'Active barters';
        this.userCons = [];
        this.currentConId = '';
        this.newMessage = '';
        this.reviewPopup = false;
        this.generalPopup = false;
        this.textPopup = false;
        this.declineMessage = '';
        this.socket = io('http://localhost:4000', {autoConnect: false});
        this.initiateSocket();
        this.manageSocket();

        makeObservable(this, {
            userId: observable,
            category: observable,
            userCons: observable,
            currentConId: observable,
            newMessage: observable,
            reviewPopup: observable,
            generalPopup: observable,
            textPopup: observable,
            declineMessage: observable,
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
            // changeUser: action,
            manageSocket: action,
            setUserId: action,
            signOut: action
        })
    }

    async getCons() {
        const cons = await axios.get(`http://localhost:3001/conversations/${this.userId}`);
        const results = cons.data.conversations;
        results.forEach(c => c.partnerTyping = false);
        results.sort(function(a, b) {
            return moment(b.messages[b.messages.length - 1].message_time) - moment(a.messages[a.messages.length - 1].message_time);
        });
        this.userCons = results;
    }

    changeCategory (category) {
        this.category = category;
        // this.currentConId = '';
        this.getCons();
    }

    chooseCon = conId => this.currentConId = conId;

    typeMessage(text) {
        this.newMessage = text;
        const typingInfo = {
            conversation: this.currentConId,
            partnerId : this.userCons.find(d => d._id === this.currentConId).users.find(u => u._id !== this.userId)._id,
            text: text
        }
        console.log(typingInfo);
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
        const userFirstName = this.userCons[0].users.find(u => u._id === this.userId).firstName;
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
        const data = {
            conversation: updatedCon.data,
            partnerId: updatedCon.data.users.find(u => u !== this.userId)
        }
        this.socket.emit('changeStatus', data);
    }

    popUpReview = () => this.reviewPopup = true; 
    
    revealGeneralPopup = () => this.generalPopup = true;
    
    revealTextPopup = () => this.textPopup = true;
    
    closePopup = popup => this[popup] = false;
    
    // changeUser = () => {
    //     if (this.userId === '60045b1519f39a2c9c46c63e') {    
    //         this.userId = '6004588a19f39a2c9c46c63d';
    //     } 
    //     else {
    //         this.userId = '60045b1519f39a2c9c46c63e';
    //     }
    //     this.getCons('Active');
    // }

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
            if (this.userCons.every(d => d._id !== data.conversation)) {return}
            this.userCons.find(d => d._id === data.conversation).partnerTyping = data.text === '' ? false : true;
        });

        this.socket.on('getMessage', data => {
        const messages = data.messages;
        if (this.userCons.every(d => d._id !== data._id)) {return}
        const conversation = this.userCons.find(d => d._id === data._id);
        conversation.messages.push(messages[messages.length - 1]);
        conversation.partnerTyping = false;
        // if (this.currentConId !== data._id){return}
        });

        this.socket.on('statusChanged', data => {
            const newStatus = data.status;
            if (this.userCons.every(d => d._id !== data._id)) {return}
            this.userCons.find(d => d._id === data._id).status = newStatus;
            if (this.currentConId !== data._id){return}
            this.changeCategory(`${newStatus} barters`);
        })
    }

    setUserId = (id) => {
        this.userId = id;
        this.socket.close();
        this.socket.open();
    }

    signOut() {
        this.userId = '';
        this.category = 'Active barters';
        this.userCons = [];
        this.currentConId = '';
        this.newMessage = '';
        this.reviewPopup = false;
        this.generalPopup = false;
        this.textPopup = false;
        this.declineMessage = '';
        this.socket = io('http://localhost:4000');
    }
}