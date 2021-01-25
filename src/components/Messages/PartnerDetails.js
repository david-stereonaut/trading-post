import { Avatar, makeStyles, Paper, Typography, Divider } from '@material-ui/core';
import { observer, inject } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    partner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        height: 60,
        padding: 10,
        cursor: 'pointer'
    },
    partnerText: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5
    },
    largeAvatar: {
        height: '50px',
        width: '50px'
    },
}))

const PartnerDetails = inject('MessagesStore')(observer((props) =>  {

    const { MessagesStore } = props;

    const partner = props.partner;
    const partnerTyping = props.partnerTyping
    const shortedMessage = props.lastMessage.length > 34 ? props.lastMessage.substring(0, 33) + '...' : props.lastMessage

    const chooseCon = () => MessagesStore.chooseCon(props.conId);

    const classes = useStyles()

    return (
        <>
        <Divider style={{width: 370}} />
        <div className ={classes.partner}  onClick = {chooseCon}>
            <Avatar src = {partner.profilePic.imageUrl} className={classes.largeAvatar} />
            <div className ={classes.partnerText}>
            <Typography variant='body1' style={{fontWeight: 500}}>{`${partner.firstName} ${partner.lastName}`}</Typography>
            {MessagesStore.category !== 'All barters' && partnerTyping === false && <Typography variant='subtitle1'>{shortedMessage}</Typography>}
            {MessagesStore.category === 'All barters' && partnerTyping === false && <Typography variant='subtitle1'>{props.status}</Typography>}
            {partnerTyping === true && <Typography variant='subtitle2'>{partner.firstName}'s typing...</Typography>}
            </div>
        </div>
        </>
    )
}))

export default PartnerDetails;