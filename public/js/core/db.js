const indexedDB = window.indexedDB;
if(indexedDB){
    window.db;
    const req = indexedDB.open('tasks',1);
    req.onsuccess = ()=>{
        db = req.result;
        console.log("OPEN",db);
    };
    req.onupgradeneeded = ()=>{
        db = req.result;
        console.log("CREATE",db);
        const objectStore = db.createObjectStore("tasks",{
            autoIncrement: true
        })
        const objectStore2 = db.createObjectStore("projects",{
            autoIncrement: true
        })
    };
    req.onerror = (error)=>{
        console.log("ERROR",error);
    };
    // Proyectos
    window.createProject = (project) => {
        
        const transaction = window.db.transaction(["projects"],'readwrite');
        const objectStore = transaction.objectStore('projects');
        const req = objectStore.add({project});
        req.onsuccess = () => {
            
        }
    }
    window.Projects = () => {
        
        const transaction = window.db.transaction('projects');
        const objectStore = transaction.objectStore('projects');
        const req = objectStore.openCursor();

        window.mis_proyectos = [];
        req.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                window.mis_proyectos.push({
                    "id": cursor.key,
                    "project": cursor.value
                });
                cursor.continue();         
            }
            
        }  
    }
    window.editProject = [];
    window.editProjects = () => {
        
        const transaction = window.db.transaction(["projects"],'readwrite');
        const objectStore = transaction.objectStore('projects');
        const req = objectStore.get(parseInt(localStorage.getItem('project')));
        
        req.onsuccess = () => {
            window.editProject = req;
            
        }
    }
    
    window.updateProject = (project) => {
        
        const transaction = window.db.transaction(["projects"],'readwrite');
        const objectStore = transaction.objectStore('projects');
        const req = objectStore.put({project});
        objectStore.delete(parseInt(localStorage.getItem('project')));  
        localStorage.removeItem('project');
        req.onsuccess = () => {
            
        }
    }

    window.deleteProject = (id) => {
        
        const transaction = window.db.transaction(["projects"],'readwrite');
        const objectStore = transaction.objectStore('projects');
        const req = objectStore.delete(parseInt(id));
        
        req.onsuccess = () =>{
            alertify.success("Proyecto eliminado con exito.");
            
        }
        req.onerror = () =>{
            
            alertify.error("Error inesperado.");
        }


    }

    // ------------------
    // Tareas
    // ------------------
    window.createTask = (project,task,importance) => {
        
        const transaction = window.db.transaction(["tasks"],'readwrite');
        const objectStore = transaction.objectStore('tasks');
        let created_at = new Date();
        const req = objectStore.add({project,task,importance,status: "Pendiente",
        created_at: created_at.getFullYear()+"-"+created_at.getMonth()+"-"+created_at.getDay()+" "+created_at.getHours()+":"+created_at.getMinutes()+":"+created_at.getSeconds()});
        req.onsuccess = () => {
            
        }
    }
    window.Tasks = () => {
        
        const transaction = window.db.transaction('tasks');
        const objectStore = transaction.objectStore('tasks');
        const req = objectStore.openCursor();

        window.mis_tareas = [];
        req.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                window.mis_tareas.push({
                    "id": cursor.key,
                    "project": cursor.value
                });
                cursor.continue();         
            }
            
        }  
    }
    window.editTask = [];
    window.editTasks = () => {
        
        const transaction = window.db.transaction(["tasks"],'readwrite');
        const objectStore = transaction.objectStore('tasks');
        const req = objectStore.get(parseInt(localStorage.getItem('task')));
        
        req.onsuccess = () => {
            window.editTask = req;
        }
    }
    window.updateTask = (project,task,importance,status) => {
        const transaction = window.db.transaction(["tasks"],'readwrite');
        const objectStore = transaction.objectStore('tasks');
        let created_at = new Date();
        const req = objectStore.put({project,task,importance,status: status, 
        'created_at': created_at.getFullYear()+"-"+created_at.getMonth()+"-"+created_at.getDay()+" "+created_at.getHours()+":"+created_at.getMinutes()+":"+created_at.getSeconds()});
        req.onsuccess = () => {
            const request = objectStore.delete(parseInt(localStorage.getItem('task')));  
            localStorage.removeItem('project') 
        }
    }

    window.deleteTask = (id) => {
        
        const transaction = window.db.transaction(["tasks"],'readwrite');
        const objectStore = transaction.objectStore('tasks');
        const req = objectStore.delete(parseInt(id));   
    }
}
