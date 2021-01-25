import { observer, inject } from 'mobx-react';
import { Link } from "react-router-dom";
import Buttons from './Buttons';
const moment = require('moment');

const ConHeader = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props;
  const conversation = MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId);
  const partner = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId) : {};
  const profileAddress = `/profile/${partner._id}`;
  const status = MessagesStore.userCons[0] ? conversation.status : null;
  const numOfMessages = MessagesStore.userCons[0] ? conversation.messages.length - 1 : null;
  const firstSender = MessagesStore.userCons[0] && conversation.messages[0] ? conversation.messages[0].senderId : null;
  const activationDate = MessagesStore.userCons[0] && conversation.messages[1] ? moment(conversation.messages.find(m => m.senderId === 'sestem message')).format('DD/MM/YYYY') : null;
  const requestDate = MessagesStore.userCons[0] ? moment(conversation.messages[0].message_time).format('DD/MM/YYYY') : null;
  const endDate = MessagesStore.userCons[0] ? moment(conversation.messages[numOfMessages].message_time).format('DD/MM/YYYY') : null;

  let statusText = '';
  switch (status) {
    case 'Active': statusText = `Active barter since ${activationDate}`;
    break;
    case 'Pending': firstSender === MessagesStore.userId ? statusText = `Request from ${requestDate}` : statusText = `Offer from ${requestDate}`;
    break;
    case 'Completed': statusText = `Completed barter since ${endDate}`;
    break;
    case 'Cancelled': statusText = `Cancelled barter since ${endDate}`;
    break;
  }

  return (
    <div id = "cons-header">
      <div id = "current-partner-details">
        <Link to = {profileAddress}><img src = {partner.profilePic ? partner.profilePic.imageUrl : ''} id = "current-partner-pic"/></Link>
        <Link to = {profileAddress}><h2 id = "current-partner-name">{`${partner.firstName} ${partner.lastName}`}</h2></Link>
        <h5 id = "status-text">{statusText}</h5>
        <h3 id = {conversation.partnerTyping === true ? "visible-typing-text" : "hidden-typing-text"} >{partner.firstName}`s typing...</h3>
      </div>
        <Buttons/>
    </div>
  )
}))

export default ConHeader;