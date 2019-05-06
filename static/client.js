window.addEventListener('load', () => {

    const socket = io();

    Vue.component('chat', {
        props: [
            'chat'
        ],

        template: `
            <div id="chat">
                <div v-for="c of chat">
                    <p><img v-bind:src="c.Flag"/><strong>{{c.Id}} :</strong>{{c.Message}}</p>
                </div>
            </div>
        `,

        updated() {
            let wrapper = document.getElementById('chat');
            wrapper.scrollTop = wrapper.scrollHeight;
        }
    });

    Vue.component('message', {

        props: [
            'send'
        ],

        data() {
            return {
                message: ''
            }
        },

        methods: {
            onKeyDown(e) {
                if (e.keyCode === 13) {
                    this.sendMessage();
                }
            },

            sendMessage() {
                if (this.message !== '') {
                    this.send(this.message);
                    this.message = '';

                }
            }
        },

        template: `
            <div class="message">
                <input type="text" v-model="message" v-on:keydown="onKeyDown">
                <button type="button" v-on:click="sendMessage">Gönder</button>
            </div>
        `

    });

    const app = new Vue({
        el: '#app',
        data: {
            languageCode: '',
            chat: []
        },

        methods: {
            getAllMessages() {
                socket.emit('getAllMessages');
            },

            sendMessage(message) {

                socket.emit('sendMessage', {
                    Message: message,
                    Flag: this.languageCode
                });
            }
        },

        mounted() {

            let code = (navigator.language || navigator.userLanguage).split('-');
            this.languageCode = code[code.length-1];

            socket.on('message', (data) => {
                this.chat = data;
            });

            this.getAllMessages();
        }
    });

});