const Offer = {
    data() {
        return {
            "person": {},
            "offers": [
                {
                    "id": 1,
                    "name": "Janet Doe",
                    "salary": 120000,
                    "bonus": 9000,
                    "company": "EY",
                    "offerDate": "2021-09-08"
                },
                {
                    "id": 2,
                    "name": "Jordan Doe",
                    "salary": 80000,
                    "bonus": 2000,
                    "company": "IU",
                    "offerDate": "2021-08-09"
                }
            ],
            books: [],
            selectedbook: null,
            bookForm: {}
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
                .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            console.log("A");
            fetch('https://randomuser.me/api/')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    console.log("C");
                    this.person = responseJson.results[0];
                })
                .catch((err) => {
                    console.error(err);
                })
            console.log("B");
        },
        fetchBooksData() {
            fetch('/api/books/')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.books = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        postBook(evt) {
            if (this.selectedbook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
        postNewBook(evt) {

            fetch('api/books/create.php', {
                method: 'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.bookForm = json;

                    // reset the form
                    this.bookForm = {};
                    this.fetchBooksData();

                });
        },
        postEditBook(evt) {
            this.bookForm.id = this.selectedbook.id;
            // this.bookForm.id = this.selectedOffer.id;

            console.log("Updating!", this.bookForm);

            fetch('api/books/update.php', {
                method: 'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.bookForm = json;

                    // reset the form
                    this.resetbookForm();
                    this.fetchBooksData();
                });
        },
        postDeletedBook(b) {
            if (!confirm("Are you sure you want to delete the offer from " + b.title + "?")) {
                return;
            }
            console.log("Delete!", b);

            fetch('api/books/delete.php', {
                method: 'POST',
                body: JSON.stringify(b),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.bookForm = json;

                    // reset the form
                    this.resetbookForm();
                    this.fetchBooksData();
                });
        },
            selectbookToEdit(b) {
                this.selectedbook = b;
                this.bookForm = Object.assign({}, this.selectedbook);
            },
            resetbookForm() {
                this.selectedbook = null;
                this.bookForm = {};
            },
        },

        created() {
            this.fetchBooksData();
        } //end created
    } // end Offer config
  
Vue.createApp(Offer).mount('#offerApp');