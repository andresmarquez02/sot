function data(){
    return {
        aside: '-left-60 lg:left-0',
        title_bar: 'left: 0',
        bar: 'mdi-view-sequential',
        offline: 0,
        online: 0,
        internet: "mdi-wifi",
        date: new Date(),
        init(){
            window.addEventListener("load",() => {
                document.querySelector("#loading").classList = "loading hidden";
            });
            setInterval(() => {
                if(window.navigator.onLine == false){
                    if(this.online == 0){
                        alertify.notify("No estas conectado a internet");
                        this.online++;
                        this.internet = "mdi-wifi-off";
                    }
                }
                else{
                    if(this.offline == 0){
                        alertify.notify("Conectado a internet");
                        this.offline++;
                        this.internet = "mdi-wifi";
                    }
                    
                }
            }, 5000);
        },
        aside_bar: function (){
            if(this.aside !== "left-0"){
                this.aside = "left-0";
                this.title_bar = "left: -100%";
                this.bar = 'mdi-close';
            }
            else{
                this.aside = "-left-60 lg:left-0";
                this.title_bar = "left: 0";
                this.bar = 'mdi-view-sequential';
            }
        }
    }
}
// Turbolinks.visit("/Proyectos.html", { action: "replace" });
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Registro de sw exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw DE ANDRESIILLOO', err))
}