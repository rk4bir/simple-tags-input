// Utility function
function simpleTag(e, type, name, tagValue) {
    if (!e) return;

    // Creates event for the tag add/remove
    const eventOptions = {
        bubbles: true,
        cancelable: true,
        detail: { type, tagValue, element: e.target }
    };
    const event = new CustomEvent(name, eventOptions);
    document.dispatchEvent(event);
}

(function (options) {
    this.simpleTagsInput = function () {
        this.tags = [];
        this.searchItems = [];
        this.input = undefined;
        this.ul = undefined;
        this.bridgeID = Math.random().toString(29).substring(2) + new Date().getTime().toString() + Math.random().toString(29).substring(2);
        this.searchListEl = undefined;
        this.settings = (arguments[0] && typeof arguments[0] === 'object') ? arguments[0] : {};

        // initialize plugin
        if (setPluginParams.call(this)) {
            this.input.addEventListener("keydown", addTag.bind(this));
            createSearchListElElement.call(this);
            document.addEventListener(this.bridgeID, handleOutsidePluginTasks.bind(this));
            createTag.call(this);
        } else {
            throw new Error("simpleTagsInput: input or list element not found");
        }
    }

    simpleTagsInput.prototype.getTags = function () {
        /* Returns tags list */
        return this.tags;
    }

    simpleTagsInput.prototype.addTag = function (value) {
        /* Add a new tag to the list */
        const tag = value.replace(/\s+/g, '');
        if (tag.length > 1 && !this.tags.includes(tag)) {
            tag.split(',').forEach(tag => {
                this.tags.push(tag);
                createTag.call(this);
            });
        }
    }

    simpleTagsInput.prototype.removeTag = function (tag) {
        /* Remove tag from the list */
        const index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags = this.tags.filter((_, i) => i !== index);
            createTag.call(this);
        }
    }

    function setPluginParams() {
        /*
        * set plugin params, 
        * if required params were not set returns false, 
        * else return true
        */
        try {
            const { inputEl, listEl, autocompleteSearchList } = this.settings;

            this.searchItems = autocompleteSearchList || [];
            const _input = document.getElementById(inputEl);
            const _ul = document.getElementById(listEl);

            if (_input.tagName == "INPUT" && _ul.tagName == "UL") {
                this.input = _input;
                this.ul = _ul;
                this.ul.classList.add("tagsList");
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false
        }
    }

    function createSearchListElElement() {
        // create search list `ul` element and set to `this.searchListEl`
        const random_id = Math.random().toString(30).substring(2);
        const el = `<ul id="${random_id}" class='simple-tags-input-search-list' style='display: none'></ul>`
        this.input.insertAdjacentHTML("afterend", el);
        this.searchListEl = document.getElementById(random_id);
    }

    function createTag() {
        /* Create tags from `this.tags` */
        this.ul.innerHTML = this.tags.map(tag => {
            return `<li>${tag} <span onclick="simpleTag(event,'removeTag','${this.bridgeID}','${tag}')">X</span></li>`;
        }).join('');
    }

    function addTag(e) {
        /* Add tag / show auto complete search result -> from input element: `this.input` */
        const SPACE = " ";
        const ENTER = "Enter";
        if (e.key == SPACE || e.key == ENTER) {
            // insert new tag
            const tag = e.target.value.trim();
            if (tag.length > 1 && !this.tags.includes(tag)) {
                this.tags.push(tag);
                createTag.call(this);
            }
            e.target.value = "";
        } else {
            // autocomplete search
            const q = e.target.value.trim();
            if (q.length > 0) {
                autoCompleteSearch.call(this, e);
            } else {
                this.searchListEl.style.display = "none";
            }
        }
    }

    function autoCompleteSearch(e) {
        /* Handles auto complete search */
        const q = e.target.value;
        const results = this.searchItems.filter(item => item.toLowerCase().indexOf(q.toLowerCase()) != -1)
        let _html = "<p style='border-bottom: 1px solid lightgrey; margin-bottom: 0px; font-weight: bold; padding: 5px; font-style: italic '>Search Result:</p>";
        results.forEach(item => {
            _html += `<li onclick="simpleTag(event,'addTag','${this.bridgeID}','${item}')">${item}</li>`;
        });
        this.searchListEl.innerHTML = _html;

        this.searchListEl.style.display = (results.length == 0 ? "none" : "block");
    }

    function handleOutsidePluginTasks(e) {
        /*
        * Handles outside plugin tasks
        * Create/remove tag from outside of the plugin via event.
        */
        const { type, tagValue, element } = e.detail;
        if (type == "addTag") addTagFromOutside.call(this, tagValue);
        if (type == "removeTag") removeTagFromOutside.call(this, element, tagValue);
    }

    function addTagFromOutside(tag) {
        /* Add tag from outside of the plugin via event */
        this.input.value = "";
        this.searchListEl.style.display = "none";
        if (tag.length > 1 && !this.tags.includes(tag)) {
            this.tags.push(tag);
            createTag.call(this);
        }
    }

    function removeTagFromOutside(element, tag) {
        /* Remove tag from outside of the plugin via event */
        const index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags = this.tags.filter((_, i) => i !== index);
            element.parentElement.remove();
        }
    }
}());