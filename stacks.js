var app = new Vue({
    el: '#app',
    data: {
        userName: "David",
        bookmarks: [
            { id: 0, title: "Stack1", links: [
                { id: 0, title: "DuckDuckGo", url: "https://duckduckgo.com/" }
            ]},
            { id: 1, title: "Stack2", links: [
                { id: 0, title: "David", url: "https://david.quotient.space/" }
            ]}
        ],
        newTitle: {},
        newUrl: {},
        editMode: false
    },
    mounted() {
      if (localStorage.getItem('bookmarks')) {
        try {
          this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        } catch(e) {
          localStorage.removeItem('bookmarks')
        }
      }
    },
    methods: {
        removeLink: function(n, i) {
            this.bookmarks[n].links.splice(i, 1)
            this.saveBookmarks()
        },
        addLink: function(n) {
            console.log(this.bookmarks)
            this.bookmarks[n].links.push({
                id: this.bookmarks[n].links.length,
                url: this.newUrl[n] || "",
                title: this.newTitle[n] || ""
            })
            this.saveBookmarks()
        },
        addStack: function() {
            this.bookmarks.push({
                id: this.bookmarks.length,
                title: "Stack" + this.bookmarks.length,
                links: []
            })
            this.saveBookmarks()
        },
        removeStack: function(n) {
            this.bookmarks.splice(n, 1)
            this.saveBookmarks()
        },
        saveBookmarks: function() {
            let parsed = JSON.stringify(this.bookmarks)
            localStorage.setItem('bookmarks', parsed)
        },
        toggleEdit: function() {
            this.editMode = !this.editMode
        }
    }
})