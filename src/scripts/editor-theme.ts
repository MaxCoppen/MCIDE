export default class editorTheme {
    /**
     * @constructor
     */
    constructor() {}

    // Turn on the dark theme.
    setDarkTheme() {
        var darkThemeLinkEl;
        if (document.querySelector('#theme-style') == null) {
            darkThemeLinkEl = document.createElement('link')
        } else {
            darkThemeLinkEl = document.querySelector('#theme-style')
        }

        if (darkThemeLinkEl) {
            darkThemeLinkEl.setAttribute('rel', 'stylesheet')
            darkThemeLinkEl.setAttribute('href', './themes/dark-theme.css')
            darkThemeLinkEl.setAttribute('id', 'theme-style')
            const docHead = document.querySelector('head')
            if (docHead)
                docHead.append(darkThemeLinkEl)
        }
    }

    // Turn on the light theme.
    setLightTheme() {
        var darkThemeLinkEl;
        if (document.querySelector('#theme-style') == null) {
            darkThemeLinkEl = document.createElement('link')
        } else {
            darkThemeLinkEl = document.querySelector('#theme-style')
        }

        if (darkThemeLinkEl) {
            darkThemeLinkEl.setAttribute('rel', 'stylesheet')
            darkThemeLinkEl.setAttribute('href', './themes/light-theme.css')
            darkThemeLinkEl.setAttribute('id', 'theme-style')
            const docHead = document.querySelector('head')
            if (docHead)
                docHead.append(darkThemeLinkEl)
        }
    }

    // Switch the theme.
    darkThemeSwitch() {
        var darkThemeLinkEl;
        if (document.querySelector('#theme-style') == null) {
            darkThemeLinkEl = document.createElement('link')
        } else {
            darkThemeLinkEl = document.querySelector('#theme-style')
        }

        if (darkThemeLinkEl) {
            const theme = darkThemeLinkEl.getAttribute('href')
            if (theme == './themes/dark-theme.css') {
                this.setLightTheme()
            } else {
                this.setDarkTheme()
            }
        }
    }
}