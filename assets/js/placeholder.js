const placeholder = {
    init: function() {
        console.log("placeholder.init()");
        placeholder.run();
    },

    loading: false,

    // à chaque intervalle on inverse la valeur de loading et on placeholderelle la méthode toggle()
    run: function() {
        window.setInterval(() => {
            placeholder.loading = !placeholder.loading;
            placeholder.toggle();
        }, 4000);
    },

    // selon la valeur de loading on affiche le placeholder et on cache le contenu, et inversement
    toggle: function() {
        if (placeholder.loading) {
            document.querySelectorAll(".box").forEach(el => el.className = "box hide");
            document.querySelectorAll(".box-placeholder").forEach(el => el.className = "box-placeholder show");
            return;
        }
        document.querySelectorAll(".box-placeholder").forEach(el => el.className = "box-placeholder hide");
        document.querySelectorAll(".box").forEach(el => el.className = "box show");
    }
}

export default placeholder;