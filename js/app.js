const app = new Vue (
    {
        el: "#root",
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            hiddenSideBar: true,
            openChatIndex: 0,
            openMenuIndex: -1,
            newMsg: {},
            searchParameter: ""
        },
        computed: {
            filteredContacts: function() {
                let mappedContacts = this.contacts.map((contact, i) => ({...contact, index : i}));
                let filteredContacts = mappedContacts.filter(contact => contact.name.toLowerCase().includes(this.searchParameter.toLowerCase()));
                return filteredContacts;
            },
        },
        methods: {
            isSend: function(msg) {
                return msg.status === "sent";
            },
            isReceived: function(msg) {
                return msg.status === "received";
            },
            isOpen: function(chatIndex) {
                return chatIndex === this.openChatIndex;
            },
            responseMsg: function() {
                let currentTime = new Date();
                let responseMsg = {
                    date: `${currentTime.toLocaleDateString('it-IT')} ${currentTime.toLocaleTimeString('it-IT')}`,
                    message: 'ok',
                    status: 'received'
                }
                this.contacts[this.openChatIndex].messages.push(responseMsg);
            },
            sendMsg: function() {
                if (this.newMsg.message) {
                    let currentTime = new Date();
                    this.newMsg.date = `${currentTime.toLocaleDateString('it-IT')} ${currentTime.toLocaleTimeString('it-IT')}`;
                    this.newMsg.status = "sent";

                    this.contacts[this.openChatIndex].messages.push(this.newMsg);
                    this.newMsg = {};

                    setTimeout(this.responseMsg, 2000);
                }
            },
            openMenu: function(i) {
                (this.openMenuIndex === -1) ? this.openMenuIndex = i : this.openMenuIndex = -1;
            },
            deleteMsg: function(index) {
                this.contacts[this.openChatIndex].messages.splice(index, 1);
            }
        }
    }
);